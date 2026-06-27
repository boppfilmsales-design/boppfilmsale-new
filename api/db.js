// Database API Proxy - Handles Neon SQL queries from browser
const { neon } = require('@neondatabase/serverless');

const connectionString = 'postgresql://neondb_owner:npg_Lw43MoPXJuGD@ep-young-rice-af65ccr8-pooler.c-2.us-west-2.aws.neon.tech/neondb?sslmode=require';

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query, params } = req.body;
    const sql = neon(connectionString);
    const result = await sql.unsafe(query, params || []);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error('DB Error:', error);
    return res.status(500).json({ error: error.message });
  }
};
