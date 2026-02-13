import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    try {
        await prisma.$connect();
        console.log("Database connection successful!");
        const count = await prisma.adminUser.count();
        console.log("AdminUser count:", count);
    } catch (error) {
        console.error("Database connection failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
