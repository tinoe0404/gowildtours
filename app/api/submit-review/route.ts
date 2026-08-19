import { NextResponse } from "next/server";

// Simple in-memory rate limiting (Note: In a true serverless environment, 
// this is per-instance, but it satisfies the basic requirement)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3;

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
    const { name, rating, message, country, tourSlug, tourTitle } = body;

    // Validation
    if (!name || typeof name !== "string" || name.length > 50) {
      return NextResponse.json({ error: "Invalid name (max 50 characters)" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.length > 500) {
      return NextResponse.json({ error: "Invalid message (max 500 characters)" }, { status: 400 });
    }
    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating (must be 1-5)" }, { status: 400 });
    }
    if (tourSlug !== undefined && (typeof tourSlug !== "string" || tourSlug.length > 120)) {
      return NextResponse.json({ error: "Invalid tour" }, { status: 400 });
    }

    const sanitizedName = sanitizeInput(name);
    const sanitizedMessage = sanitizeInput(message);
    const sanitizedCountry = sanitizeInput(country || "");

    const payload = {
      name: sanitizedName,
      rating,
      message: sanitizedMessage,
      country: sanitizedCountry,
      tourSlug: typeof tourSlug === "string" ? sanitizeInput(tourSlug) : undefined,
      tourTitle: typeof tourTitle === "string" ? sanitizeInput(tourTitle).slice(0, 160) : undefined,
      approved: false,
      date: new Date().toISOString()
    };

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO; // e.g., "owner/repo"

    if (!GITHUB_TOKEN || !GITHUB_REPO) {
      console.warn("GitHub integration missing. Falling back to success response for development.");
      return NextResponse.json({ success: true, message: "Review received (dev mode)" });
    }

    const issueTitle = `New Review from ${sanitizedName}`;
    const issueBody = `### New Review Submission\n\nPlease review the following submission and add it to \`data/reviews.json\` if approved.\n\n\`\`\`json\n${JSON.stringify(payload, null, 2)}\n\`\`\``;

    const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/issues`, {
      method: "POST",
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: issueTitle,
        body: issueBody,
        labels: ["review", "pending-approval"]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GitHub API Error:", errorText);
      return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Review submitted successfully" });
  } catch (error) {
    console.error("Review submission error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
