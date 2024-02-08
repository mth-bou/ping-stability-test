import type { NextAuthOptions } from "next-auth"
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

                try {
                    if(!credentials || !credentials.email || !credentials.password) {
                        console.error("Credentials are missing");
                        return null;
                    }

                    const existingUser = await prisma.user.findUnique({
                        where: {
                            email: credentials.email
                        }
                    });

                    if (!existingUser) {
                        console.error("No user found with this email");
                        return null;
                    }

                    const passwordMatch = existingUser.password && await bcrypt.compare(credentials.password, existingUser.password);

                    if (!passwordMatch) {
                        console.error("Incorrect password");
                        return null;
                    }

                    return {
                        id: `${existingUser.id}`,
                        email: existingUser.email,
                        username: existingUser.username,
                        name: existingUser.name,
                        image: existingUser.avatar,
                        city: existingUser.city,
                        country: existingUser.country,
                    }
                } catch (error: any) {
                    console.error("Authentication error : ", error.message);
                    return null;
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
        async jwt({ token, user}) {

            if (user) {
                return {
                    ...token,
                    username: user.username,
                    picture: user.image
                }
            }

            return token;
        },
        async session({ session, token }) {
            //if (user) session.user.id = user.id;
            if (token.user) {
                session.user = { ...session.user, ...token.user };
            }

            return session;
        }
    },

}

// Use it in server contexts
export const getAuthSession = async () => {
    return await getServerSession(authOptions)
}
