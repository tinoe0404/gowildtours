import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { type, name, email, phone, message, numberOfTravelers, preferredDate, packageId } = body;

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const inquiry = await prisma.inquiry.create({
            data: {
                type: type || "contact",
                name,
                email,
                phone,
                message,
                numberOfTravelers: numberOfTravelers ? parseInt(numberOfTravelers) : null,
                packageId,
                status: "new",
                priority: "medium",
                metadata: preferredDate ? { preferredDate } : undefined,
            },
        });

        // Optional: Trigger email notification here

        return NextResponse.json({ success: true, id: inquiry.id });
    } catch (error) {
        console.error("Failed to create inquiry:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
