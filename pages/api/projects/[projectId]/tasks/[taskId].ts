import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
import type { NextApiRequest, NextApiResponse } from "next";
import { Task } from "../../../../../types/projects";
import { Session } from "next-auth";
import { createNotification } from "../../../../../lib/notifications";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  const newTask: Task = req.body.task;
  console.log("newtask->", newTask);
  const projectId = new ObjectId(req.query.projectId);
  const taskId = new ObjectId(req.query.taskId);
  const method = req.method;
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);
  if (session && projectId && taskId) {
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
          if (newTask) {
            console.log("writing task...");
            const writeResult = await writeSubTask(client, newTask);
            if (writeResult) {
              const pushResult = await pushSubTaskToTask(
                client,
                writeResult.insertedId,
                new ObjectId(taskId)
              );
              pushResult
                ? res.status(200).send("created sub task")
                : res.status(400).send("error adding task id to task arr");
            } else {
              res.status(400).send("error inserting sub task");
            }
          }

          break;
        case "PUT":
          console.log("putting...");
          const updateResult = await updateTask(client, taskId, newTask);
          if (updateResult) {
            const users: string[] = [];
            newTask.team.forEach((item) => users.push(item.email));
            await createNotification(client, users, req.query.action, {
              user: session.user,
              projectId,
              task: newTask,
            });
            res.status(200).send("updated task");
          } else {
            res.status(400).send("failed to update task");
          }

          break;
        case "DELETE":
          console.log("deleting task...");
          const deleteResult = await deleteTask(
            client,
            new ObjectId(req.body.taskId)
          );
          if (deleteResult) {
            console.log("pulling task");
            const pullResult = await pullSubTaskFromTask(
              client,
              taskId,
              new ObjectId(req.body.taskId)
            );
          }
          deleteResult
            ? res.status(200).send("deleted task")
            : res.status(400).send("failed to delete task");
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
    .find(
      {
        _id: {
          $in: taskList,
        },
      },
      {
        sort: { created: 1 },
        projection: { body: 0 },
      }
    );
  const tasks: Array<Task> = [];
  await taskCursor.forEach((item) => tasks.push(item));
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
const writeSubTask = (client: MongoClient, task: Task) => {
  return client.db("users").collection("projectTasks").insertOne(task);
};
/**
 * Removes task document from DB
 *
 * @param client - Connected mongo client
 * @param taskId - ObjectId of task to be deleted
 * @returns promise
 *
 */
const deleteTask = (client: MongoClient, taskId: ObjectId) => {
  return client.db("users").collection("projectTasks").deleteOne({
    _id: taskId,
  });
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
const pushSubTaskToTask = (
  client: MongoClient,
  id: ObjectId,
  taskId: ObjectId
) => {
  return client
    .db("users")
    .collection("projectTasks")
    .updateOne(
      { _id: taskId },
      {
        $push: {
          subtasks: id,
        },
      }
    );
};
/**
 * Removes task ObjectId from project subtasks array
 *
 * @param client - Connected mongo client
 * @param id - ObjectId of task
 * @param projectId - ObjectId of project the task belongs to
 * @returns promise
 *
 */
const pullSubTaskFromTask = (
  client: MongoClient,
  id: ObjectId,
  taskId: ObjectId
) => {
  return client
    .db("users")
    .collection("projectTasks")
    .updateOne(
      { _id: id },
      {
        $pull: {
          subtasks: taskId,
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
/**
 * Updates task document
 *
 * @param client - Connected mongo client
 * @param taskId - ObjectId of task
 * @param newTask - new task object to update db with
 * @returns promise
 *
 */
const updateTask = async (
  client: MongoClient,
  taskId: ObjectId,
  newTask: Task
) => {
  //const oldTask = await client
  // .db("users")
  // .collection("projectTasks")
  //.findOne({ _id: taskId });
  //const changedProperties = [];
  //if (oldTask) {
  //  Object.keys(oldTask).forEach(item => {
  //   oldTask[item] !== newTask[item] ? changedProperties.push(item) : null;
  //  })
  // }
  //const events = generateEvents(client, oldTask, newTask changedProperties, session);
  return client
    .db("users")
    .collection("projectTasks")
    .updateOne(
      { _id: taskId },
      {
        $set: {
          name: newTask.name,
          team: newTask.team,
          description: newTask.description,
          category: newTask.category,
          tags: newTask.tags,
          priority: newTask.priority,
          last_edit: Date.now(),
          completed: newTask.completed,
        },
      }
    );
};
/// Implement later
/**
 * Generate events from update operation
 *
 * @param client - Connected mongo client
 * @param taskId - ObjectId of task
 * @param newProperties - object of changed properties
 * @returns array of events
 *
 */
const generateEvents = (
  client: MongoClient,
  oldTask: Task,
  newTask: Task,
  newProperties: Array<string>,
  session: Session
) => {
  const addedItems = [];
  const removedItems = [];
  const events = oldTask.events;
  newProperties.forEach((item) => {
    switch (item) {
      case "name":
      case "description":
      case "priority":
      case "category":
        events.push({
          id: events.length++,
          type: item,
          action: "edited",
          reactions: [],
          user: session.user,
          timestamp: Date.now(),
        });
        break;
      case "tags":
        const addedTags = [];
        const removedTags = [];
        oldTask.tags.forEach((item) =>
          newTask.tags.includes(item) ? null : removedTags.push(item)
        );
        newTask.tags.forEach((item) =>
          oldTask.tags.includes(item) ? null : addedTags.push(item)
        );
        addedTags
          ? events.push({
              id: events.length++,
              type: item,
              action: "added",
              reactions: [],
              user: session.user,
              body: addedTags,
              timestamp: Date.now(),
            })
          : null;
        removedTags
          ? events.push({
              id: events.length++,
              type: item,
              action: "removed",
              reactions: [],
              user: session.user,
              body: removedTags,
              timestamp: Date.now(),
            })
          : null;
        break;
      case "team":
        const addedMembers = [];
        const removedMembers = [];
        oldTask.team.forEach((item) =>
          newTask.team.includes(item) ? null : removedMembers.push(item)
        );
        newTask.team.forEach((item) =>
          oldTask.team.includes(item) ? null : addedMembers.push(item)
        );
        addedMembers
          ? events.push({
              id: events.length++,
              type: item,
              action: "added",
              reactions: [],
              user: session.user,
              body: addedMembers,
              timestamp: Date.now(),
            })
          : null;
        removedMembers
          ? events.push({
              id: events.length++,
              type: item,
              action: "removed",
              reactions: [],
              user: session.user,
              body: removedMembers,
              timestamp: Date.now(),
            })
          : null;
        break;
    }
  });
};
