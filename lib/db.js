// Neon Postgres Database Connection
// This file handles the database connection using Neon Postgres

let neonClient = null;

function getDbClient() {
  if (!neonClient) {
    const { neon } = require('@neondatabase/serverless');
    const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL or POSTGRES_URL environment variable is required');
    }
    neonClient = neon(connectionString);
  }
  return neonClient;
}

// Helper to run a query with optional parameters
async function query(text, params) {
  const db = getDbClient();
  if (params && params.length > 0) {
    return await db.query(text, params);
  }
  return await db.unsafe(text);
}

// Initialize database tables
async function initDatabase() {
  try {
    // Users table for admin authentication
    await query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Product categories table
    await query(`
      CREATE TABLE IF NOT EXISTS product_categories (
        id SERIAL PRIMARY KEY,
        name_en VARCHAR(255) NOT NULL,
        name_zh VARCHAR(255),
        slug VARCHAR(255) UNIQUE NOT NULL,
        icon VARCHAR(50),
        description_en TEXT,
        description_zh TEXT,
        product_count INTEGER DEFAULT 0,
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Products table
    await query(`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        category_id INTEGER REFERENCES product_categories(id),
        name_en VARCHAR(255) NOT NULL,
        name_zh VARCHAR(255),
        slug VARCHAR(255) UNIQUE NOT NULL,
        tag VARCHAR(100),
        description_en TEXT,
        description_zh TEXT,
        specs TEXT[],
        price VARCHAR(100),
        icon VARCHAR(50),
        image_url VARCHAR(500),
        is_active BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Pages content table
    await query(`
      CREATE TABLE IF NOT EXISTS pages (
        id SERIAL PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title_en VARCHAR(255),
        title_zh VARCHAR(255),
        content_en TEXT,
        content_zh TEXT,
        meta_title VARCHAR(255),
        meta_description VARCHAR(500),
        is_published BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Site settings table
    await query(`
      CREATE TABLE IF NOT EXISTS site_settings (
        id SERIAL PRIMARY KEY,
        key VARCHAR(255) UNIQUE NOT NULL,
        value TEXT,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Contact messages table
    await query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255),
        email VARCHAR(255),
        phone VARCHAR(100),
        company VARCHAR(255),
        message TEXT,
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Media files table
    await query(`
      CREATE TABLE IF NOT EXISTS media (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) NOT NULL,
        original_name VARCHAR(255),
        file_path VARCHAR(500) NOT NULL,
        file_size INTEGER,
        mime_type VARCHAR(100),
        alt_text VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Database initialized successfully');
    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

module.exports = { getDbClient, initDatabase, query };
