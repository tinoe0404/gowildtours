import { NextResponse } from 'next/server';
import { z } from 'zod';
import { generateBookingReference } from '@/lib/utils';
import { emailService } from '@/lib/email';

const bookingSchema = z.object({
    customerName: z.string().min(2),
    customerEmail: z.string().email(),
    customerPhone: z.string().optional(),
    customerCountry: z.string().optional(),
    type: z.enum(['package', 'activity', 'hotel', 'custom']),
    itemId: z.string(), // packageId, activityId, or hotelId
    checkInDate: z.string().optional(),
    checkOutDate: z.string().optional(),
    numberOfAdults: z.number().int().min(1),
    numberOfChildren: z.number().int().default(0),
    childrenAges: z.array(z.number().int()).optional(),
    specialRequests: z.string().optional(),
    totalPrice: z.number().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = bookingSchema.parse(body);

        const bookingReference = generateBookingReference();

        // Map itemId to the correct DB field
        // Removed database saving logic

        // Send Email Notifications
        await emailService.sendBookingConfirmation({
            customerName: validatedData.customerName,
            customerEmail: validatedData.customerEmail,
            bookingReference,
            type: validatedData.type,
            totalPrice: validatedData.totalPrice,
        });

        return NextResponse.json({
            success: true,
            message: 'Booking request submitted successfully',
            bookingReference: bookingReference,
            bookingId: Date.now().toString(),
        });

    } catch (error) {
        console.error('Booking API Error:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                success: false,
                error: 'Validation failed',
                details: error.errors,
            }, { status: 400 });
        }
        return NextResponse.json({
            success: false,
            error: 'An internal error occurred',
        }, { status: 500 });
    }
}
