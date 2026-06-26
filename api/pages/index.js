// Pages API
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
          const result = await db.sql`SELECT * FROM pages WHERE id = ${id}`;
          if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Page not found' });
          }
          return res.status(200).json({ page: result.rows[0] });
        } else {
          const result = await db.sql`SELECT * FROM pages ORDER BY updated_at DESC`;
          return res.status(200).json({ pages: result.rows });
        }

      case 'POST':
        const { title_en, title_zh, slug, content_en, content_zh, meta_title, meta_description } = req.body;

        if (!title_en || !slug) {
          return res.status(400).json({ error: 'Title and slug are required' });
        }

        const newPage = await db.sql`
          INSERT INTO pages (title_en, title_zh, slug, content_en, content_zh, meta_title, meta_description)
          VALUES (${title_en}, ${title_zh || ''}, ${slug}, ${content_en || ''}, ${content_zh || ''}, ${meta_title || ''}, ${meta_description || ''})
          RETURNING *
        `;

        return res.status(201).json({ page: newPage.rows[0] });

      case 'PUT':
        if (!id) {
          return res.status(400).json({ error: 'Page ID is required' });
        }

        const updateFields = [];
        const updateValues = [];
        let updateIndex = 1;

        const fields = ['title_en', 'title_zh', 'slug', 'content_en', 'content_zh', 'meta_title', 'meta_description', 'is_published'];

        for (const field of fields) {
          if (req.body[field] !== undefined) {
            updateFields.push(`${field} = $${updateIndex}`);
            updateValues.push(req.body[field]);
            updateIndex++;
          }
        }

        if (updateFields.length === 0) {
          return res.status(400).json({ error: 'No fields to update' });
        }

        updateFields.push(`updated_at = CURRENT_TIMESTAMP`);

        const updateQuery = `
          UPDATE pages
          SET ${updateFields.join(', ')}
          WHERE id = $${updateIndex}
          RETURNING *
        `;
        updateValues.push(id);

        const updated = await db.query(updateQuery, updateValues);

        if (updated.rows.length === 0) {
          return res.status(404).json({ error: 'Page not found' });
        }

        return res.status(200).json({ page: updated.rows[0] });

      case 'DELETE':
        if (!id) {
          return res.status(400).json({ error: 'Page ID is required' });
        }

        const deleted = await db.sql`DELETE FROM pages WHERE id = ${id} RETURNING id`;

        if (deleted.rows.length === 0) {
          return res.status(404).json({ error: 'Page not found' });
        }

        return res.status(200).json({ success: true, message: 'Page deleted' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Pages API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
