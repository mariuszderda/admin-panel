import { signInSchema } from "@/types/schema/sign-in-schema";
import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";

export const BASE_PATH = "/api/auth";

export const authOptions: NextAuthConfig = {
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      // @ts-ignore
      // eslint-disable-next-line consistent-return
      async authorize(credentials) {
        try {
          let resp = null;
          const { email, password } =
            await signInSchema.parseAsync(credentials);

          // logic to salt and hash password
          const url = `${process.env.API_HOST}/auth/login`;
          // logic to verify if user exists
          resp = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
              username: email,
              password,
            }),
          });
          const user = await resp.json();

          if (!user) throw new Error("User not found.");

          // return json object with the user data
          console.log("USER AFTER", user);
          return user;
        } catch (error) {
          if (error instanceof ZodError)
            // Return `null` to indicate that the credentials are invalid
            return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        // eslint-disable-next-line no-param-reassign
        token.id = user.userId;
        // eslint-disable-next-line no-param-reassign
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      session.user.userId = token.userId;
      // @ts-ignore
      // eslint-disable-next-line no-param-reassign
      session.user.token = token.token;
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
