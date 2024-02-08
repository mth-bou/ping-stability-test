import {getAuthSession} from "@/lib/auth";
import {Prisma} from ".prisma/client";
import {cache} from 'react';
import {prisma} from "@/lib/prisma";

const userQuery = {
    id: true,
    name: true,
    username: true,
    avatar: true,
    createdAt: true
} satisfies Prisma.UserSelect;

export const getUser = async () => {
    const session = await getAuthSession();

    if (!session?.user.id) {
        throw new Error("User not found");
    }

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: session.user.id
        }
    });

    return user;
}

export const getUserProfile = cache(async (userId: string) => {
    return prisma.user.findFirst({
        where: {
            OR: [
                {
                    username: userId,
                },
                {
                    id: userId,
                }
            ]
        },
        select: {
            ...userQuery,
        },
    });
});

export type UserProfile = NonNullable<Prisma.PromiseReturnType<typeof getUserProfile>>
