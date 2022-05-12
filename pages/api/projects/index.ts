// API route for retrieving list of project objects from DB or writing new project to DB
// Protected - Must be authenticated with valid session to perform operations
import { MongoOptions, ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";
import type { NextApiRequest, NextApiResponse } from "next";
import { Project } from "../../../types/projects";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const method = req.method;
  const project: Project = req.body;
  if (session && method) {
    const url = process.env.MONGODB_URI;
    const client = new MongoClient(url);
    try {
      await client.connect();
      switch (method) {
        case "GET":
          const projectList: Array<string> = session.projects;
          const projectQuery: Array<ObjectId> = [];
          await projectList.forEach((project) => {
            projectQuery.push(new ObjectId(project));
          });
          const projects = await getProjects(client, projectQuery);
          if (projects) {
            res.status(200).json(projects);
          } else {
            res.status(400).send("not found");
          }
          break;
        case "POST":
          if (project) {
            const insertResult = await insertProject(client, project);
            if (insertResult) {
              const updateUserResult = await pushProjectToUsers(
                client,
                insertResult.insertedId,
                project
              );
              updateUserResult
                ? res.status(200).send("created project")
                : res.status(400).send("failed to create project");
            } else {
              console.log("error inserting doc");
              res.status(400).send("project could not be created");
            }
          } else {
            res.status(400).send("invalid project doc");
          }
          break;
        default:
          break;
      }
    } catch (e) {
      res.status(500).send(e.message);
    } finally {
      client.close();
    }
  } else {
    res.status(400).send(!session ? "unauthorized" : "bad request");
  }
}

/**
 * Insert project into db
 *
 * @param client - Connected mongo client
 * @param project - Project object
 * @returns promise
 *
 */
const insertProject = async (client: MongoClient, project: Project) => {
  return client.db("users").collection("projects").insertOne(project);
};
/**
 * Adds project ObjectId to each team members project array
 *
 * @param client - Connected mongo client
 * @param projectId - ObjectId of project
 * @returns promise
 *
 */
const pushProjectToUsers = async (
  client: MongoClient,
  projectId: ObjectId,
  project: Project
) => {
  const memberList = [];
  project.team.forEach((member) => memberList.push(member.email));
  const filter = { email: { $in: memberList } };
  const updateDoc = {
    $push: {
      projects: projectId,
    },
  };
  const updateResult = await client
    .db("users")
    .collection("users")
    .updateMany(filter, updateDoc);
  return updateResult;
};
/**
 * Fetches a users projects from DB
 *
 * @param client - Connected mongo client
 * @param userId - UserId from session object
 * @param projectList - Array of ObjectIds from session object
 * @returns array of project objects
 *
 */
const getProjects = async (
  client: MongoClient,
  projectList: Array<ObjectId>
) => {
  const projectCursor = client
    .db("users")
    .collection("projects")
    .aggregate([
      {
        $match: {
          _id: {
            $in: projectList,
          },
        },
      },
      {
        $lookup: {
          from: "projectTasks",
          localField: "tasks",
          foreignField: "_id",
          as: "tasks",
        },
      },
      {
        $unwind: "$tasks",
      },
      { $unwind: "$tasks.subtasks" },
      {
        $lookup: {
          from: "projectTasks",
          localField: "tasks.subtasks",
          foreignField: "_id",
          as: "tasks.subtasks",
        },
      },
      
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          category: { $first: "$category" },
          description: { $first: "$description" },
          theme: { $first: "$theme" },
          tasks: {$push: "$tasks"},
          created_at: { $first: "$created_at" },
          last_edit: { $first: "$last_edit" },
          privacy: { $first: "$privacy" },
          team: { $first: "$team" },
          tags: { $first: "$tags" },
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          category: 1,
          theme: 1,
          created_at: 1,
          last_edit: 1,
          privacy: 1,
          tasks: "$tasks",
          team: 1,
          tags: 1,
        },
      },
    ]);
  const projects: Array<Project> = [];
  await projectCursor.forEach((item) => {
    projects.push(item);
    console.log(item);
  });
  return projects;
};
