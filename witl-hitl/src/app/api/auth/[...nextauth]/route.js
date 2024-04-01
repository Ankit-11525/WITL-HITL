import NextAuth from "next-auth"
import clientPromise from '@/libs/mongoClient'
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import GitHubProvider from "next-auth/providers/github";


export const authOptions={
  secret:process.env.SECRET,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),
      GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
      })
    ]
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }