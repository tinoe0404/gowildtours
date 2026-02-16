import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession, hasPermission } from "@/lib/admin/auth";

export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");

        const items = await prisma.galleryImage.findMany({
            where: category ? { category } : {},
            orderBy: { sortOrder: "asc" },
        });

        return NextResponse.json(items);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "content:manage")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    let body: any = {};
    try {
        body = await req.json();
        const item = await prisma.galleryImage.create({
            data: {
                url: body.url,
                alt: body.alt || "",
                caption: body.caption || "",
                category: body.category || "General",
                sortOrder: Number(body.sortOrder) || 0,
            },
        });

        return NextResponse.json(item);
    } catch (error: any) {
        console.error("Gallery Create Error:", {
            message: error.message,
            stack: error.stack,
            data: body,
        });
        return NextResponse.json({
            error: "Internal Server Error",
            details: error.message
        }, { status: 500 });
    }
}
