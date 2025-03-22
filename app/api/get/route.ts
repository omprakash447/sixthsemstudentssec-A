import SeminarModel from "@/app/schema/SeminarModel";
import { Database } from "@/lib/database";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        await Database();
        const seminars = await SeminarModel.find().sort({ createdAt: -1 });

        return NextResponse.json({ data: seminars }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { message: "Failed to fetch seminars", error },
            { status: 500 }
        );
    }
}