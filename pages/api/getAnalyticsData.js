import { google } from "googleapis";
import { getSession } from "next-auth/react";
import getCredentials from "./lib/db/getCredentials";
import getViewId from "./lib/getViewId";
import { refreshAccessToken } from "./lib/db/refreshAccessToken";
export default async function handler(req, res) {
  const session = await getSession({ req });
  const credentials = await getCredentials(session);
  if (credentials) {
    console.log(credentials)
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
    const googleClient = google.analyticsdata({version: "v1beta", auth})

    // Signed in

    const report = await googleClient.properties.runReport({
        property: "properties/301959631",
      requestBody: {
    
        dateRanges: [
            {
              startDate: '30daysAgo',
              endDate: 'today',
            },
          ],
        
        metrics: [
            {
              name: "screenPageViews",
            },
            {
              name: "sessions",
            },
            {
              name: "averageSessionDuration",
            },
          ],
          
      },
    });
    console.log(report)
    let timestamp = new Date(Date.now());
    console.log(timestamp.toLocaleDateString(), timestamp.toLocaleTimeString() , '- analytics data refreshed');
    const cleanReport = report.data.rows[0].metricValues;
    cleanReport
    ? res.status(200).send({
        page_views: cleanReport[0].value,
        sessions: cleanReport[1].value,
        avg_session: cleanReport[2].value,
      })
    : res.status(401).send();
   
  
} 
   else {
    // Not Signed in
    res.status(401).send("unauthorized");
  }

}
