require('dotenv').config({path: '.env.local'});
const { Pool } = require('@neondatabase/serverless');

async function main() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    try {
        console.log("Adding columns to Package table...");
        await pool.query(`
            ALTER TABLE "Package" 
            ADD COLUMN IF NOT EXISTS "minGuests" INTEGER DEFAULT 2,
            ADD COLUMN IF NOT EXISTS "maxGuests" INTEGER DEFAULT 6,
            ADD COLUMN IF NOT EXISTS "difficulty" TEXT DEFAULT 'Moderate',
            ADD COLUMN IF NOT EXISTS "destinations" TEXT[];
        `);
        console.log("Columns added successfully!");
    } catch (e) {
        console.error("Migration failed:", e);
    } finally {
        await pool.end();
    }
}
main();
