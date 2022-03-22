import { google } from "googleapis";
import { getSession } from "next-auth/react";
import { MongoClient, ObjectId } from "mongodb";

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
      return {
        access_token: findResult.access_token,
        refresh_token: findResult.refresh_token,
      };
    } else {
      return;
    }
  } catch {
    return;
  } finally {
    client.close();
  }
}

async function getViewId(session) {
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

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  })

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
      })

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      error: "RefreshAccessTokenError",
    }
  }
}
