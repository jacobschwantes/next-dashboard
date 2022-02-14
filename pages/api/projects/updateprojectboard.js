import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    const url = process.env.MONGODB_URI;
    const client = new MongoClient(url);
    const project = req.body;
    if (project) {
      try {
        console.log(project);
        await client.connect();
        const dbName = "users";
        const db = client.db(dbName);
        const collection = db.collection("projects");
        const findResult = await collection.findOne(
          {
            _id: new ObjectId(project._id),
          },
          { projection: { members: 1 } }
        );
        // check if project exists in db
        if (findResult) {
            console.log(findResult)
          const member = await findResult.members.find(
            (item) => item.email === session.user.email
          );
          if (member.access === "read/write" || member.access === "owner") {
            console.log("authorized to edit");
            const updateDoc = {
              $set: {
                groups: project.groups,
              },
            };
            const updateResult = await db
              .collection("projects")
              .updateOne({ _id: new ObjectId(project._id) }, updateDoc);
            if (updateResult) {
              console.log(
                `${updateResult.matchedCount} document(s) matched the filter, updated ${updateResult.modifiedCount} document(s)`
              );
              res
                .status(200)
                .send(
                  `${updateResult.matchedCount} document(s) matched the filter, updated ${updateResult.modifiedCount} document(s)`
                );
            } else {
              console.log("failed to update document");
              res.status(400).send("failed to update document");
            }
          }
        }
        // members are not different, just update project settings
        else {
          console.log("project does not exist");
          res.status(400).send("project does not exist");
        }
      } catch (e) {
        res.status(500).send(e.message);
      } finally {
        console.log("client closed");
        client.close();
      }
    } else {
      console.log("invalid project", project);
      res.status(400).send("invalid project");
    }
  } else {
    console.log("unauthorized");
    res.status(401).send("unauthorized");
  }
}
