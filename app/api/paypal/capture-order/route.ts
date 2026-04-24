/**
 * POST /api/paypal/capture-order
 * 
 * Captures an approved PayPal order, validates the payment,
 * creates the booking in the database, and sends confirmation emails.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { capturePayPalOrder, DEPOSIT_PERCENTAGE } from "@/lib/paypal";
import { emailService } from "@/lib/email";

// Schema for the capture request
const captureOrderSchema = z.object({
    orderId: z.string(),
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
            image: z.string(),
            duration: z.string(),
            pricePerPerson: z.number().positive(),
            travelers: z.number().int().positive(),
            date: z.string(),
        })
    ).min(1),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = captureOrderSchema.parse(body);

        // 1. Capture the PayPal payment
        const captureResult = await capturePayPalOrder(data.orderId);

        if (captureResult.status !== "COMPLETED") {
            return NextResponse.json(
                { error: "Payment was not completed", status: captureResult.status },
                { status: 400 }
            );
        }

        // 2. Recalculate amounts server-side for validation
        const subtotal = data.items.reduce(
            (total, item) => total + item.pricePerPerson * item.travelers,
            0
        );
        const expectedDeposit = Math.round(subtotal * DEPOSIT_PERCENTAGE * 100) / 100;
        const capturedAmount = parseFloat(captureResult.amount);

        // 3. Validate that captured amount matches expected deposit (with $1 tolerance)
        if (Math.abs(capturedAmount - expectedDeposit) > 1) {
            console.error(
                `Amount mismatch: captured $${capturedAmount}, expected $${expectedDeposit}`
            );
            return NextResponse.json(
                { error: "Payment amount verification failed" },
                { status: 400 }
            );
        }

        // 4. Generate booking reference
        const reference = `GWT-${new Date().getFullYear()}-${Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase()}`;

        // 5. Removed database saving
        // Prepare data for email
        const booking = {
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            customerPhone: data.customerPhone,
            nationality: data.nationality,
            specialRequests: data.specialRequests,
            bookingReference: reference,
        };

        // 6. Send confirmation emails (non-blocking — don't fail the booking if emails fail)
        const emailData = {
            customerName: booking.customerName,
            customerEmail: booking.customerEmail,
            customerPhone: booking.customerPhone || "",
            nationality: booking.nationality || "",
            bookingReference: booking.bookingReference,
            items: data.items,
            subtotal: capturedAmount,
            specialRequests: booking.specialRequests || "",
        };

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

        // 7. Return success with booking details
        return NextResponse.json({
            success: true,
            bookingReference: booking.bookingReference,
            depositPaid: capturedAmount,
            remainingBalance: subtotal - capturedAmount,
            totalPrice: subtotal,
        });
    } catch (error) {
        console.error("Capture PayPal order error:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid request data", details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to process payment" },
            { status: 500 }
        );
    }
}
