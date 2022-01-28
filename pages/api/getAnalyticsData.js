// This is an example of how to read a JSON Web Token from an API route
import { google } from "googleapis";
import { getSession } from "next-auth/react";
import getCredentials from "./lib/db/getCredentials";
import getViewId from "./lib/getViewId";
export default async function handler(req, res) {
  const session = await getSession({ req });
  const credentials = await getCredentials(session);
  if (credentials) {
    const viewId = await getViewId(session);
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

    const googleClient = google.analyticsreporting({ auth, version: "v4" });
    // Signed in

    const report = await googleClient.reports.batchGet({
      requestBody: {
        reportRequests: [
          {
            viewId: `ga:${viewId}`,
            dateRanges: [
              {
                startDate: "30daysAgo",
                endDate: "today",
              },
            ],
            dimensions: [{ name: "ga:deviceCategory" }],
            metrics: [
              {
                expression: "ga:pageviews",
              },
              {
                expression: "ga:sessions",
              },
              {
                expression: "ga:avgSessionDuration",
              },
            ],
          },
        ],
      },
    });
    const cleanReport = report.data.reports[0].data.totals[0].values;
   console.log( JSON.stringify(report, undefined, 2))
  
    cleanReport
      ? res.status(200).send({
          page_views: cleanReport[0],
          sessions: cleanReport[1],
          avg_session: cleanReport[2],
        })
      : res.status(401).send();
  } else {
    // Not Signed in
    res.status(401).send("failed");
  }
}
