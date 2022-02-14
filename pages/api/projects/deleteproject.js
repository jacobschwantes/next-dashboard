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
        const collection = db.collection("users");
        const memberList = [];
        await project.members.forEach((member) => memberList.push(member.email));
        console.log(memberList)
        const filter = { email: { $in: memberList } };
        const updateDoc = {
          $pull: {
            projects: new ObjectId(project._id),
          },
        };
        const removeUserProjects = await db
          .collection("users")
          .updateMany(filter, updateDoc);
        console.log(`Updated ${removeUserProjects.modifiedCount} documents`);
        if (removeUserProjects) {
            const deleteProject = await db.collection("projects").deleteOne({_id: new ObjectId(project._id)})
            if (deleteProject.deletedCount === 1) {
                console.log("Successfully deleted one document.");
                res.status(200).send('deleted document')
              } else {
                  res.status(400).send('err deleting project')
                console.log("No documents matched the query. Deleted 0 documents.");
              }
        } else {
            console.log('err removing project from users')
            res.status(400).send('err removing project from users')
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
