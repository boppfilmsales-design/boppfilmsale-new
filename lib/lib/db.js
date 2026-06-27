// Neon Postgres Database Connection
let neonClient = null;

function getDbClient() {
  if (!neonClient) {
    const { neon } = require('@neondatabase/serverless');
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is required');
    }
    neonClient = neon(connectionString);
  }
  return neonClient;
}

async function query(text, params) {
  const db = getDbClient();
  if (params && params.length > 0) {
    return await db.query(text, params);
  }
  return await db.unsafe(text);
}

async function initDatabase() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100),
        description TEXT,
        thickness VARCHAR(100),
        haze VARCHAR(100),
        gloss VARCHAR(100),
        heat_seal VARCHAR(100),
        image_url VARCHAR(500),
        specs JSONB DEFAULT '{}',
        is_active BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create default admin (password: admin123)
    const existing = await query('SELECT id FROM users WHERE username = $1', ['admin']);
    if (existing.rows.length === 0) {
      const crypto = require('crypto');
      const hash = crypto.createHash('sha256').update('admin123' + 'aec-salt').digest('hex');
      await query('INSERT INTO users (username, password_hash) VALUES ($1, $2)', ['admin', hash]);
    }

    return { success: true };
  } catch (error) {
    console.error('DB init error:', error);
    throw error;
  }
}

module.exports = { getDbClient, initDatabase, query };
