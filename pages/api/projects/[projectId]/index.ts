import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { Project } from "../../../../types/projects";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projectId = new ObjectId(req.query.projectId);
  const method = req.method;
  const session = await getSession({ req });
  if (session && method && projectId) {
    const url = process.env.MONGODB_URI;
    const client = new MongoClient(url);
    try {
      await client.connect();
      switch (method) {
        case "GET":
          const project = await getProject(client, projectId);
          const isAuthorized = await verifyPrivacy(session, project);
          if (isAuthorized) {
            res.status(200).json(project);
          } else {
            project
              ? res.status(401).send("unauthorized")
              : res.status(404).send("project not found");
          }
          break;
      }
    } finally {
      client.close();
    }
  } else {
    res.status(400).send(!session ? "unauthorized" : "bad request");
  }
}

/**
 * Checks if user is allowed to view project
 *
 * @param session - Session object
 * @param project - Project object
 * @returns returns boolean
 *
 */
const verifyPrivacy = (session: Session, project: Project) => {
  const privacy = project.privacy;
  switch (privacy.id) {
    case "team":
      return project.team.find((item) => item.email === session.user.email);
    case "private":
      const owner = project.team.find((item) => item.access === "owner");
      return owner?.email === session.user?.email;
    default:
      return;
  }
};

/**
 * Fetches project document from DB
 *
 * @param client - Connected mongo client
 * @param id - ObjectId of project
 * @returns project object
 *
 */
const getProject = async (client: MongoClient, id: ObjectId) => {
  const findResult = await client
    .db("users")
    .collection("projects")
    .findOne({ _id: id });
  if (findResult) {
    console.log("found one->", findResult);
    const issuesCursor = client
      .db("users")
      .collection("projectIssues")
      .find(
        { _id: { $in: findResult.issues } },
        {
          sort: {
            created: -1,
          },
          projection: {
            title: 1,
            created: 1,
            closed: 1,
            author: 1,
            tags: 1,
            category: 1,
          },
        }
      );
    if (findResult.issues) {
      const issues = [];
      await issuesCursor.forEach((item) => issues.push(item));
      findResult.issues = issues;
    }
    return findResult;
  }
  return;
};
