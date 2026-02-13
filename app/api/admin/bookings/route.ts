import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession } from "@/lib/admin/auth";

export async function GET(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const url = new URL(req.url);
    const status = url.searchParams.get("status");
    const paymentStatus = url.searchParams.get("paymentStatus");
    const type = url.searchParams.get("type");
    const search = url.searchParams.get("search");
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");

    const where: any = {};
    if (status) where.bookingStatus = status;
    if (paymentStatus) where.paymentStatus = paymentStatus;
    if (type) where.type = type;
    if (search) {
        where.OR = [
            { customerName: { contains: search, mode: "insensitive" } },
            { customerEmail: { contains: search, mode: "insensitive" } },
            { bookingReference: { contains: search, mode: "insensitive" } },
        ];
    }

    const [bookings, total] = await Promise.all([
        prisma.booking.findMany({
            where,
            orderBy: { createdAt: "desc" },
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.booking.count({ where }),
    ]);

    return NextResponse.json({ bookings, total, page, limit, totalPages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await req.json();

    // Generate booking reference
    const count = await prisma.booking.count();
    const ref = `GWT-${String(count + 1001).padStart(5, "0")}`;

    const booking = await prisma.booking.create({
        data: { ...data, bookingReference: ref },
    });

    return NextResponse.json(booking, { status: 201 });
}
