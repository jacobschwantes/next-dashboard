import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoClient, ObjectId } from "mongodb";
import clientPromise from "../../../lib/db/mongodb";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  secret: process.env.secret,
  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/analytics.readonly profile email ",
            access_type: "offline",
        },
      },
      profile(profile) {
        console.log(profile);
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          projects: [],
        };
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    session: async ({ session, user }) => {
      session.userId = user.id;
      session.projects = user.projects;
      return Promise.resolve(session);
    },
    async signIn({ user, account, profile, email, credentials }) {
      const url = process.env.MONGODB_URI;
      const client = new MongoClient(url);
      try {
        await client.connect();
        const authorized = await client
          .db("global")
          .collection("authorized_users")
          .findOne({ email: user.email });
        if (authorized) {
          console.log(authorized);
          console.log(JSON.stringify(account, null, 2));
          const filter = { userId: new ObjectId(user.id) };
          const updateDoc = {
            $set: {
              expires_at: account.expires_at,
              refresh_token: account.refresh_token,
              access_token: account.access_token,
            },
          };
          await client
            .db("users")
            .collection("accounts")
            .updateOne(filter, updateDoc);
          return true;
        } else {
          console.log(authorized);
          // Return false to display a default error message
          return "/unauthorized";
        }
      } finally {
        client.close();
      }

      // Or you can return a URL to redirect to:
      // return '/unauthorized'
    },
  },
});
