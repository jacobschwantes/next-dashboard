// API route for performing create operations of project issues
// Protected - Must be authenticated with valid session to perform operations
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { Issue } from "../../../../types/projects";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const issue: Issue = req.body.issue;
  const projectId = req.body.projectId;
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);
  if (session && issue && projectId && req.method === "POST") {
    try {
      await client.connect();
      const insertResult = await writeIssue(client, issue);
      if (insertResult) {
        const pushResult = await pushIssueToProject(
          client,
          insertResult.insertedId,
          new ObjectId(projectId)
        );
        pushResult
          ? res.status(200).send("created issue")
          : res.status(400).send("error adding issue id to project arr");
      } else {
        res.status(400).send("error inserting issue");
      }
    } catch (e) {
      console.log(e);
      res.status(400).send(e);
    } finally {
      client.close();
    }
  }
}
/**
 * Inserts issue document into DB
 *
 * @param client - Connected mongo client
 * @param issue - Issue object to be inserted
 * @returns ObjectId of inserted document
 *
 */
const writeIssue = (client: MongoClient, issue: Issue) => {
  return client.db("users").collection("projectIssues").insertOne(issue);
};

/**
 * Adds issue ObjectId to project issue array
 *
 * @param client - Connected mongo client
 * @param id - ObjectId of issue
 * @param projectId - ObjectId of project the issue belongs to
 * @returns promise
 *
 */
const pushIssueToProject = (
  client: MongoClient,
  id: ObjectId,
  projectID: ObjectId
) => {
    console.log(projectID);
  return client
    .db("users")
    .collection("projects")
    .updateOne(
      { _id: projectID },
      {
        $push: {
          issues: id,
        },
      }
    );
};
