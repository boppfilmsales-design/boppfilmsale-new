// ============================================================
// Product API — Update a single product in NeonDB
// POST /api/data/product  { product: { id, nameEn, ... } }
// ============================================================
const { neon } = require('@neondatabase/serverless');

function jsonResponse(res, data, status = 200) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  return res.status(status).json(data);
}

module.exports = async function handler(req, res) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return jsonResponse(res, { success: false, error: 'Method not allowed' }, 405);
  }

  try {
    const sql = neon(process.env.DATABASE_URL || process.env.POSTGRES_URL);

    const { product } = req.body;
    if (!product || !product.id) {
      return jsonResponse(res, { success: false, error: 'Missing product with id' }, 400);
    }

    // Read current data from DB
    const rows = await sql`SELECT data FROM admin_data WHERE id = 1`;
    if (rows.length === 0) {
      return jsonResponse(res, { success: false, error: 'No data found in DB' }, 404);
    }

    let data = rows[0].data;

    // Ensure products is an array
    if (!Array.isArray(data.products)) {
      data.products = [];
    }

    // Update or add the product in the array
    const idx = data.products.findIndex(p => p && p.id === product.id);
    if (idx >= 0) {
      data.products[idx] = product;
    } else {
      data.products.push(product);
    }

    // Save back to DB
    await sql`UPDATE admin_data SET data = ${JSON.stringify(data)}::jsonb, updated_at = CURRENT_TIMESTAMP WHERE id = 1`;

    return jsonResponse(res, { success: true, message: 'Product saved' });
  } catch (error) {
    console.error('Product API error:', error);
    return jsonResponse(res, { success: false, error: error.message }, 500);
  }
};
