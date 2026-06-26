// Categories API - CRUD operations
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
          const result = await db.sql`
            SELECT * FROM product_categories WHERE id = ${id}
          `;
          if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
          }
          return res.status(200).json({ category: result.rows[0] });
        } else {
          const result = await db.sql`
            SELECT * FROM product_categories
            ORDER BY sort_order ASC, created_at DESC
          `;
          return res.status(200).json({ categories: result.rows });
        }

      case 'POST':
        const { name_en, name_zh, slug, icon, description_en, description_zh, sort_order } = req.body;

        if (!name_en || !slug) {
          return res.status(400).json({ error: 'Name and slug are required' });
        }

        const newCategory = await db.sql`
          INSERT INTO product_categories (name_en, name_zh, slug, icon, description_en, description_zh, sort_order)
          VALUES (${name_en}, ${name_zh || null}, ${slug}, ${icon || null}, ${description_en || null}, ${description_zh || null}, ${sort_order || 0})
          RETURNING *
        `;

        return res.status(201).json({ category: newCategory.rows[0] });

      case 'PUT':
        if (!id) {
          return res.status(400).json({ error: 'Category ID is required' });
        }

        const updateFields = [];
        const updateValues = [];
        let updateIndex = 1;

        const fields = ['name_en', 'name_zh', 'slug', 'icon', 'description_en', 'description_zh', 'sort_order', 'is_active'];

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

        const updateQuery = `
          UPDATE product_categories
          SET ${updateFields.join(', ')}
          WHERE id = $${updateIndex}
          RETURNING *
        `;
        updateValues.push(id);

        const updated = await db.query(updateQuery, updateValues);

        if (updated.rows.length === 0) {
          return res.status(404).json({ error: 'Category not found' });
        }

        return res.status(200).json({ category: updated.rows[0] });

      case 'DELETE':
        if (!id) {
          return res.status(400).json({ error: 'Category ID is required' });
        }

        const deleted = await db.sql`DELETE FROM product_categories WHERE id = ${id} RETURNING id`;

        if (deleted.rows.length === 0) {
          return res.status(404).json({ error: 'Category not found' });
        }

        return res.status(200).json({ success: true, message: 'Category deleted' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Categories API error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
