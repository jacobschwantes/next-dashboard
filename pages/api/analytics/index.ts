import { google } from "googleapis";
import { getSession } from "next-auth/react";
import { MongoClient, ObjectId } from "mongodb";

export default async function handler(req, res) {
  const session = await getSession({ req });
  const credentials = await getCredentials(session);
  if (credentials) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const accessToken = credentials.access_token;
    const refreshToken = credentials.refresh_token;
    const viewIds = await getViewId(credentials);
    console.log(JSON.stringify(viewIds, null, 2));
    const auth = new google.auth.OAuth2({
      clientId,
      clientSecret,
    });
    auth.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    const googleClient = google.analyticsdata({ version: "v1beta", auth });

    // Signed in

    const report = await googleClient.properties.runReport({
      property: "properties/301959631",
      requestBody: {
        dateRanges: [
          {
            startDate: "30daysAgo",
            endDate: "today",
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
    let timestamp = new Date(Date.now());
    console.log(
      timestamp.toLocaleDateString(),
      timestamp.toLocaleTimeString(),
      "- analytics data refreshed"
    );
    const cleanReport = report.data.rows[0].metricValues;
    cleanReport
      ? res.status(200).send({
          page_views: cleanReport[0].value,
          sessions: cleanReport[1].value,
          avg_session: cleanReport[2].value,
        })
      : res.status(401).send();
  } else {
    // Not Signed in
    res.status(401).send("unauthorized");
  }
}

async function getCredentials(session) {
  const url = process.env.MONGODB_URI;
  const client = new MongoClient(url);
  try {
    const dbName = "users";
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("accounts");
    const findResult = await collection.findOne({
      userId: new ObjectId(session.userId),
    });
    if (findResult) {
      if (findResult.expires_at * 1000 < Date.now()) {
        console.log(
          "\u001b[1;34m expired token, fetching a new one" + "\u001b[0m"
        );
        const newTokens = await refreshAccessToken(findResult.refresh_token);
        const updateResult = await collection.updateOne(
          { userId: new ObjectId(session.userId) },
          {
            $set: {
              expires_at: newTokens.expires_at,
              refresh_token: newTokens.refresh_token,
              access_token: newTokens.access_token,
            },
          }
        );
        return {
          expires_at: newTokens.expires_at,
          refresh_token: newTokens.refresh_token,
          access_token: newTokens.access_token,
        };
      } else {
        console.log(
          "\u001b[1;34m token not expired -- expires in " +
            new Date(findResult.expires_at * 1000 - Date.now()).getMinutes() +
            " minutes" +
            "\u001b[0m"
        );

        return {
          access_token: findResult.access_token,
          refresh_token: findResult.refresh_token,
          expires_at: findResult.expires_at,
        };
      }
    } else {
      return;
    }
  } catch {
    return;
  } finally {
    client.close();
  }
}

async function getViewId(credentials) {
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

    const googleClient = google.analyticsadmin({ version: "v1alpha", auth });

    const summary = await googleClient.accountSummaries.list();
    return summary ? summary.data : null;

    // Signed in
  } else {
    // Not Signed in
    return;
  }
}

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  });

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token,
      });

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    });

    const refreshedTokens = await response.json();
    console.log(response)
    console.log(refreshedTokens)
    console.log(
      "\u001b[1;34m got new tokens! -- " + refreshedTokens + "\u001b[0m"
    );

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      access_token: refreshedTokens.access_token,
      expires_at: Math.floor(Date.now() / 1000 + refreshedTokens.expires_in),
      refresh_token: refreshedTokens.refresh_token ?? token, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);

    return {
      error: "RefreshAccessTokenError",
    };
  }
}
