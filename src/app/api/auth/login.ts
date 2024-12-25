import { SignIn } from "@/lib/firebase/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {email, password} = await req.json()

    try{
        const user = await SignIn(email, password)

        return NextResponse.json(user)
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 401})
    }
}