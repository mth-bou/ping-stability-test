import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import bcrypt from "bcrypt";
import {Prisma} from ".prisma/client";

const userQuery = {
    id: true,
    name: true,
    username: true,
    email: true
} satisfies Prisma.UserSelect;

export const POST = async (req: Request) => {
    try {
        const body = req.json();

        // @ts-ignore
        const { email, password, username, name } = body;

        const existingUserByEmail = await prisma.user.findUniqueOrThrow({
            where: {
                email: email
            },
            select : userQuery
        });

        if (existingUserByEmail) {
            return NextResponse.json({
                user: null,
                message: "User with this email already exists",
            }, {
                status: 400
            });
        }

        const existingUserByUsername = await prisma.user.findUniqueOrThrow({
            where: {
                username: username
            }
        });

        if (existingUserByUsername) {
            return NextResponse.json({
                user: null,
                message: "User with this username already exists",
            }, {
                status: 400
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                username,
                name
            }
        });

        return NextResponse.json({
            user: newUser,
            message: "User created successfully"
        }, {
            status: 201
        });
    } catch(err: any) {
        return new Response(err.message, {
            status: 500
        });
    }
}
