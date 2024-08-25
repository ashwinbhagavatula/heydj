import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "@/database/db.js";
import User from "@/models/user";
const bcrypt = require("bcryptjs");

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "Sign_In",
      name: "Sign-In-Credentials-Provider",
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: "Connection Failed...!";
        });

        const user = await User.findOne({ email: credentials.email });
        if (!user)
          throw new Error("No user Found with Email Please Sign Up...!");

        const checkPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!checkPassword || user.email !== credentials.email) {
          throw new Error("Username & Password doesn't match");
        }

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "Sign_Up",
      name: "Sign-Up-Credentials-Provider",
      async authorize(credentials, req) {
        connectMongo().catch((error) => {
          error: "Connection Failed...!";
        });

        const oldUser = await User.findOne({ email: credentials.email });
        if (oldUser) throw new Error("User already exists.");

        const user = await User.create({
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        });

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.userId; // Store user ID in JWT token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.userId = token.id; // Store user ID in session
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
