// Contact Messages API
const { getDbClient, initDatabase } = require('../../lib/db');

module.exports = async function handler(req, res) {
  await initDatabase();
  const db = getDbClient();

  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case 'GET':
        if (id) {
          const result = await db.sql`SELECT * FROM contact_messages WHERE id = ${id}`;
          if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Message not found' });
          }
          return res.status(200).json({ message: result.rows[0] });
        } else {
          const result = await db.sql`SELECT * FROM contact_messages ORDER BY created_at DESC`;
          return res.status(200).json({ messages: result.rows });
        }

      case 'POST':
        const { name, email, phone, company, message } = req.body;

        if (!name || !email || !message) {
          return res.status(400).json({ error: 'Name, email and message are required' });
        }

        const newMessage = await db.sql`
          INSERT INTO contact_messages (name, email, phone, company, message)
          VALUES (${name}, ${email}, ${phone || ''}, ${company || ''}, ${message})
          RETURNING *
        `;

        return res.status(201).json({ message: newMessage.rows[0] });

      case 'PUT':
        if (!id) {
          return res.status(400).json({ error: 'Message ID is required' });
        }

        const result = await db.sql`
          UPDATE contact_messages
          SET is_read = true, updated_at = CURRENT_TIMESTAMP
          WHERE id = ${id}
          RETURNING *
        `;

        if (result.rows.length === 0) {
          return res.status(404).json({ error: 'Message not found' });
        }

        return res.status(200).json({ message: result.rows[0] });

      case 'DELETE':
        if (!id) {
          return res.status(400).json({ error: 'Message ID is required' });
        }

        const deleted = await db.sql`DELETE FROM contact_messages WHERE id = ${id} RETURNING id`;

        if (deleted.rows.length === 0) {
          return res.status(404).json({ error: 'Message not found' });
        }

        return res.status(200).json({ success: true, message: 'Message deleted' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Messages API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
