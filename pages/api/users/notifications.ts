import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    const url = process.env.MONGODB_URI;
    const client = new MongoClient(url);
    try {
      await client.connect();
      const notifications = await getNotifications(client, session.user?.email);
      notifications ? notifications.unreadNotifications.sort((a, b) => b.timestamp - a.timestamp) : null

      notifications
        ? res.status(200).send(notifications)
        : res.status(400).send("bad request");
    } finally {
      client.close();
    }
  } else {
    res.status(401).send("unauthorized");
  }
}

const getNotifications = (client: MongoClient, email: any) => {
  return client
    .db("users")
    .collection("users")
    .findOne(
      { email },

      {
        projection: {
          unreadNotifications: 1,
          readNotifications: 1,
        },
      }
    );
};
