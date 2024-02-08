import type { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface User {
        username: string;
    }
    interface Session {
        user: User & {
            id?: string;
            email?: string,
            username: string;
        },
        token: {
            username: string;
        }
    }
}
