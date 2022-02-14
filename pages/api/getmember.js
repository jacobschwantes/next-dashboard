import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";
function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    const url = process.env.MONGODB_URI;
    const client = new MongoClient(url);
    const email = emailIsValid(req.query.email);
    if (email) {
      try {
        console.log(req.query.email);
        await client.connect();
        const dbName = "users";
        const db = client.db(dbName);
        const collection = db.collection("users");
        const findResult = await collection.findOne({
          email: req.query.email,
        });
        if (findResult) {
          console.log("found user: ", findResult);
          res
            .status(200)
            .json({
              name: findResult.name,
              email: findResult.email,
              image: findResult.image,
            });
        } else {
          console.log("user does not exist");
          res.status(404).send("User does not exist.");
        }
      } catch (e) {
        res.status(500).send(e.message);
      } finally {
        console.log("client closed");
        client.close();
      }
    } else {
      console.log("invalid email", email);
      res.status(400).send("Invalid email address.");
    }
  } else {
    console.log("unauthorized");
    res.status(401).send("unauthorized");
  }
}
