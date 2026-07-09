// ============================================================
// Debug endpoint — shows env vars and simple DB test
// ============================================================
const { Pool } = require('pg');

module.exports = async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const info = {};
  
  // Check env vars
  info.DATABASE_URL_exists = !!process.env.DATABASE_URL;
  info.POSTGRES_URL_exists = !!process.env.POSTGRES_URL;
  info.DATABASE_URL_len = process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0;
  
  // Try connecting
  const cs = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!cs) {
    return res.status(200).json({ ...info, error: 'No connection string found' });
  }
  
  // Mask password for output
  const masked = cs.replace(/:[^:]*@/, ':****@');
  info.connection_string_masked = masked;
  
  try {
    const pool = new Pool({ connectionString: cs, ssl: { rejectUnauthorized: false }, connectionTimeoutMillis: 8000 });
    const r = await pool.query('SELECT version() as v, current_database() as db, current_schema() as schema');
    info.db_version = r.rows[0].v;
    info.db_name = r.rows[0].db;
    info.db_schema = r.rows[0].schema;
    await pool.end();
    info.status = 'connected';
  } catch (e) {
    info.status = 'error';
    info.error_message = e.message;
    info.error_code = e.code;
  }
  
  return res.status(200).json(info);
};