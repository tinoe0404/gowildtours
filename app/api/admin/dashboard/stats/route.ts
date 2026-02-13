import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getSession } from "@/lib/admin/auth";

export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        // Parallel queries
        const [
            bookingsThisMonth,
            bookingsLastMonth,
            revenueThisMonth,
            revenueLastMonth,
            newInquiries,
            pendingReviews,
            activeSubscribers,
            recentBookings,
            recentInquiries,
        ] = await Promise.all([
            prisma.booking.count({ where: { createdAt: { gte: startOfMonth } } }),
            prisma.booking.count({ where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } } }),
            prisma.booking.aggregate({ _sum: { totalPrice: true }, where: { createdAt: { gte: startOfMonth } } }),
            prisma.booking.aggregate({ _sum: { totalPrice: true }, where: { createdAt: { gte: startOfLastMonth, lte: endOfLastMonth } } }),
            prisma.inquiry.count({ where: { status: "new" } }),
            prisma.review.count({ where: { status: "pending" } }),
            prisma.newsletterSubscriber.count({ where: { status: "active" } }),
            prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 5, select: { id: true, bookingReference: true, customerName: true, totalPrice: true, bookingStatus: true, createdAt: true } }),
            prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5, select: { id: true, name: true, type: true, status: true, createdAt: true } }),
        ]);

        const revThis = Number(revenueThisMonth._sum.totalPrice || 0);
        const revLast = Number(revenueLastMonth._sum.totalPrice || 0);
        const revTrend = revLast > 0 ? Math.round(((revThis - revLast) / revLast) * 100) : 0;
        const bookTrend = bookingsLastMonth > 0 ? Math.round(((bookingsThisMonth - bookingsLastMonth) / bookingsLastMonth) * 100) : 0;

        return NextResponse.json({
            stats: {
                bookings: { value: bookingsThisMonth, trend: bookTrend },
                revenue: { value: revThis, trend: revTrend },
                inquiries: newInquiries,
                pendingReviews,
                subscribers: activeSubscribers,
            },
            recentBookings,
            recentInquiries,
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
    }
}
