// Import products from HTML files to Neon database
const fs = require('fs');
const path = require('path');
const { neon } = require('@neondatabase/serverless');

const DB_CONFIG = {
  host: 'ep-young-rice-af65ccr8-pooler.c-2.us-west-2.aws.neon.tech',
  user: 'neondb_owner',
  password: 'npg_Lw43MoPXJuGD',
  database: 'neondb'
};

const connectionString = `postgresql://${DB_CONFIG.user}:${DB_CONFIG.password}@${DB_CONFIG.host}/${DB_CONFIG.database}?sslmode=require`;
const sql = neon(connectionString);

async function importProducts() {
  console.log('Starting product import...');

  // Read products.html
  const productsHtml = fs.readFileSync(path.join(__dirname, '..', 'products.html'), 'utf8');

  // Extract all product cards - match <a href="..." class="tech-card" ...> ... </a>
  const productRegex = /<a href="([^"]+)\.html"\s+class="tech-card"[^>]*>([\s\S]*?)<\/a>/g;

  let match;
  let imported = 0;
  let skipped = 0;

  while ((match = productRegex.exec(productsHtml)) !== null) {
    const [_, file, content] = match;

    // Skip non-product pages
    if (['index', 'about', 'contact', 'products', 'specs', 'applications', 'equipment', 'why-us'].some(p => file.includes(p))) {
      skipped++;
      continue;
    }

    // Extract name
    const nameMatch = content.match(/<div class="tech-card-name">([^<]+)<\/div>/);
    const name = nameMatch ? nameMatch[1].trim() : file.replace(/-/g, ' ').replace('.html', '');

    // Extract category
    const tagMatch = content.match(/<span class="tech-card-tag">([^<]+)<\/span>/);
    const category = tagMatch ? tagMatch[1].trim() : 'Other';

    // Extract description
    const descMatch = content.match(/<div class="tech-card-desc">([^<]+)<\/div>/);
    const description = descMatch ? descMatch[1].trim() : '';

    // Extract specs
    const specs = [];
    const specRegex = /<span class="tech-spec-pill">([^<]+)<\/span>/g;
    let specMatch;
    while ((specMatch = specRegex.exec(content)) !== null) {
      specs.push(specMatch[1].trim());
    }

    // Extract price
    const priceMatch = content.match(/<span class="tech-card-price">([^<]+)<\/span>/);
    const price = priceMatch ? priceMatch[1].trim() : 'Contact';

    try {
      await sql`
        INSERT INTO products (title, category, description, thickness, sort_order)
        VALUES (${name}, ${category}, ${description}, ${specs.join(', ') || null}, ${imported})
        ON CONFLICT DO NOTHING
      `;
      imported++;
      if (imported <= 10 || imported % 20 === 0) {
        console.log(`Imported ${imported}: ${name} (${category})`);
      }
    } catch (err) {
      skipped++;
    }
  }

  console.log(`\nImport complete: ${imported} products imported, ${skipped} skipped`);
}

importProducts().catch(console.error);
