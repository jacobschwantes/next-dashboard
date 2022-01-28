import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../lib/mongodb"

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        scopes: '',
        authorization: {
          params: {
            scope: "https://www.googleapis.com/auth/analytics.readonly profile email openid",
            prompt: "consent",
            access_type: "offline",
            response_type: "code"
          }
        }
      })
    // ...add more providers here
  ],
  callbacks: {
    session: async ({session, user}) => {
      session.userId = user.id;    
      return Promise.resolve(session);
    }
  }

})