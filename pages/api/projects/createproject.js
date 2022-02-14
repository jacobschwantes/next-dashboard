import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";
export default async function handler (req, res) {
  const session = await getSession({ req });

  if (session) {
    const url = process.env.MONGODB_URI;
    const client = new MongoClient(url);
    const project = req.body;
    if (project) {
      try {
        console.log(project)
        await client.connect();
        const dbName = "users";
        const db = client.db(dbName);
        const collection = db.collection("projects");
        const insertResult = await collection.insertOne(project);
        if (insertResult) {
         
              console.log('objectid ->', insertResult.insertedId)
              const memberList = [];
              project.members.forEach(member => memberList.push(member.email))
              const filter = { email: {$in: memberList} }
              const updateDoc = {
                $push: {
                  projects: insertResult.insertedId
                }
              }
              const updateResult = await db.collection("users").updateMany(filter, updateDoc);
              console.log(`Updated ${updateResult.modifiedCount} documents`);
              project._id = updateResult.insertedId;
              res.status(200).send(project); 
        } else {
            console.log('error inserting doc')
          res.status(400).send('project could not be created');
        }
      } catch(e) {
          res.status(500).send(e.message)
      } finally {
          console.log('client closed')
        client.close();
      }
    } else {
        console.log('invalid project' , project )
        res.status(400).send('invalid project')
    }
  } else {
      console.log('unauthorized')
    res.status(401).send("unauthorized");
  }
}
