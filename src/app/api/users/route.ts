import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import bcrypt from "bcrypt";
import {Prisma} from ".prisma/client";
import * as z from "zod";

// Define a schema for input validation
const userSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters."
    }),
    username: z.string().min(3, {
        message: "Username must be at least 3 characters."
    }),
    email: z.string().min(5, {
        message: "Email must be at least 5 characters."
    }).email("Invalid email"),
    password: z.string().min(1, "Password is required").min(8, {
        message: "Password must be at least 8 characters."
    }),
    city: z.string().min(3, {
        message: "City must be at least 3 characters."
    }),
    country: z.string().min(3, {
        message: "Country must be at least 3 characters."
    })
});

const userQuery = {
    id: true,
    name: true,
    username: true,
    email: true
} satisfies Prisma.UserSelect;

export const POST = async (req: Request): Promise<NextResponse> => {
    try {
        const body = await req.json();

        const {email, password, username, name, city, country} =  userSchema.parse(body);

        const existingUserByEmail = await prisma.user.findUnique({
            where: {
                email: email
            },
            select: userQuery
        });

        if (existingUserByEmail) {
            return NextResponse.json({
                user: null,
                message: "User with this email already exists",
            }, {
                status: 409
            });
        }

        const existingUserByUsername = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (existingUserByUsername) {
            return NextResponse.json({
                user: null,
                message: "User with this username already exists",
            }, {
                status: 409
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                username,
                name,
                password: hashedPassword,
                ...city && {city},
                ...country && {country}
            }
        }) satisfies Prisma.UserCreateInput;

        // Avoid to return password in the new User object
        const { password: newUserPassword, ...newUserWithoutPassword } = newUser;

        return NextResponse.json({
            user: newUserWithoutPassword,
            message: "User created successfully"
        }, {
            status: 201
        });
    } catch (err: any) {
        return NextResponse.json({
            message: "Something went wrong."
        }, {
            status: 500
        });
    }
}
