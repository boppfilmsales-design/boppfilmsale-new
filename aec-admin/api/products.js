const { initDatabase, query } = require('../lib/db');

module.exports = async function handler(req, res) {
  await initDatabase();

  const { method } = req;
  const { id } = req.query;

  try {
    switch (method) {
      case 'GET':
        if (id) {
          const result = await query('SELECT * FROM products WHERE id = $1', [id]);
          if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
          }
          return res.json({ product: result.rows[0] });
        } else {
          const result = await query('SELECT * FROM products ORDER BY sort_order ASC, created_at DESC');
          return res.json({ products: result.rows });
        }

      case 'POST':
        const { title, category, description, thickness, haze, gloss, heat_seal, image_url, specs, sort_order } = req.body;
        if (!title) {
          return res.status(400).json({ error: 'Title is required' });
        }
        const newProduct = await query(
          `INSERT INTO products (title, category, description, thickness, haze, gloss, heat_seal, image_url, specs, sort_order)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
          [title, category||null, description||null, thickness||null, haze||null, gloss||null, heat_seal||null, image_url||null, specs||null, sort_order||0]
        );
        return res.status(201).json({ product: newProduct.rows[0] });

      case 'PUT':
        if (!id) return res.status(400).json({ error: 'ID required' });
        const fields = ['title','category','description','thickness','haze','gloss','heat_seal','image_url','specs','sort_order','is_active'];
        const updates = [];
        const values = [];
        let idx = 1;
        for (const f of fields) {
          if (req.body[f] !== undefined) {
            updates.push(`${f} = $${idx}`);
            values.push(req.body[f]);
            idx++;
          }
        }
        if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });
        updates.push('updated_at = CURRENT_TIMESTAMP');
        values.push(id);
        const updated = await query(
          `UPDATE products SET ${updates.join(', ')} WHERE id = $${idx} RETURNING *`,
          values
        );
        if (updated.rows.length === 0) return res.status(404).json({ error: 'Not found' });
        return res.json({ product: updated.rows[0] });

      case 'DELETE':
        if (!id) return res.status(400).json({ error: 'ID required' });
        await query('DELETE FROM products WHERE id = $1', [id]);
        return res.json({ success: true });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: error.message });
  }
};
