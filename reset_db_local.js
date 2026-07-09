const { neon } = require('@neondatabase/serverless');
const fs = require('fs');
const path = require('path');

(async function() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    console.log('No DATABASE_URL in env, checking .env.local...');
    // Try to read from .env.local
    try {
      const env = fs.readFileSync('.env.local', 'utf-8');
      const m = env.match(/DATABASE_URL=([^\s]+)/);
      if (m) {
        console.log('Found DATABASE_URL in .env.local');
        const sql = neon(m[1]);
        await resetDb(sql);
      } else {
        console.log('DATABASE_URL not found in .env.local either');
      }
    } catch(e) {
      console.log('Error reading .env.local:', e.message);
    }
    return;
  }
  const sql = neon(connectionString);
  await resetDb(sql);
})();

async function resetDb(sql) {
  console.log('Connecting to NeonDB...');
  try {
    // Read static data
    const base = process.cwd();
    const staticPath = path.join(base, 'data', 'products-data.js');
    const content = fs.readFileSync(staticPath, 'utf-8');
    const match = content.match(/var productsData\s*=\s*(\{[\s\S]*\});/);
    if (!match) { console.log('Failed to parse static file'); return; }
    const data = JSON.parse(match[1]);

    // Ensure table exists and reset
    await sql`CREATE TABLE IF NOT EXISTS admin_data (
      id INTEGER PRIMARY KEY DEFAULT 1,
      data JSONB NOT NULL DEFAULT '{}',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT single_row CHECK (id = 1)
    )`;
    await sql`DELETE FROM admin_data WHERE id = 1`;
    await sql`INSERT INTO admin_data (id, data) VALUES (1, ${JSON.stringify(data)}::jsonb)`;

    console.log('DB reset successful!');
    console.log('Products:', data.products.length);
    console.log('Categories:', data.categories.length);

    // Verify tape products
    const tape = data.products.filter(p => p.detailLink === 'tape-crystal-jumbo.html' || p.detailLink === 'tape-sealing.html');
    tape.forEach(p => console.log('  ID:'+p.id+' nameEn:'+p.nameEn+' detailLink:'+p.detailLink));
  } catch(e) {
    console.log('DB Error:', e.message);
    console.log('Full error:', e);
  }
}