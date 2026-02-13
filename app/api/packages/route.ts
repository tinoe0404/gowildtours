import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const featured = searchParams.get("featured") === "true";
        const category = searchParams.get("category");
        const destinations = searchParams.getAll("destinations");

        const where: any = {
            isPublished: true,
        };

        if (featured) {
            where.isFeatured = true;
        }

        if (category && category !== "All") {
            where.category = category;
        }

        const packages = await prisma.package.findMany({
            where,
            orderBy: {
                createdAt: "desc",
            },
        });

        // Map Decimal to Number for frontend compatibility
        const formattedPackages = packages.map(pkg => ({
            ...pkg,
            price: Number(pkg.price),
            // Unpack itinerary JSON if needed, or keep as is
            ...(pkg.itinerary as any),
        }));

        return NextResponse.json(formattedPackages);
    } catch (error) {
        console.error("Failed to fetch packages:", error);
        return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
    }
}
