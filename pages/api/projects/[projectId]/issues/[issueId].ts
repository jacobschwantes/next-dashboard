// API route for performing RUD by ID operations of project issues
// Protected - Must be authenticated with valid session to perform operations

import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const issueId = new ObjectId(req.query.issueId);
  const projectId = new ObjectId(req.body.projectId);
  console.log(req.query);
  const method = req.method;
  const session = await getSession({ req });
  if (session && method && projectId && issueId) {
    const url = process.env.MONGODB_URI;
    const client = new MongoClient(url);
    try {
      await client.connect();
      switch (method) {
        case "GET":
          const issue = await getIssue(client, issueId);
          if (issue) {
            res.status(200).json(issue);
          } else {
            res.status(404).send("not found");
          }
          break;
        case "PUT":
          const updateResult = await updateIssue(
            client,
            issueId,
            req.body.updateDoc
          );
          if (updateResult) {
            res.status(200).send("updated issue");
          } else {
            res.status(400).send("bad request");
          }

          break;
        case "DELETE":
          const deleteResult = await deleteIssue(client, issueId);
          if (deleteResult) {
            const pullResult = await pullIssueFromProject(
              client,
              issueId,
              projectId
            );
            if (pullResult) {
              res.status(200).send("deleted successfully");
            } else {
              res.status(400).send("error removing issue from project arr");
            }
          } else {
            res.status(400).send("error deleting issue");
          }
          break;

        default:
          res.status(400).send("invalid method");
          break;
      }
    } catch (e) {
      console.log("Error:", e);
    } finally {
      client.close();
    }
  } else {
    res.status(400).send(!session ? "unauthorized" : "bad request");
  }
}
/**
 * Fetches issue document from DB
 *
 * @param client - Connected mongo client
 * @param id - ObjectId of issue
 * @returns issue object
 *
 */
const getIssue = (client: MongoClient, id: ObjectId) => {
  return client.db("users").collection("projectIssues").findOne({ _id: id });
};
const updateIssue = (client: MongoClient, id: ObjectId, updateDoc: object) => {
  return client
    .db("users")
    .collection("projectIssues")
    .updateOne({ _id: id }, updateDoc);
};
/**
 * Deletes issue document from DB
 *
 * @param client - Connected mongo client
 * @param id - ObjectId of issue
 * @returns confirmation of deletion
 *
 */
const deleteIssue = async (client: MongoClient, id: ObjectId) => {
  return client.db("users").collection("projectIssues").deleteOne({ _id: id });
};
/**
 * Removes issue ObjectId from project issue array
 *
 * @param client - Connected mongo client
 * @param id - ObjectId of issue
 * @param projectId - ObjectId of project the issue belongs to
 * @returns promise
 *
 */
const pullIssueFromProject = (
  client: MongoClient,
  id: ObjectId,
  projectID: ObjectId
) => {
  return client
    .db("users")
    .collection("projects")
    .updateOne(
      { _id: projectID },
      {
        $pull: {
          issues: id,
        },
      }
    );
};