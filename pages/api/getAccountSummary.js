import { google } from "googleapis";
import { getSession } from "next-auth/react";
import getCredentials from "./lib/db/getCredentials";
export default async function handler(req, res) {
    const session = await getSession({ req });
  if (session) {
    const credentials = await getCredentials(session);

    if (credentials) {
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      const accessToken = credentials.access_token;
      const refreshToken = credentials.refresh_token;
      const auth = new google.auth.OAuth2({
        clientId,
        clientSecret,
      });
      auth.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      const googleClient = google.analytics({ auth, version: "v3" });
      const summary = await googleClient.management.accountSummaries.list();
      summary.status === 200
        ? res.sttus(200).send(summary)
        : res.status(401).send();
      // Signed in
    }
  } else {
      // Not Signed in
      res.status(401).send("unauthorized");
    }
}
