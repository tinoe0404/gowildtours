import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { isApproved } = await req.json();

    const review = await prisma.review.update({
      where: { id },
      data: { isApproved },
    });

    revalidatePath('/reviews');
    revalidatePath('/admin/reviews');
    revalidatePath('/admin/dashboard');

    return NextResponse.json(review);
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json({ error: 'Failed to update review' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.review.delete({
      where: { id },
    });

    revalidatePath('/reviews');
    revalidatePath('/admin/reviews');
    revalidatePath('/admin/dashboard');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 });
  }
}
