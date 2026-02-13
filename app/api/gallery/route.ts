import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");

        const where: any = {};

        if (category && category !== "All") {
            where.category = category;
        }

        const images = await prisma.galleryImage.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
        });

        return NextResponse.json(images);
    } catch (error) {
        console.error("Failed to fetch gallery images:", error);
        return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
    }
}
