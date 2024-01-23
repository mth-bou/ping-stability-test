import {createEnv} from "@t3-oss/env-nextjs";
import {z} from "zod";

export const env = createEnv({
    server: {
        GITHUB_ID: z.string().min(1),
        GITHUB_SECRET: z.string().min(1),
        GOOGLE_ID: z.string().min(1),
        GOOGLE_SECRET: z.string().min(1),
    },
    client: {

    },
    runtimeEnv: {
        GITHUB_ID: process.env.GITHUB_CLIENT_ID,
        GITHUB_SECRET: process.env.GITHUB_CLIENT_SECRET,
        GOOGLE_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    }
})
