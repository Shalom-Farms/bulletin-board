import "@/styles/signin.css";

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "id",
      clientSecret: process.env.GOOGLE_SECRET || "secret",
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        return profile?.email?.endsWith("@shalomfarms.org") || false;
      }
      return true;
    },
  },
  theme: {
    logo: "https://shalomfarms.org/wp-content/uploads/2021/09/SF_logo.png",
  },
});
