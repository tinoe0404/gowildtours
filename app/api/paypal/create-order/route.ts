/**
 * POST /api/paypal/create-order
 * 
 * Creates a PayPal order for the 30% deposit amount.
 * Recalculates the subtotal server-side to prevent client tampering.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { createPayPalOrder, DEPOSIT_PERCENTAGE } from "@/lib/paypal";

// Schema for validating the request body
const createOrderSchema = z.object({
    items: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            pricePerPerson: z.number().positive(),
            travelers: z.number().int().positive(),
        })
    ).min(1),
    customerName: z.string().min(2),
    customerEmail: z.string().email(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const data = createOrderSchema.parse(body);

        // Server-side subtotal calculation (prevents client tampering)
        const subtotal = data.items.reduce(
            (total, item) => total + item.pricePerPerson * item.travelers,
            0
        );

        // Calculate deposit (30% of subtotal)
        const depositAmount = Math.round(subtotal * DEPOSIT_PERCENTAGE * 100) / 100;

        if (depositAmount <= 0) {
            return NextResponse.json(
                { error: "Invalid order amount" },
                { status: 400 }
            );
        }

        // Generate a temporary booking reference for PayPal tracking
        const tempReference = `GWT-${Date.now().toString(36).toUpperCase()}`;

        // Build description from tour names
        const tourNames = data.items.map((i) => i.name).join(", ");
        const description = `30% Deposit for: ${tourNames}`;

        // Create the PayPal order with only the deposit amount
        const order = await createPayPalOrder(depositAmount, description, tempReference);

        return NextResponse.json({
            orderId: order.id,
            depositAmount,
            subtotal,
            remainingBalance: subtotal - depositAmount,
        });
    } catch (error) {
        console.error("Create PayPal order error:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Invalid request data", details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: "Failed to create PayPal order" },
            { status: 500 }
        );
    }
}
