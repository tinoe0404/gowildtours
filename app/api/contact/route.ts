import { NextResponse } from 'next/server';
import { z } from 'zod';
import { emailService } from '@/lib/email';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const contactSchema = z.object({
    name: z.string().min(2).max(255),
    email: z.string().email(),
    phone: z.string().optional(),
    subject: z.string().min(1),
    message: z.string().min(5),
    inquiry_type: z.enum(['General Inquiry', 'Safari Package Info', 'Booking Assistance', 'Custom Request', 'Feedback']).default('General Inquiry'),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // 1. Validate input
        const validatedData = contactSchema.parse(body);

        // 2. Save Message to Database
        const savedMessage = await prisma.message.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                phone: validatedData.phone || null,
                subject: validatedData.subject,
                message: validatedData.message,
                inquiryType: validatedData.inquiry_type,
            },
        });

        // 3. Send Notification & Confirmation Emails
        try {
            await emailService.sendContactConfirmation({
                name: validatedData.name,
                email: validatedData.email,
                phone: validatedData.phone || undefined,
                subject: validatedData.subject,
                message: validatedData.message,
                inquiryType: validatedData.inquiry_type,
            });
        } catch (emailError) {
            console.error('Failed to dispatch emails, but message was saved to database:', emailError);
        }

        revalidatePath('/admin/dashboard');
        revalidatePath('/admin/messages');

        return NextResponse.json({
            success: true,
            message: 'Inquiry submitted successfully',
            inquiryId: savedMessage.id,
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
