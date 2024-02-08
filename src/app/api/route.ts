import {getAuthSession} from "@/lib/auth";
import {NextResponse} from "next/server";

export const GET = async (req: Request) => {
    const session = await getAuthSession();

    return NextResponse.json({
        authenticated: !!session
    });
}
