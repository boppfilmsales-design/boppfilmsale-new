const fs = require('fs');
let content = fs.readFileSync('products.html', 'utf8');

// Find the BOPET Film section and add sub-categories after it
const bopetSectionEnd = content.indexOf('<!-- BOPP Thermal Lamination Film -->');
if (bopetSectionEnd === -1) {
  console.log('Could not find BOPP Thermal Lamination Film section');
  process.exit(1);
}

// Insert sub-category sections before the BOPP Thermal Lamination Film section
const subCategories = `

      <!-- BOPET 4.5Mic TTR Thermal Transfer Film -->
      <div class="tech-section" id="bopet-45mic">
        <div class="tech-section-header">
          <span class="tech-section-icon">🔄</span>
          <div><span class="tech-section-title">BOPET 4.5Mic TTR Thermal Transfer Film</span><span class="tech-section-zh">· BOPET 4.5微米热转印膜</span></div>
          <span class="tech-section-count">7 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='bopet-3.8mic.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🔄</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPET TTR</span>
              <div class="tech-card-name">BOPET polyester film 4.5microns | BOPET聚酯薄膜4.5微米 | Aec Group</div>
              <div class="tech-card-desc">High-quality BOPET polyester film for thermal transfer applications.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">4.5μm</span><span class="tech-spec-pill">High clarity</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.5/m²</span><a href="bopet-3.8mic.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div><div class="tech-card" onclick="window.location.href='bopet-4.0mic.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🔄</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPET TTR</span>
              <div class="tech-card-name">BOPET polyester film 4.0microns | BOPET聚酯薄膜4.0微米 | Aec Group</div>
              <div class="tech-card-desc">High-quality BOPET polyester film for thermal transfer applications.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">4.0μm</span><span class="tech-spec-pill">High clarity</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.4/m²</span><a href="bopet-4.0mic.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- BOPET Metallized Film Silver -->
      <div class="tech-section" id="bopet-metallized-45">
        <div class="tech-section-header">
          <span class="tech-section-icon">✨</span>
          <div><span class="tech-section-title">BOPET Metallized Film Silver</span><span class="tech-section-zh">· BOPET镀银膜</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='bopet-metallized.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">✨</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPET Metallized</span>
              <div class="tech-card-name">4.5Mic BOPET Metallized Film | 4.5微米BOPET镀铝膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality BOPET metallized film with excellent barrier properties.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">4.5μm</span><span class="tech-spec-pill">High barrier</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.8/m²</span><a href="bopet-metallized.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div><div class="tech-card" onclick="window.location.href='bopet-metallized-6.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">✨</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPET Metallized</span>
              <div class="tech-card-name">6 Mic BOPET Metallized Film | 6微米BOPET镀铝膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality BOPET metallized film for packaging applications.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">6μm</span><span class="tech-spec-pill">High barrier</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $2.0/m²</span><a href="bopet-metallized-6.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- BOPET PLAIN FILM -->
      <div class="tech-section" id="bopet-clear">
        <div class="tech-section-header">
          <span class="tech-section-icon">🧊</span>
          <div><span class="tech-section-title">BOPET PLAIN FILM</span><span class="tech-section-zh">· BOPET普通膜</span></div>
          <span class="tech-section-count">6 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='bopet-clear.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🧊</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPET Clear</span>
              <div class="tech-card-name">BOPET Film Clear transparent | BOPET透明薄膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality clear BOPET film with excellent transparency.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">4.5-350μm</span><span class="tech-spec-pill">Clear</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.3/m²</span><a href="bopet-clear.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div><div class="tech-card" onclick="window.location.href='bopet-insulating.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🧊</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPET Insulating</span>
              <div class="tech-card-name">BOPET Insulating Film | BOPET绝缘膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality BOPET insulating film for electrical applications.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">4.5-350μm</span><span class="tech-spec-pill">Insulating</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.5/m²</span><a href="bopet-insulating.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- BOPET Capacitor Film -->
      <div class="tech-section" id="bopet-capacitor">
        <div class="tech-section-header">
          <span class="tech-section-icon">⚡</span>
          <div><span class="tech-section-title">BOPET Capacitor Film</span><span class="tech-section-zh">· BOPET电容器膜</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='bopet-capacitor.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">⚡</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPET Capacitor</span>
              <div class="tech-card-name">BOPET Capacitor Film | BOPET电容器薄膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality BOPET capacitor film for electronic applications.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">4.5-12μm</span><span class="tech-spec-pill">High breakdown</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $2.5/m²</span><a href="bopet-capacitor.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

`;

content = content.substring(0, bopetSectionEnd) + subCategories + content.substring(bopetSectionEnd);
fs.writeFileSync('products.html', content);
console.log('Added BOPET sub-category sections');
