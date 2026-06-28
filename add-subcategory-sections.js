const fs = require('fs');
let content = fs.readFileSync('products.html', 'utf8');

// Find where BOPP Thermal Lamination Film section ends and add sub-categories
const boppThermalEnd = content.indexOf('<!-- Coating Film -->');
if (boppThermalEnd !== -1) {
  const subCategories = `

      <!-- BOPP Thermal Lamination Film Glossy -->
      <div class="tech-section" id="bopp-thermal-glossy">
        <div class="tech-section-header">
          <span class="tech-section-icon">✨</span>
          <div><span class="tech-section-title">BOPP Thermal Lamination Film Glossy</span><span class="tech-section-zh">· BOPP热复合光亮膜</span></div>
          <span class="tech-section-count">3 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='bopp-thermal.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">✨</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPP Thermal Glossy</span>
              <div class="tech-card-name">Bopp Thermal Lamination Film Glossy | Bopp热复合薄膜（光亮） | Aec Gr</div>
              <div class="tech-card-desc">High-quality BOPP thermal lamination film with glossy finish.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">12-30μm</span><span class="tech-spec-pill">≥95GU</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.1/m²</span><a href="bopp-thermal.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- BOPP Thermal Lamination Film Matt -->
      <div class="tech-section" id="bopp-thermal-matt">
        <div class="tech-section-header">
          <span class="tech-section-icon">🌙</span>
          <div><span class="tech-section-title">BOPP Thermal Lamination Film Matt</span><span class="tech-section-zh">· BOPP热复合哑光膜</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='bopp-thermal-matt.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🌙</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPP Thermal Matt</span>
              <div class="tech-card-name">Bopp Thermal Lamination Film Matt | Bopp热复合薄膜（哑光） | Aec Grou</div>
              <div class="tech-card-desc">High-quality BOPP thermal lamination film with matt finish.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">12-30μm</span><span class="tech-spec-pill">≤30GU</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.0/m²</span><a href="bopp-thermal-matt.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Soft Touch Velvet thermal BOPP -->
      <div class="tech-section" id="soft-touch-velvet">
        <div class="tech-section-header">
          <span class="tech-section-icon">🧸</span>
          <div><span class="tech-section-title">Soft Touch Velvet thermal BOPP</span><span class="tech-section-zh">· 柔软触感天鹅绒BOPP</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='bopp-soft-velvet.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🧸</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPP Soft Velvet</span>
              <div class="tech-card-name">Soft Touch Velvet thermal Bopp | 柔软触感天鹅绒热复合bopp | Aec Group</div>
              <div class="tech-card-desc">Premium BOPP film with soft velvet touch finish.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">18-25μm</span><span class="tech-spec-pill">Soft touch</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.8/m²</span><a href="bopp-soft-velvet.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- BOPET thermal laminating film -->
      <div class="tech-section" id="bopet-thermal">
        <div class="tech-section-header">
          <span class="tech-section-icon">🔥</span>
          <div><span class="tech-section-title">BOPET thermal laminating film</span><span class="tech-section-zh">· BOPET热复合膜</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='bopet-thermal.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🔥</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPET Thermal</span>
              <div class="tech-card-name">Bopet Thermal Laminating Film | Bopet热复合膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality BOPET thermal lamination film.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">12-25μm</span><span class="tech-spec-pill">High strength</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.5/m²</span><a href="bopet-thermal.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- BOPA thermal lamination film -->
      <div class="tech-section" id="bopa-thermal">
        <div class="tech-section-header">
          <span class="tech-section-icon">🔄</span>
          <div><span class="tech-section-title">BOPA thermal lamination film</span><span class="tech-section-zh">· BOPA热复合膜</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='bopa-thermal.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🔄</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPA Thermal</span>
              <div class="tech-card-name">Bopa Thermal Lamination Film | Bopa热复合膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality BOPA thermal lamination film.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">12-20μm</span><span class="tech-spec-pill">High clarity</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.6/m²</span><a href="bopa-thermal.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Matal BOPP thermal lamination film -->
      <div class="tech-section" id="matal-bopp-thermal">
        <div class="tech-section-header">
          <span class="tech-section-icon">⚡</span>
          <div><span class="tech-section-title">Matal BOPP thermal lamination film</span><span class="tech-section-zh">· 金属BOPP热复合膜</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='bopp-metal-thermal.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">⚡</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPP Metal Thermal</span>
              <div class="tech-card-name">Matal BOPP thermal lamination film | 金属BOPP热复合膜 | Aec Group</div>
              <div class="tech-card-desc">Metallized BOPP thermal lamination film.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">12-25μm</span><span class="tech-spec-pill">High barrier</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $2.0/m²</span><a href="bopp-metal-thermal.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Laser BOPET thermal lamination film -->
      <div class="tech-section" id="laser-bopet-thermal">
        <div class="tech-section-header">
          <span class="tech-section-icon">🌟</span>
          <div><span class="tech-section-title">Laser BOPET thermal lamination film</span><span class="tech-section-zh">· 激光BOPET热复合膜</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='bopet-laser-thermal.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🌟</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPET Laser Thermal</span>
              <div class="tech-card-name">Laser BOPET thermal lamination film | 激光BOPET热复合膜 | Aec Group</div>
              <div class="tech-card-desc">Laser BOPET thermal lamination film.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">12-25μm</span><span class="tech-spec-pill">Laser finish</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $2.2/m²</span><a href="bopet-laser-thermal.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

`;

  content = content.substring(0, boppThermalEnd) + subCategories + content.substring(boppThermalEnd);
}

// Add Coating Film sub-categories
const coatingEnd = content.indexOf('<!-- BOPP Packing Tape -->');
if (coatingEnd !== -1) {
  const subCategories = `

      <!-- PVDC Coating Film (K Film) -->
      <div class="tech-section" id="pvdc-kfilm">
        <div class="tech-section-header">
          <span class="tech-section-icon">🛡️</span>
          <div><span class="tech-section-title">PVDC Coating Film (K Film)</span><span class="tech-section-zh">· PVDC涂布K膜</span></div>
          <span class="tech-section-count">3 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='pvdc-kfilm.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🛡️</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">PVDC K Film</span>
              <div class="tech-card-name">Pvdc Coating Film (K Film) | PVDC涂层薄膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality PVDC coating film with excellent barrier properties.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">8-100μm</span><span class="tech-spec-pill">High barrier</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $2.5/m²</span><a href="pvdc-kfilm.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Acrylic Acid Coating Film -->
      <div class="tech-section" id="acrylic-coat">
        <div class="tech-section-header">
          <span class="tech-section-icon">💎</span>
          <div><span class="tech-section-title">Acrylic Acid Coating Film</span><span class="tech-section-zh">· 丙烯酸涂层膜</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='acrylic-coat.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">💎</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Acrylic Coating</span>
              <div class="tech-card-name">Acrylic Acid Coating Film | 丙烯酸涂层薄膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality acrylic acid coating film.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">8-50μm</span><span class="tech-spec-pill">High clarity</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.8/m²</span><a href="acrylic-coat.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

`;

  content = content.substring(0, coatingEnd) + subCategories + content.substring(coatingEnd);
}

// Save the file
fs.writeFileSync('products.html', content);
console.log('Added sub-category sections');
