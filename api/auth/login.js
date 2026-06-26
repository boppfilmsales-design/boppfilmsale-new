// Admin Login API
const { verifyAdmin, createDefaultAdmin } = require('../../lib/auth');
const { initDatabase } = require('../../lib/db');

module.exports = async function handler(req, res) {
  // Initialize database on first request
  await initDatabase();
  await createDefaultAdmin();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  const user = await verifyAdmin(username, password);

  if (user) {
    // Generate a simple token (in production, use proper session management)
    const token = Buffer.from(`${user.id}:${Date.now()}`).toString('base64');

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
};
