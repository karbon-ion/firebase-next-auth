import { logout } from "@/lib/firebase/auth";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        await logout();
        return NextResponse.json({ message: "Logout successful" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
}