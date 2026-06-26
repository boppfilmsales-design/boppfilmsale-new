// Authentication utilities for admin panel
const crypto = require('crypto');

// Hash password using SHA-256
function hashPassword(password) {
  return crypto.createHash('sha256').update(password + 'aec-group-salt-2026').digest('hex');
}

// Verify password
function verifyPassword(password, hash) {
  return hashPassword(password) === hash;
}

// Simple session token generation
function generateToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Verify admin credentials
async function verifyAdmin(username, password) {
  const { getDbClient } = require('./db');
  const db = getDbClient();

  try {
    const result = await db.sql`
      SELECT id, username, password_hash, email, role
      FROM users
      WHERE username = ${username}
    `;

    if (result.rows.length === 0) {
      return null;
    }

    const user = result.rows[0];

    if (verifyPassword(password, user.password_hash)) {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };
    }

    return null;
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

// Create default admin user
async function createDefaultAdmin() {
  const { getDbClient } = require('./db');
  const db = getDbClient();

  try {
    // Check if admin exists
    const existing = await db.sql`SELECT id FROM users WHERE username = 'admin'`;

    if (existing.rows.length === 0) {
      const passwordHash = hashPassword('admin123');
      await db.sql`
        INSERT INTO users (username, password_hash, email, role)
        VALUES ('admin', ${passwordHash}, 'admin@aecgroup.com', 'admin')
      `;
      console.log('Default admin user created: admin / admin123');
    }
  } catch (error) {
    console.error('Create admin error:', error);
  }
}

// Middleware to check authentication
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  // In production, verify token against session store
  // For now, we'll use a simple approach
  if (token === 'valid-admin-token') {
    req.user = { id: 1, username: 'admin', role: 'admin' };
    next();
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
}

module.exports = {
  hashPassword,
  verifyPassword,
  generateToken,
  verifyAdmin,
  createDefaultAdmin,
  requireAuth
};
