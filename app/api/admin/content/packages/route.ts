import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession, hasPermission } from "@/lib/admin/auth";

// Generic content CRUD for packages
export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "25");

    const [items, total] = await Promise.all([
        prisma.package.findMany({
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.package.count(),
    ]);

    return NextResponse.json({ items, total, totalPages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session || !hasPermission(session.role, "content:manage")) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const data = await req.json();
    const slug = data.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") || `pkg-${Date.now()}`;

    const item = await prisma.package.create({
        data: { ...data, slug },
    });

    return NextResponse.json(item, { status: 201 });
}
