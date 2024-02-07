import type {AuthOptions} from "next-auth"
import {getServerSession, NextAuthOptions} from "next-auth"
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {prisma} from "@/lib/prisma";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials"
import {env} from './env';
import bcrypt from 'bcrypt';

// You'll need to import and pass this
// to `NextAuth` in `app/api/auth/[...nextauth]/route.ts`
export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
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

                if(!credentials) return null;

                if (credentials?.email || credentials?.password) {
                    return null;
                }

                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                if (!existingUser) return null;

                let passwordMatch;
                if (existingUser.password) {
                    passwordMatch = await bcrypt.compare(credentials.password, existingUser.password);
                }

                if (!passwordMatch) return null;

                return {
                    id: existingUser.id,
                    username: existingUser.username,
                    email: existingUser.email,
                    city: existingUser.city,
                    country: existingUser.country,
                }
            }
        })
    ],
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

}

// Use it in server contexts
export const getAuthSession = async () => {
    return await getServerSession(authOptions)
}
