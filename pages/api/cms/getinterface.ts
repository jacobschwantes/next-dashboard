import { getSession } from "next-auth/react";
const contentful = require("contentful-management");
export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    const client = contentful.createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_KEY,
    });

    const editor = await client
      .getSpace(process.env.CONTENTFUL_SPACE_ID)
      .then((space) => space.getEnvironment("master"))
      .then((environment) =>
        environment.getEditorInterfaceForContentType("portfolioProject")
      )
      .then((editorInterface) => {console.log(editorInterface); return editorInterface})
      .catch(console.error);
      if (editor) {
        res.status(200).json({fields: editor.controls})
      } else {
        res.status(400).send('invalid request')
      }
      
  } else {
    res.status(401).send("unauthorized");
  }
}
