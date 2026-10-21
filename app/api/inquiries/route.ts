import { NextResponse } from 'next/server';
import { z } from 'zod';
import { emailService } from '@/lib/email';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const inquirySchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional().nullable(),
  subject: z.string().optional(),
  message: z.string().optional().nullable(),
  packageTitle: z.string().optional().nullable(),
  packageId: z.string().optional().nullable(),
  travelers: z.union([z.number(), z.string()]).optional().nullable(),
  numberOfTravelers: z.union([z.number(), z.string()]).optional().nullable(),
  date: z.string().optional().nullable(),
  preferredDate: z.string().optional().nullable(),
  type: z.string().optional(),
  inquiry_type: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const data = inquirySchema.parse(rawBody);

    const packageName = data.packageTitle || data.packageId || 'Safari Package';
    const travelersCount = data.travelers || data.numberOfTravelers || '2';
    const chosenDate = data.date || data.preferredDate || 'Flexible / Not specified';
    const userMessage = (data.message || '').trim();

    const subject =
      data.subject?.trim() ||
      (packageName ? `Safari Inquiry: ${packageName}` : 'Safari Package Inquiry');

    // Build clear message content
    const details = [
      userMessage ? `Message: ${userMessage}` : 'Inquiry requested for safari package availability.',
      '--- Trip Details ---',
      `Package: ${packageName}`,
      `Travelers: ${travelersCount}`,
      `Preferred Date: ${chosenDate}`,
      data.phone ? `Contact Phone: ${data.phone}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    // 1. Save to database as a Message
    const savedMessage = await prisma.message.create({
      data: {
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone?.trim() || null,
        subject,
        message: details,
        inquiryType: 'Safari Package Info',
      },
    });

    // 2. Send email notification & confirmation (gracefully catch if SMTP fails)
    try {
      await emailService.sendContactConfirmation({
        name: data.name,
        email: data.email,
        subject,
        message: details,
      });
    } catch (emailError) {
      console.error('Email sending failed for package inquiry, but saved to DB:', emailError);
    }

    revalidatePath('/admin/dashboard');
    revalidatePath('/admin/messages');

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully',
      inquiryId: savedMessage.id,
    });
  } catch (error) {
    console.error('Inquiries API error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: error.errors[0]?.message || 'Validation error',
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        error: 'An internal error occurred. Please try again.',
      },
      { status: 500 }
    );
  }
}
