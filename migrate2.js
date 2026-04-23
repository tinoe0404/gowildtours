require('dotenv').config({path: '.env.local'});
const { Pool } = require('@neondatabase/serverless');

async function main() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    try {
        // Check if exclusions column exists, add if missing
        const result = await pool.query(`
            SELECT column_name FROM information_schema.columns 
            WHERE table_name = 'Package' AND column_name = 'exclusions';
        `);
        if (result.rows.length === 0) {
            console.log("Adding exclusions column...");
            await pool.query(`ALTER TABLE "Package" ADD COLUMN IF NOT EXISTS "exclusions" TEXT[] DEFAULT '{}'`);
            console.log("exclusions column added.");
        } else {
            console.log("exclusions column already exists.");
        }

        // Verify all new columns exist
        const cols = await pool.query(`
            SELECT column_name FROM information_schema.columns 
            WHERE table_name = 'Package' 
            ORDER BY column_name;
        `);
        console.log("Package columns:", cols.rows.map(r => r.column_name));
    } catch (e) {
        console.error("Migration failed:", e);
    } finally {
        await pool.end();
    }
}
main();
