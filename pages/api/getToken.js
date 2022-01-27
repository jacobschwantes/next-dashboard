// This is an example of how to read a JSON Web Token from an API route
import { ObjectId } from "bson";
import { MongoClient } from "mongodb";
import { google } from "googleapis";
import { getSession } from "next-auth/react";
const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
export default async function handler (req, res) {
  try {
    const session = await getSession({req})
    const dbName = "users";
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("accounts");
    const findResult = await collection.findOne({ userId: new ObjectId(session.userId) })

    if (findResult) {
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      const accessToken = findResult.access_token;
      const refreshToken = findResult.refresh_token;
      const auth = new google.auth.OAuth2({
        clientId,
        clientSecret,
      });
      auth.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      const googleClient = google.analyticsreporting({ auth, version: "v4" });
      const googleClient2 =google.analytics({auth, version: "v3" })
      const report2 = await googleClient2.management.accountSummaries.list()
      const cleanReport2 = report2.data.items[1];
      console.log("account summary:", JSON.stringify(cleanReport2, null, 2));

      // Signed in

      const report = await googleClient.reports
        .batchGet({
          requestBody: {
            reportRequests: [
              {
                viewId: "ga:251014742",
                dateRanges: [
                  {
                    startDate: "30daysAgo",
                    endDate: "today",
                  },
                ],
                metrics: [
                  {
                    expression: "ga:pageviews",
                  },
                  {
                    expression: "ga:sessions",
                  },
                ],
              },
            ],
          },
        })
        .catch((err) => console.log("error:", err));
      const cleanReport = report.data.reports[0].data;

      console.log("Analytics Report:", JSON.stringify(cleanReport, null, 2));
    } else {
      // Not Signed in
      res.status(401).send("failed");
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
  res.end();
};

const data = {
  config: {
    url: "https://analyticsreporting.googleapis.com/v4/reports:batchGet",
    method: "POST",
    userAgentDirectives: [
      {
        product: "google-api-nodejs-client",
        version: "5.0.5",
        comment: "gzip",
      },
    ],
    data: {
      reportRequests: [
        {
          viewId: "ga:251014742",
          dateRanges: [
            {
              startDate: "30daysAgo",
              endDate: "today",
            },
          ],
          metrics: [
            {
              expression: "ga:avgSessionDuration",
            },
            {
              expression: "ga:sessions",
            },
          ],
        },
      ],
    },
    headers: {
      "x-goog-api-client": "gdcl/5.0.5 gl-node/14.15.4 auth/7.11.0",
      "Accept-Encoding": "gzip",
      "User-Agent": "google-api-nodejs-client/5.0.5 (gzip)",
      Authorization:
        "Bearer ya29.A0ARrdaM_rc-NDx4PtwXjPNsDCCX87CRWfB1h5P64MF52dX_au25pQWiRZeqgz0bkQuRyFo_YjpM0fOUI-9xiKZenR84tH71my4fUpXzBVazuM_jhag34z1gptCprHbEiUyWlm5GTwZxF8zD6T_1EsqPxfObv2",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    params: {},
    retry: true,
    body: '{"reportRequests":[{"viewId":"ga:251014742","dateRanges":[{"startDate":"30daysAgo","endDate":"today"}],"metrics":[{"expression":"ga:avgSessionDuration"},{"expression":"ga:sessions"}]}]}',
    responseType: "json",
  },
  data: {
    reports: [
      {
        columnHeader: {
          metricHeader: {
            metricHeaderEntries: [
              {
                name: "ga:avgSessionDuration",
                type: "TIME",
              },
              {
                name: "ga:sessions",
                type: "INTEGER",
              },
            ],
          },
        },
        data: {
          rows: [
            {
              metrics: [
                {
                  values: ["1487.0", "8"],
                },
              ],
            },
          ],
          totals: [
            {
              values: ["1487.0", "8"],
            },
          ],
          rowCount: 1,
          minimums: [
            {
              values: ["1487.0", "8"],
            },
          ],
          maximums: [
            {
              values: ["1487.0", "8"],
            },
          ],
        },
      },
    ],
  },
  headers: {
    "alt-svc":
      'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"',
    "cache-control": "private",
    connection: "close",
    "content-encoding": "gzip",
    "content-type": "application/json; charset=UTF-8",
    date: "Mon, 24 Jan 2022 02:52:42 GMT",
    server: "ESF",
    "transfer-encoding": "chunked",
    vary: "Origin, X-Origin, Referer",
    "x-content-type-options": "nosniff",
    "x-frame-options": "SAMEORIGIN",
    "x-xss-protection": "0",
  },
  status: 200,
  statusText: "OK",
  request: {
    responseURL:
      "https://analyticsreporting.googleapis.com/v4/reports:batchGet",
  },
};
