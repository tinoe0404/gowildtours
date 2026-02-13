import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession } from "@/lib/admin/auth";

export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const priority = url.searchParams.get("priority");
    const type = url.searchParams.get("type");
    const search = url.searchParams.get("search");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (type) where.type = type;
    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
        ];
    }

    const [inquiries, total] = await Promise.all([
        prisma.inquiry.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.inquiry.count({ where }),
    ]);

    return NextResponse.json({ inquiries, total, page, limit, totalPages: Math.ceil(total / limit) });
}

export async function PATCH(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { ids, update } = await req.json();

    if (ids && Array.isArray(ids)) {
        // Bulk update
        await prisma.inquiry.updateMany({ where: { id: { in: ids } }, data: update });
        return NextResponse.json({ success: true, count: ids.length });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
