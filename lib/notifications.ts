import { ObjectId, MongoClient } from "mongodb";
import { Member } from "../types/projects";
const getEventTemplate = (event: string, payload: any) => {
  switch (event) {
    case "taskComplete":
      return {
        timestamp: Date.now(),
        href: `/projects/${payload.projectId}/tasks/${payload.task._id}`,
        payload: {
          projectId: payload.projectId,
          taskName: payload.task.name,
        },
        event: {
          id: "taskComplete",
          user: payload.user,
        },
      };
    default:
      break;
  }
};
/**
 * Creates event based notification
 *
 * @param client - Connected mongo client
 * @param users - List of users to give notification to
 * @param event - Event identifier to construct notification template from
 * @param payload - Event specific info to be added to body of notification
 * @returns promise
 *
 */
export const createNotification = async (
  client: MongoClient,
  users: string[],
  event: string,
  payload: object
) => {
  const notification = getEventTemplate(event, payload);
  if (notification) {
    const insertResult = await client
      .db("users")
      .collection("users")
      .updateMany(
        { email: { $in: users } },
        { $push: { unreadNotifications: notification } }
      );
  } 
};
/**
 * Marks user notification(s) seen
 *
 * @param client - Connected mongo client
 * @param userId - ObjectId of user the notification belongs to
 * @param notificationId - Id or array of ids of notifications to be marked seen
 * @returns promise
 *
 */
export const markNotificationSeen = (
  client: MongoClient,
  userId: ObjectId,
  notificationId: number | number[]
) => {};
/**
 * Removes notifications that are already seen and old
 *
 * @param client - Connected mongo client
 * @param userId - ObjectId of user
 * @param staleAge - Notifications older than this (MS) will be removed
 * @returns number of removed notifications
 *
 */
export const pullStaleNotifications = (
  client: MongoClient,
  userId: ObjectId,
  staleAge: number
) => {};
