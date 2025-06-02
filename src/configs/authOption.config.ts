import { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

export const authOptions: NextAuthOptions = {
    providers: [
        DiscordProvider({
            clientId: process.env.NEXTAUTH_DISCORD_CLIENT_ID as string,
            clientSecret: process.env.NEXTAUTH_DISCORD_CLIENT_SECRET as string,
        })
    ],
    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },
};