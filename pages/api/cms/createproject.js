import { getSession } from "next-auth/react";
const contentful = require("contentful-management");
export default async function handler(req, res) {
  const session = await getSession({ req });
  if (true) {
    const screenshot = await fetch(
      "https://screenshotify.vercel.app/api/screenshot?url=https://screenshotify.vercel.app&width=960&height=600"
    )
      .then((res) => res.blob())
      .then((data) => {
        console.log(data);
        return data;
      });

    const client = contentful.createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_KEY,
    });
    const buffer = await screenshot.arrayBuffer();
    console.log(buffer);
    const upload = await client
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then((space) => space.getEnvironment("master"))
      .then((environment) =>
        environment.createAssetFromFiles({
          fields: {
            title: {
              "en-US": `asset${Math.floor(Math.random() * 100)}`,
            },
            description: {
              "en-US": "Asset description",
            },
            file: {
              "en-US": {
                contentType: "image/png",
                fileName: "image.png",
                file: buffer,
              },
            },
          },
        })
      )
      .then((asset) => asset.processForAllLocales())
      .then((asset) => asset.publish())
      .catch(console.error);
    res.status(200).send(upload);
  } else {
    res.status(200).send("unauthorized");
  }
}
