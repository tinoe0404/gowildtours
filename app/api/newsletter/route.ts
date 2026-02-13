import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/db';

const newsletterSchema = z.object({
    email: z.string().email(),
    name: z.string().optional(),
    source: z.string().optional(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = newsletterSchema.parse(body);

        const subscriber = await prisma.newsletterSubscriber.upsert({
            where: { email: validatedData.email },
            update: {
                status: 'active',
                name: validatedData.name || undefined,
                unsubscribedAt: null,
            },
            create: {
                email: validatedData.email,
                name: validatedData.name,
                source: validatedData.source || 'website',
                status: 'active',
            },
        });

        return NextResponse.json({
            success: true,
            message: 'Subscription successful',
            subscriberId: subscriber.id,
        });

    } catch (error) {
        console.error('Newsletter API Error:', error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({
                success: false,
                error: 'Invalid email format',
            }, { status: 400 });
        }
        return NextResponse.json({
            success: false,
            error: 'An internal error occurred',
        }, { status: 500 });
    }
}
