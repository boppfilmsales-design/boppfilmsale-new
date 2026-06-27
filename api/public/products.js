// Public API - No authentication required
// Returns products from Neon database

const { neon } = require('@neondatabase/serverless');

module.exports = async function handler(req, res) {
  try {
    const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);

    if (req.method === 'GET') {
      // Get all active products
      const result = await sql`
        SELECT p.*, c.name_en as category_name, c.name_zh as category_name_zh
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.is_active = true
        ORDER BY p.sort_order ASC, p.created_at DESC
      `;

      return res.status(200).json({
        success: true,
        products: result
      });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
