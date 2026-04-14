"use server";

import { z } from "zod";
import prisma from "@/lib/db";
import { emailService } from "@/lib/email";

// Validates incoming data based on our checkout schema
const bookingInputSchema = z.object({
    customerName: z.string().min(2),
    customerEmail: z.string().email(),
    customerPhone: z.string().min(5),
    nationality: z.string().min(2),
    specialRequests: z.string().optional(),
    hearAboutUs: z.string().optional(),
    subtotal: z.number().positive(),
    items: z.array(
        z.object({
            id: z.string(),
            name: z.string(),
            image: z.string(),
            duration: z.string(),
            pricePerPerson: z.number(),
            travelers: z.number(),
            date: z.string(),
        })
    ).min(1),
});

export async function createBooking(data: z.infer<typeof bookingInputSchema>) {
    try {
        // 1. Validate data
        const validatedData = bookingInputSchema.parse(data);

        // 2. Generate 8-character reference code (e.g., A1B2C3D4)
        const reference = Math.random().toString(36).substring(2, 10).toUpperCase();

        // 3. Insert into Database using Prisma
        const booking = await prisma.booking.create({
            data: {
                bookingReference: reference,
                type: "package", // Or make it dynamic if needed
                customerName: validatedData.customerName,
                customerEmail: validatedData.customerEmail,
                customerPhone: validatedData.customerPhone,
                nationality: validatedData.nationality,
                specialRequests: validatedData.specialRequests,
                hearAboutUs: validatedData.hearAboutUs,
                items: validatedData.items, // JSON array
                subtotal: validatedData.subtotal,
                totalPrice: validatedData.subtotal, // Adding it to totalPrice as well so it conforms to the existing expected structure if needed
                bookingStatus: "pending",
                paymentStatus: "pending",
            }
        });

        const emailsData = {
            customerName: booking.customerName,
            customerEmail: booking.customerEmail,
            customerPhone: booking.customerPhone || "",
            nationality: booking.nationality || "",
            bookingReference: booking.bookingReference,
            items: validatedData.items,
            subtotal: validatedData.subtotal,
            specialRequests: booking.specialRequests || "",
        };

        // 4. Send Customer Email
        try {
            await emailService.sendCartBookingConfirmation(emailsData);
        } catch (emailErr) {
            console.error("Failed to send customer confirmation email:", emailErr);
            // Don't throw, we still want to return success since the booking is saved
        }

        // 5. Send Operator Email
        try {
            await emailService.sendOperatorBookingAlert(emailsData);
        } catch (emailErr) {
            console.error("Failed to send operator alert email:", emailErr);
        }

        // 6. Return success
        return { success: true, reference: booking.bookingReference };
        
    } catch (error) {
        console.error("Booking Creation Error:", error);
        if (error instanceof z.ZodError) {
            return { success: false, error: "Invalid form data provided." };
        }
        return { success: false, error: "Database error occurred." };
    }
}
