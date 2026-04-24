import { NextResponse } from 'next/server';
import { z } from 'zod';
import { emailService } from '@/lib/email';

const contactSchema = z.object({
    name: z.string().min(2).max(255),
    email: z.string().email(),
    phone: z.string().optional(),
    subject: z.string().min(1),
    message: z.string().min(20),
    inquiry_type: z.enum(['General Inquiry', 'Safari Package Info', 'Booking Assistance', 'Custom Request', 'Feedback']).default('General Inquiry'),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Validate input
        const validatedData = contactSchema.parse(body);

        // 2. Send Branded Emails

        // 4. Send Branded Emails
        await emailService.sendContactConfirmation({
            name: validatedData.name,
            email: validatedData.email,
            subject: validatedData.subject,
            message: validatedData.message,
        });

        return NextResponse.json({
            success: true,
            message: 'Inquiry submitted successfully',
            inquiryId: Date.now().toString(),
        });

    } catch (error) {
        console.error('Contact API Error:', error);
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
