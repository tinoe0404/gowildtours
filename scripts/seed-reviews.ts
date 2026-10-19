import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../lib/generated/prisma/client';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

interface StaticReview {
  name: string;
  rating: number;
  message: string;
  country: string;
  approved: boolean;
  date: string;
}

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL not set. Make sure .env.local is loaded.');
    process.exit(1);
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter } as any);

  // Read static reviews
  const reviewsPath = resolve(projectRoot, 'data/reviews.json');
  const reviewsRaw = readFileSync(reviewsPath, 'utf-8');
  const reviews: StaticReview[] = JSON.parse(reviewsRaw);

  console.log(`Found ${reviews.length} static reviews to seed...`);

  const existingCount = await prisma.review.count();
  console.log(`Database currently has ${existingCount} reviews.\n`);

  let seeded = 0;
  let skipped = 0;

  for (const review of reviews) {
    // Check for duplicates by name + content
    const existing = await prisma.review.findFirst({
      where: {
        customerName: review.name,
        content: review.message,
      },
    });

    if (existing) {
      console.log(`  ⏭  Skipping (already exists): ${review.name}`);
      skipped++;
      continue;
    }

    await prisma.review.create({
      data: {
        tourId: review.country || 'general',
        customerName: review.name,
        rating: review.rating,
        content: review.message,
        isApproved: review.approved ?? true,
        createdAt: review.date ? new Date(review.date) : new Date(),
      },
    });
    seeded++;
    console.log(`  ✓  Seeded: ${review.name}`);
  }

  const totalCount = await prisma.review.count();
  console.log(`\n✅ Done! Seeded ${seeded} new reviews, skipped ${skipped} duplicates.`);
  console.log(`   Total reviews in database: ${totalCount}`);

  await prisma.$disconnect();
  await pool.end();
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
