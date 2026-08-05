import { PrismaClient } from '../lib/generated/prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';
import 'dotenv/config'; 
import { config } from 'dotenv';
config({ path: '.env.local' });

const connectionString = process.env.DATABASE_URL!;
console.log("DB URL:", connectionString ? "Exists" : "Missing");
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const username = 'admin';
  const password = 'Password123!';
  const hashedPassword = await bcrypt.hash(password, 10);

  const existing = await prisma.admin.findUnique({ where: { username } });
  
  if (existing) {
    console.log('Admin user already exists.');
    return;
  }

  await prisma.admin.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  console.log(`Admin user created! Username: ${username}, Password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
