import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count += 1;
  return false;
}

function sanitizeInput(text: string): string {
  if (!text) return "";
  // Basic HTML tag stripping to prevent simple injection
  return text.replace(/<[^>]*>?/gm, "").trim();
}

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, rating, message, country, tourId } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 50) {
      return NextResponse.json({ error: "Invalid name (max 50 characters)" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim().length === 0 || message.length > 1000) {
      return NextResponse.json({ error: "Invalid message (max 1000 characters)" }, { status: 400 });
    }
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating (must be 1-5)" }, { status: 400 });
    }

    const sanitizedName = sanitizeInput(name);
    const sanitizedMessage = sanitizeInput(message);
    const sanitizedCountry = sanitizeInput(country || "");
    const sanitizedTourId = sanitizeInput(tourId || "General Safari Experience");

    const customerName = sanitizedCountry
      ? `${sanitizedName} (${sanitizedCountry})`
      : sanitizedName;

    // Save directly to Postgres database
    const review = await prisma.review.create({
      data: {
        tourId: sanitizedTourId,
        customerName,
        rating: Math.round(rating),
        content: sanitizedMessage,
        isApproved: false, // Requires admin approval
      },
    });

    // Revalidate admin dashboard and reviews page
    revalidatePath("/admin/reviews");
    revalidatePath("/admin/dashboard");

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully for approval",
      review: {
        id: review.id,
        name: review.customerName,
        rating: review.rating,
        createdAt: review.createdAt,
      },
    });
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
