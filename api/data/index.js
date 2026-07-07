// ============================================================
// Data API — Full CRUD for admin products/categories/config
// Stores the entire admin data set as a single JSONB row in NeonDB
// ============================================================
const { neon } = require('@neondatabase/serverless');

// ── Helpers ───────────────────────────────────────────────────
function jsonResponse(res, data, status = 200) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return res.status(status).json(data);
}

function getDb() {
  const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) throw new Error('DATABASE_URL environment variable is required');
  return neon(connectionString);
}

async function ensureTable(sql) {
  await sql`
    CREATE TABLE IF NOT EXISTS admin_data (
      id INTEGER PRIMARY KEY DEFAULT 1,
      data JSONB NOT NULL DEFAULT '{}',
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT single_row CHECK (id = 1)
    );
  `;
  // Ensure a row exists
  const rows = await sql`SELECT id FROM admin_data WHERE id = 1`;
  if (rows.length === 0) {
    await sql`INSERT INTO admin_data (id, data) VALUES (1, '{}'::jsonb)`;
  }
}

// ── Handler ───────────────────────────────────────────────────
module.exports = async function handler(req, res) {
  try {
    const sql = getDb();
    await ensureTable(sql);

    // CORS preflight
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
      return res.status(200).end();
    }

    if (req.method === 'GET') {
      // ── Load data ──────────────────────────────────────────
      const rows = await sql`SELECT data FROM admin_data WHERE id = 1`;
      const data = rows.length > 0 ? rows[0].data : {};
      return jsonResponse(res, { success: true, data });
    }

    if (req.method === 'POST') {
      // ── Save data ──────────────────────────────────────────
      const { data } = req.body;
      if (!data) {
        return jsonResponse(res, { success: false, error: 'Missing "data" in request body' }, 400);
      }

      await sql`
        UPDATE admin_data
        SET data = ${data}::jsonb, updated_at = CURRENT_TIMESTAMP
        WHERE id = 1
      `;

      return jsonResponse(res, { success: true, message: 'Data saved' });
    }

    return jsonResponse(res, { success: false, error: 'Method not allowed' }, 405);
  } catch (error) {
    console.error('Data API error:', error);
    return jsonResponse(res, { success: false, error: error.message }, 500);
  }
};
