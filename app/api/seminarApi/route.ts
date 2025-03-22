import SeminarModel from "@/app/schema/SeminarModel";
import { Database } from "@/lib/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // ✅ Force dynamic API route

// ✅ POST: Create a Seminar
export async function POST(req: Request) {
    try {
        await Database();
        const { topic, category, student1, student2 } = await req.json();

        if (!topic || !category || !student1) {
            return NextResponse.json(
                { message: "Please fill all required fields." },
                { status: 400 }
            );
        }

        const seminarPost = new SeminarModel({ topic, category, student1, student2 });
        await seminarPost.save();

        return NextResponse.json(
            { message: "Seminar submitted successfully!" },
            { status: 201 }
        );
    } catch (err) {
        console.error("❌ Error submitting seminar:", err);
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json(
            { message: "Server error", error: errorMessage },
            { status: 500 }
        );
    }
}

// ✅ GET: Fetch all seminar entries
export async function GET() {
    try {
        await Database();
        const seminars = await SeminarModel.find().sort({ createdAt: -1 });

        return NextResponse.json({ data: seminars }, { status: 200 });
    } catch (error) {
        console.error("❌ Error fetching seminars:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return NextResponse.json(
            { message: "Failed to fetch seminars", error: errorMessage },
            { status: 500 }
        );
    }
}
