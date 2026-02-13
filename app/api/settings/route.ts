import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
    try {
        const settings = await prisma.siteSetting.findMany();

        // Transform into a key-value object
        const settingsMap = settings.reduce((acc: any, setting) => {
            acc[setting.key] = setting.value;
            return acc;
        }, {});

        return NextResponse.json(settingsMap);
    } catch (error) {
        console.error("Failed to fetch settings:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
