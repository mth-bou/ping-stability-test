import type {AuthOptions} from "next-auth"
import { getServerSession } from "next-auth"
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {prisma} from "@/lib/prisma";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials"
import {env} from './env';
import bcrypt from 'bcrypt';

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: env.GITHUB_ID as string,
            clientSecret: env.GITHUB_SECRET as string,
            profile(profile) {
                return {
                    id:         profile.id.toString(),
                    username:   profile.login,
                    name:       profile.name,
                    email:      profile.email,
                    avatar:      profile.avatar_url
                }
            }
        }),
        GoogleProvider({
            clientId: env.GOOGLE_ID as string,
            clientSecret: env.GOOGLE_SECRET as string,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        CredentialsProvider({
            type: "credentials",
            name: "S'identifier",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@gmail.com"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials) {
                if (!credentials) return null;

                // Are email and password filled ?
                const { email, password } = credentials as { email: string, password: string };
                if (!email || !password) return null;

                // Check if user exists
                const user = await prisma.user.findUnique({
                    where: { email: email },
                });
                if (!user) return null;

                const isPasswordValid = bcrypt.compare(credentials.password, user.password);

                if (isPasswordValid) {
                    return user;
                }

                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_URL,
    pages: {
        signIn: '/auth/signin',
        signOut: '/auth/signout',
        error: '/auth/error',
        verifyRequest: '/auth/verify-request',
    },
    callbacks: {
        async session({ session, user }) {
            if (!session?.user) return session;
            session.user.id = user.id;
            return session;
        }
    },

} satisfies AuthOptions

// Use it in server contexts
export const getAuthSession = async () => {
    return await getServerSession(authOptions)
}
