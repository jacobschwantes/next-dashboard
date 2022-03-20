import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { MongoClient } from "mongodb";
import clientPromise from "../../../lib/db/mongodb";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  secret: process.env.secret,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/analytics.readonly profile email ",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
      profile(profile) {
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
          return true;
        } else {
          console.log(authorized);
          // Return false to display a default error message
          return '/unauthorized';
        }
      } finally {
        client.close();
      }

      // Or you can return a URL to redirect to:
      // return '/unauthorized'
    },
  },
});
