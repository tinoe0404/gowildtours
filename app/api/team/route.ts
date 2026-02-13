import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
    try {
        const team = await prisma.teamMember.findMany({
            orderBy: { name: "asc" },
        });
        return NextResponse.json(team);
    } catch (error) {
        console.error("Failed to fetch team:", error);
        return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
    }
}
