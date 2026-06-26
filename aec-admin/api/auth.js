const crypto = require('crypto');
const { initDatabase, query } = require('../lib/db');

module.exports = async function handler(req, res) {
  await initDatabase();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  try {
    const result = await query('SELECT * FROM users WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const hash = crypto.createHash('sha256').update(password + 'aec-salt').digest('hex');

    if (hash === user.password_hash) {
      const token = crypto.randomBytes(24).toString('hex');
      return res.json({ success: true, token });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};
