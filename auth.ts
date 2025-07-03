import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { author_by_githubid_query } from "./sanity/lib/queries";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user,
      // user: { id, name, email, image },
      profile
    }) {

      let { name, email, image } = user

      // console.log("@user", user)
      // console.log("@profile", profile)

      // console.log("@user", user)
      // console.log("@profile", profile?.login)

      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(author_by_githubid_query, {
          id: profile?.id
        });

      // console.log("@existingUser", existingUser)

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: profile?.id,
          name,
          username: profile?.login,
          email,
          image,
          bio: profile?.bio || "",
        });
      }

      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(author_by_githubid_query, {
            id: profile?.id
          });

        // console.log("@user", user)
        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      // console.log("@token", token)
      Object.assign(session, { id: token?.id });
      // console.log("@session", session)
      return session;
    },
  },
});
