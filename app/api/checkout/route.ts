import { NextResponse } from "next/server";
import { z } from "zod";
import { emailService } from "@/lib/email";

// Schema for the checkout request
const checkoutSchema = z.object({
    customerName: z.string().min(2),
    customerEmail: z.string().email(),
    customerPhone: z.string().min(5),
    nationality: z.string().min(2),
    specialRequests: z.string().optional(),
    hearAboutUs: z.string().optional(),
    items: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            image: z.string().optional(),
            duration: z.string().optional(),
            pricePerPerson: z.number().positive(),
            travelers: z.number().int().positive(),
            date: z.string(),
        })
    ).min(1),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = checkoutSchema.parse(body);

        // 1. Calculate amounts server-side
        const subtotal = data.items.reduce(
            (total, item) => total + item.pricePerPerson * item.travelers,
            0
        );

        // 2. Generate booking reference
        const reference = `GWT-${new Date().getFullYear()}-${Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase()}`;

        // 3. Prepare data for email
        const emailData = {
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone || "",
            nationality: data.nationality || "",
            bookingReference: reference,
            items: data.items,
            subtotal: subtotal,
            specialRequests: data.specialRequests || "",
        };

        // 4. Send confirmation emails (non-blocking)
        try {
            await emailService.sendCartBookingConfirmation(emailData);
        } catch (emailErr) {
            console.error("Failed to send customer confirmation email:", emailErr);
        }

        try {
            await emailService.sendOperatorBookingAlert(emailData);
        } catch (emailErr) {
            console.error("Failed to send operator alert email:", emailErr);
        }

        // 5. Return success with booking details
        return NextResponse.json({
            success: true,
            bookingReference: reference,
            totalPrice: subtotal,
        });
    } catch (error) {
        console.error("Checkout order error:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid request data", details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to process booking request" },
            { status: 500 }
        );
    }
}
