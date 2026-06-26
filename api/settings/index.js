// Site Settings API
const { getDbClient, initDatabase } = require('../../lib/db');

module.exports = async function handler(req, res) {
  await initDatabase();
  const db = getDbClient();

  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const result = await db.sql`SELECT * FROM site_settings ORDER BY key`;
        const settings = {};
        result.rows.forEach(row => {
          settings[row.key] = row.value;
        });
        return res.status(200).json({ settings });

      case 'POST':
        const { key, value } = req.body;
        if (!key) {
          return res.status(400).json({ error: 'Key is required' });
        }

        const updated = await db.sql`
          INSERT INTO site_settings (key, value)
          VALUES (${key}, ${value || ''})
          ON CONFLICT (key) DO UPDATE SET value = ${value || ''}, updated_at = CURRENT_TIMESTAMP
          RETURNING *
        `;

        return res.status(200).json({ setting: updated.rows[0] });

      case 'DELETE':
        const { key } = req.query;
        if (!key) {
          return res.status(400).json({ error: 'Key is required' });
        }

        await db.sql`DELETE FROM site_settings WHERE key = ${key}`;
        return res.status(200).json({ success: true });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Settings API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
