import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db';

const reviewSchema = z.object({
    reviewerName: z.string().min(2),
    reviewerEmail: z.string().email().optional(),
    reviewerCountry: z.string().optional(),
    rating: z.number().int().min(1).max(5),
    title: z.string().optional(),
    reviewText: z.string().min(10),
    travelDate: z.string().optional(),
    travelerType: z.enum(['solo', 'couple', 'family', 'friends', 'business']).optional(),
    packageId: z.string().optional(),
    activityId: z.string().optional(),
    hotelId: z.string().optional(),
    bookingReference: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = reviewSchema.parse(body);

        const review = await prisma.review.create({
            data: {
                reviewerName: validatedData.reviewerName,
                reviewerEmail: validatedData.reviewerEmail,
                reviewerCountry: validatedData.reviewerCountry,
                rating: validatedData.rating,
                title: validatedData.title,
                reviewText: validatedData.reviewText,
                travelDate: validatedData.travelDate ? new Date(validatedData.travelDate) : null,
                travelerType: validatedData.travelerType,
                packageId: validatedData.packageId,
                activityId: validatedData.activityId,
                hotelId: validatedData.hotelId,
                bookingReference: validatedData.bookingReference,
                status: 'pending', // Requires admin approval
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Review submitted for moderation',
            reviewId: review.id,
        });

    } catch (error) {
        console.error('Review API Error:', error);
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
