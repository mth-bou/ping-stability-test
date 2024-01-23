import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from "next"
import type {DefaultUser, NextAuthOptions, User} from "next-auth"
import { getServerSession } from "next-auth"
import {PrismaAdapter} from '@next-auth/prisma-adapter';
import {prisma} from "@/lib/prisma";
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials"
import {env} from './env';

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
                    image:      profile.avatar_url
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
                if (!credentials || !credentials.email || !credentials.password) return null;

                const dbUser = await prisma.user.findFirst({
                    where: { email: credentials.email },
                });

                // Verifiy password here
                // In production, password should be encrypted using something like bcrypt...
                if (dbUser && dbUser.password === credentials.password) {
                    const { password, createdAt, id, ...dbWithoutPassword} = dbUser;
                    return dbWithoutPassword as User;
                }

                return null;
            }
        })
    ],
    callbacks: {
        session({ session, user }) {
            if (!session?.user) return session;
            session.user.id = user.id;
            return session;
        }
    }
} satisfies NextAuthOptions

// Use it in server contexts
export const getAuthSession = async () => {
    return await getServerSession(authOptions)
}
