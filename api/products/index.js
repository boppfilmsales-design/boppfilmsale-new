// Products API - CRUD operations
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
          // Get single product
          const result = await db.sql`
            SELECT p.*, c.name_en as category_name_en, c.name_zh as category_name_zh
            FROM products p
            LEFT JOIN product_categories c ON p.category_id = c.id
            WHERE p.id = ${id}
          `;
          if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
          }
          return res.status(200).json({ product: result.rows[0] });
        } else {
          // Get all products with optional filters
          const { category, search, limit = 100, offset = 0 } = req.query;

          let query = `
            SELECT p.*, c.name_en as category_name_en, c.name_zh as category_name_zh
            FROM products p
            LEFT JOIN product_categories c ON p.category_id = c.id
            WHERE 1=1
          `;
          const params = [];
          let paramIndex = 1;

          if (category) {
            query += ` AND p.category_id = $${paramIndex}`;
            params.push(category);
            paramIndex++;
          }

          if (search) {
            query += ` AND (p.name_en ILIKE $${paramIndex} OR p.name_zh ILIKE $${paramIndex})`;
            params.push(`%${search}%`);
            paramIndex++;
          }

          query += ` ORDER BY p.sort_order ASC, p.created_at DESC`;
          query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
          params.push(parseInt(limit), parseInt(offset));

          const result = await db.query(query, params);

          // Get total count
          const countResult = await db.sql`SELECT COUNT(*) FROM products`;

          return res.status(200).json({
            products: result.rows,
            total: parseInt(countResult.rows[0].count)
          });
        }

      case 'POST':
        // Create new product
        const {
          category_id, name_en, name_zh, slug, tag,
          description_en, description_zh, specs, price,
          icon, image_url, sort_order
        } = req.body;

        if (!name_en || !slug) {
          return res.status(400).json({ error: 'Name and slug are required' });
        }

        const newProduct = await db.sql`
          INSERT INTO products (
            category_id, name_en, name_zh, slug, tag,
            description_en, description_zh, specs, price,
            icon, image_url, sort_order
          ) VALUES (
            ${category_id || null}, ${name_en}, ${name_zh || null}, ${slug}, ${tag || null},
            ${description_en || null}, ${description_zh || null}, ${specs || null}, ${price || null},
            ${icon || null}, ${image_url || null}, ${sort_order || 0}
          ) RETURNING *
        `;

        return res.status(201).json({ product: newProduct.rows[0] });

      case 'PUT':
        // Update product
        if (!id) {
          return res.status(400).json({ error: 'Product ID is required' });
        }

        const updateFields = [];
        const updateValues = [];
        let updateIndex = 1;

        const fields = [
          'category_id', 'name_en', 'name_zh', 'slug', 'tag',
          'description_en', 'description_zh', 'specs', 'price',
          'icon', 'image_url', 'sort_order', 'is_active'
        ];

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
          UPDATE products
          SET ${updateFields.join(', ')}
          WHERE id = $${updateIndex}
          RETURNING *
        `;
        updateValues.push(id);

        const updated = await db.query(updateQuery, updateValues);

        if (updated.rows.length === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ product: updated.rows[0] });

      case 'DELETE':
        // Delete product
        if (!id) {
          return res.status(400).json({ error: 'Product ID is required' });
        }

        const deleted = await db.sql`DELETE FROM products WHERE id = ${id} RETURNING id`;

        if (deleted.rows.length === 0) {
          return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json({ success: true, message: 'Product deleted' });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Products API error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
