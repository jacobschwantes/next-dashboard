import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const session = await getSession({ req });
  const numbers = [4, 2, 5, 1, 3];

  if (session) {
    const url = process.env.MONGODB_URI;
    const client = new MongoClient(url);
    const projectId = req.query.id;
    if (projectId.length === 24) {
      try {
        console.log(projectId);
        await client.connect();
        const dbName = "users";
        const db = client.db(dbName);
        const collection = db.collection("projects");
        const findResult = await collection.findOne({
          _id: new ObjectId(projectId),
        });
        if (findResult) {
          console.log("found one->", findResult);
          const issuesCursor = db.collection("projectIssues").find(
            { _id: { $in: findResult.issues } },
            {
              sort: {
                created: -1
              },
              projection: {
                title: 1,
                created: 1,
                closed: 1,
                author: 1,
                tags: 1,
                category: 1,
              },
            }
          );
          if (findResult.issues) {
            const issues = [];
            await issuesCursor.forEach((item) => issues.push(item));
            findResult.issues = issues;
          }
          const privacy = findResult.privacy.id;
          const owner = await findResult.members.find(
            (item) => item.access === "owner"
          );
          if (privacy === "public") {
            res.status(200).send(findResult);
          } else if (privacy === "team") {
            if (
              findResult.members.find(
                (item) => item.email === session.user.email
              )
            ) {
              console.log("is a member of project");
              res.status(200).send(findResult);
            } else {
              console.log("not a member of team");
              res
                .status(401)
                .send(
                  "only members of this projects team may view this project"
                );
            }
          } else {
            if (owner.email === session.user.email) {
              console.log("is owner");
              res.status(200).send(findResult);
            } else {
              console.log("is not owner of project");
              res
                .status(401)
                .send("only the owner of this project may view it");
            }
          }
        } else {
          console.log("project does not exist");
          res.status(404).send("project does not exist");
        }
      } catch (e) {
        res.status(500).send(e.message);
      } finally {
        console.log("client closed");
        client.close();
      }
    } else {
      console.log("invalid project id ");
      res.status(400).send("invalid project id");
    }
  } else {
    console.log("unauthorized");
    res.status(401).send("unauthorized");
  }
}
