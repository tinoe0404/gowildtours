require('dotenv').config({path: '.env.local'});
const { Pool } = require('@neondatabase/serverless');

async function main() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const result = await pool.query(`
        SELECT slug, "minGuests", "maxGuests", difficulty, destinations, exclusions, 
               jsonb_array_length(itinerary::jsonb) as itinerary_count
        FROM "Package"
        ORDER BY slug;
    `);
    console.table(result.rows);
    await pool.end();
}
main();
