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
          const isAuthorized = verifyPrivacy(session, project);
          if (isAuthorized) {
            res.status(200).json(project);
          } else {
            project
              ? res.status(401).send("unauthorized")
              : res.status(404).send("project not found");
          }
          break;
        case "DELETE":
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
/**
 * Deletes project document from DB
 *
 * @param client - Connected mongo client
 * @param projectId - ObjectId of project
 * @returns promise
 *
 */
const deleteProject = (client: MongoClient, projectId: ObjectId) => {};

/**
 * Removes projectId from users project array in DB
 *
 * @param client - Connected mongo client
 * @param userList - List of userIds to have project removed from
 * @param projectId - ObjectId of project to be removed
 * @returns promise
 *
 */
const pullProject = (
  client: MongoClient,
  userList: Array<ObjectId>,
  projectId: ObjectId
) => {};
/**
 * Deletes all task documents associated with project from DB
 *
 * @param client - Connected mongo client
 * @param projectId - ObjectId of project
 * @returns promise
 *
 */
const pullTasks = (client: MongoClient, projectId: ObjectId) => {
  return client
    .db("users")
    .collection("projectTasks")
    .deleteMany({ projectId });
};
/**
 * Deletes all issue documents associated with project from DB
 *
 * @param client - Connected mongo client
 * @param projectId - ObjectId of project
 * @returns promise
 *
 */
const pullIssues = (client: MongoClient, projectId: ObjectId) => {
  return client
    .db("users")
    .collection("projectIssues")
    .deleteMany({ projectId });
};

/**try {
  console.log(project);
  await client.connect();
  const dbName = "users";
  const db = client.db(dbName);
  const collection = db.collection("users");
  const memberList = [];
  await project.members.forEach((member) => memberList.push(member.email));

  const filter = { email: { $in: memberList } };
  const updateDoc = {
    $pull: {
      projects: new ObjectId(project._id),
    },
  };
  const removeUserProjects = await db
    .collection("users")
    .updateMany(filter, updateDoc);

  if (removeUserProjects) {
      const deleteProject = await db.collection("projects").deleteOne({_id: new ObjectId(project._id)})
      if (deleteProject.deletedCount === 1) {
  
          res.status(200).send('deleted document')
        } else {
            res.status(400).send('err deleting project')
        
        }
  } else {

      res.status(400).send('err removing project from users')
  }
*/
