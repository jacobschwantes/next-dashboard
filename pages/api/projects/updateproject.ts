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
        const findResult = await collection.findOne({
          _id: new ObjectId(project._id),
        });
        // check if project exists in db
        if (findResult) {
          console.log('found project in db =>', findResult)
          const newMemberList = project.members;
          const oldMemberList = findResult.members;
          const addedMembers = [];
          const removedMembers = [];
          // check if member list is different, finding who has been added or removed
          if (newMemberList !== oldMemberList) {
            // check for new members
            await newMemberList.forEach((member) => {
              if (!oldMemberList.find(({ email }) => email === member.email)) {
                addedMembers.push(member.email);
              }
            });
            // check for old members
            await oldMemberList.forEach((member) => {
              if (!newMemberList.find(({ email }) => email === member.email)) {
                removedMembers.push(member.email);
              }
            });
            console.log("added members: ", addedMembers);
            console.log("removed members: ", removedMembers);
            if (addedMembers.length > 0) {
              const filter = { email: { $in: addedMembers } };
              const updateDoc = {
                $push: {
                  projects: new ObjectId(project._id),
                },
              };
              const addMembersResult = await db
                .collection("users")
                .updateMany(filter, updateDoc);
              if (addMembersResult) {
                console.log(
                  `Updated ${addMembersResult.modifiedCount} documents`
                );
              } else {
                console.log(
                  "failed to add project to new members project array"
                );
              }
            }
            if (removedMembers.length > 0) {
              const filter = { email: { $in: removedMembers } };
              const updateDoc = {
                $pull: {
                  projects: new ObjectId(project._id),
                },
              };
              const removeMembersResult = await db
                .collection("users")
                .updateMany(filter, updateDoc);
              if (removeMembersResult) {
                console.log(
                  `Updated ${removeMembersResult.modifiedCount} documents`
                );
              } else {
                console.log(
                  "failed to remove project from members project array"
                );
              }
            }
          }
          // members are not different, just update project settings
          const updateDoc = {
            $set: {
              name: project.name,
              category: project.category,
              description: project.description,
              tags: project.tags,
              theme: project.theme,
              members: project.members,
              last_edit: project.last_edit,
              privacy: project.privacy,
            },
          };
          const updateResult = await db.collection("projects").updateOne(
            { _id: new ObjectId(project._id) },
            updateDoc
          );
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
        } else {
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
