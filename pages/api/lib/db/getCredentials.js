import { ObjectId } from "bson";
import { MongoClient } from "mongodb";

export default async function getCredentials(session) {
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);
  try {
    const dbName = "users";
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("accounts");
    const findResult = await collection.findOne({
      userId: new ObjectId(session.userId),
    });
    if (findResult) {
      return {
        access_token: findResult.access_token,
        refresh_token: findResult.refresh_token,
      };
    } else {
      return;
    }
  } catch {
    return;
  } finally {
    client.close();
  }
}
