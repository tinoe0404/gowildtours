import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession } from "@/lib/admin/auth";

export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    const where: any = {};
    if (status && status !== "all") where.status = status;

    const [reviews, total] = await Promise.all([
        prisma.review.findMany({ where, orderBy: { createdAt: "desc" }, skip: (page - 1) * limit, take: limit }),
        prisma.review.count({ where }),
    ]);

    return NextResponse.json({ reviews, total, totalPages: Math.ceil(total / limit) });
}

export async function PATCH(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id, status } = await req.json();
    const review = await prisma.review.update({
        where: { id },
        data: {
            status,
            moderatedBy: session.name,
            ...(status === "approved" ? { approvedAt: new Date() } : {}),
        },
    });

    return NextResponse.json(review);
}
