import { google } from "googleapis";
import { getSession } from "next-auth/react";
import getCredentials from "./db/getcredentials";
export default async function getViewId(session) {
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
      return summary ? summary.data.items[1].webProperties[0].profiles[0].id : null
      
      // Signed in
    } else {
      // Not Signed in
      return
    }
  
}