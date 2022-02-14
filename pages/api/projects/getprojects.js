import { NewspaperIcon } from "@heroicons/react/solid";
import { AggregationCursor, ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";
export default async function handler(req, res) {
  const session = await getSession({ req });

  /* db.sales.aggregate([
    // First Stage
    { $unwind: "$items" },
    // Second Stage
    { $unwind: "$items.tags" },
    // Third Stage
    {
      $group:
        {
          _id: "$items.tags",
          totalSalesAmount:
            {
              $sum: { $multiply: [ "$items.price", "$items.quantity" ] }
            }
        }
    }
  ]) */

  if (session) {
    const url = process.env.MONGODB_URI;
    const client = new MongoClient(url);

    try {
      await client.connect();
      const dbName = "users";
      const db = client.db(dbName);
      const collection = db.collection("projects");
      const projectList = session.projects;

      const projectQuery = [];
      await projectList.forEach((project) => {
        projectQuery.push(new ObjectId(project));
      });

      const query = { _id: { $in: projectQuery } };
      const options = {
        // sort returned documents in ascending order by title (A->Z)
        sort: { last_edit: 1 },
        // Include only the `title` and `imdb` fields in each returned document
        projection: { groups: 0 },
      };
      const cursor = collection.find(query, options);
      const projects = await cursor.toArray();

      const aggCursor = collection.aggregate([
        {
          $match: {
            _id: {
              $in: projectQuery,
            },
          },
        },

        { $unwind: "$groups" },
        { $unwind: "$groups.tasks" },
        {
          $group: {
            _id: {
              id: "$_id",
              group_id: "$groups.id",
            },
            count: { $sum: 1 },
            task_count: {
              $sum: 1,
            },
          },
        },
        {
          $group: {
            _id: "$_id.id",

            total_tasks: { $sum: "$count" },
            groups: {
              $addToSet: {
                id: "$_id.group_id",

                count: "$task_count",
              },
            },
          },
        },
      ]);

      if (projects) {
        await aggCursor.forEach((doc) => {
          projects.forEach((item) => {
            if (doc._id.toString() === item._id.toString()) {
              item.total_tasks = doc.total_tasks;
              item.task_counts = doc.groups;
            }
          });
        });
        projects.sort(function(a, b) {
          return b.last_edit - a.last_edit;
        });
        res.status(200).send(projects);
      } else {
        console.log("user had no projects");
        res.status(404).send("user has no projects");
      }
    } catch (e) {
      console.log(e.message);
      res.status(500).send(e.message);
    } finally {
      console.log("client closed");
      client.close();
    }
  } else {
    console.log("unauthorized");
    res.status(401).send("unauthorized");
  }
}
