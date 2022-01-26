// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { google } from "googleapis";
const secret = process.env.JWT_SECRET;


export default async function handler(req, res) {
  const token = await getToken({ req, secret });

  console.log("JSON Web Token", JSON.stringify(token, null, 2))

  console.log('info we need -----', JSON.stringify(token.access_token))


  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const accessToken = token.accessToken;
  const refreshToken = token.refreshToken;

  const auth = new google.auth.OAuth2({
    clientId,
    clientSecret,
  });
  auth.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const client = google.analyticsreporting({ auth, version: "v4" });
  
  const report = await client.reports.batchGet({
    requestBody: {
      reportRequests: [
        {
          viewId: '65704806',
          dateRanges: [
            {
                startDate: '30daysAgo',
                endDate: 'today'
            }
          ],
          metrics: [
            {
              expression: 'ga:sessions',
            },
          ],
        },
      ],
    },
  });
  console.log(report.data);

  

  res.status(200).json(report.data);
}
