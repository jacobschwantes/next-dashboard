// API route for performing create operations of project issues
// Protected - Must be authenticated with valid session to perform operations
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { Task } from "../../../../../types/projects";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const newTask: Task = req.body.task;
  const projectId = new ObjectId(req.query.projectId);
  const method = req.method;
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);
  if (session && projectId) {
    try {
      await client.connect();
      switch (method) {
        case "GET":
          const taskList = await getTaskList(client, projectId);
          if (taskList) {
            const tasks = await getTasks(client, taskList.tasks);
            tasks
              ? res.status(200).send(tasks)
              : res.status(400).send("error getting tasks");
          } else {
            res.status(400).send("error getting tasks");
          }
          break;
        case "POST":
          const writeResult = await writeTask(client, newTask);
          if (writeResult) {
            const pushResult = await pushTaskToProject(
              client,
              writeResult.insertedId,
              projectId
            );
            pushResult
              ? res.status(200).send("created task")
              : res.status(400).send("error adding task id to project arr");
          } else {
            res.status(400).send("error inserting task");
          }

          break;
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
 * Gets list of task objects
 *
 * @param client - Connected mongo client
 * @param taskList: Array of task object ids
 * @returns Array of task objects
 *
 */
const getTasks = async (client: MongoClient, taskList: Array<ObjectId>) => {
  const taskCursor = client
    .db("users")
    .collection("projectTasks")
    .aggregate([
      {
        $match: {
          _id: {
            $in: taskList,
          },
        },
      },
      {
        $lookup: {
          from: "projectTasks",
          localField: "subtasks",
          foreignField: "_id",
          as: "subtasks",
        },
      },
      
    ]);
  const tasks: Array<Task> = [];
  await taskCursor.forEach((item) => {
    tasks.push(item);
  });
  return tasks;
};
/**
 * Inserts tasks document into DB
 *
 * @param client - Connected mongo client
 * @param task - Task object to be inserted
 * @returns ObjectId of inserted document
 *
 */
const writeTask = (client: MongoClient, task: Task) => {
  return client.db("users").collection("projectTasks").insertOne(task);
};

/**
 * Adds task ObjectId to project tasks array
 *
 * @param client - Connected mongo client
 * @param id - ObjectId of task
 * @param projectId - ObjectId of project the task belongs to
 * @returns promise
 *
 */
const pushTaskToProject = (
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
        $push: {
          tasks: id,
        },
      }
    );
};
/**
 * Gets list of tasksIds from project document
 *
 * @param client - Connected mongo client
 * @param projectId - ObjectId of project
 * @returns array of taskIds
 *
 */
const getTaskList = (client: MongoClient, projectId: ObjectId) => {

  return client
    .db("users")
    .collection("projects")
    .findOne(
      { _id: projectId },
      {
        projection: { tasks: 1, team: 1 },
      }
    );
};
