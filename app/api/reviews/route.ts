import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const reviewSchema = z.object({
  tourId: z.string().min(1),
  customerName: z.string().min(2),
  rating: z.number().min(1).max(5),
  content: z.string().min(10),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = reviewSchema.parse(body);

    const review = await prisma.review.create({
      data: {
        tourId: data.tourId,
        customerName: data.customerName,
        rating: data.rating,
        content: data.content,
        // isApproved defaults to false via schema
      },
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('Failed to submit review:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
