const fs = require('fs');
let content = fs.readFileSync('products.html', 'utf8');

// Add POF / PE / PVC sub-categories
const pofEnd = content.indexOf('<!-- Tear Tape & Clips -->');
if (pofEnd !== -1) {
  const subCategories = `

      <!-- POF Shrinkage Film Single Layer -->
      <div class="tech-section" id="pof-single">
        <div class="tech-section-header">
          <span class="tech-section-icon">📦</span>
          <div><span class="tech-section-title">POF Shrinkage Film Single Layer</span><span class="tech-section-zh">· POF单层收缩膜</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='pof-shrink.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📦</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">POF Single Layer</span>
              <div class="tech-card-name">POF Shrinkage Film Single Layer | POF单层收缩膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality POF single layer shrinkage film.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">8-50μm</span><span class="tech-spec-pill">High shrink</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.5/m²</span><a href="pof-shrink.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- POF Shrinkage Film Central Fold -->
      <div class="tech-section" id="pof-central">
        <div class="tech-section-header">
          <span class="tech-section-icon">📦</span>
          <div><span class="tech-section-title">POF Shrinkage Film Central Fold</span><span class="tech-section-zh">· POF中折收缩膜</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='pof-central.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📦</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">POF Central Fold</span>
              <div class="tech-card-name">POF Shrinkage Film Central Fold | POF中折收缩膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality POF central fold shrinkage film.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">8-50μm</span><span class="tech-spec-pill">Central fold</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.6/m²</span><a href="pof-central.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- POF Shrinkage Film Color -->
      <div class="tech-section" id="pof-color">
        <div class="tech-section-header">
          <span class="tech-section-icon">🎨</span>
          <div><span class="tech-section-title">POF Shrinkage Film Color</span><span class="tech-section-zh">· POF彩色收缩膜</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='pof-color.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🎨</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">POF Color</span>
              <div class="tech-card-name">POF Shrinkage Film Color | POF彩色收缩膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality POF color shrinkage film.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">8-50μm</span><span class="tech-spec-pill">Color</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.8/m²</span><a href="pof-color.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- PE Stretch Film -->
      <div class="tech-section" id="pe-stretch">
        <div class="tech-section-header">
          <span class="tech-section-icon">📏</span>
          <div><span class="tech-section-title">PE Stretch Film</span><span class="tech-section-zh">· PE拉伸膜</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='pe-stretch.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📏</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">PE Stretch</span>
              <div class="tech-card-name">PE Stretch Film | PE拉伸膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality PE stretch film.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">8-50μm</span><span class="tech-spec-pill">High stretch</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.2/m²</span><a href="pe-stretch.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- PE Cling film -->
      <div class="tech-section" id="pe-cling">
        <div class="tech-section-header">
          <span class="tech-section-icon">🔄</span>
          <div><span class="tech-section-title">PE Cling film</span><span class="tech-section-zh">· PE缠绕膜</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='pe-cling.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🔄</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">PE Cling</span>
              <div class="tech-card-name">PE Cling Film | PE缠绕膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality PE cling film.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">8-50μm</span><span class="tech-spec-pill">High cling</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.1/m²</span><a href="pe-cling.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- PVC Shrinkage Film -->
      <div class="tech-section" id="pvc-shrink">
        <div class="tech-section-header">
          <span class="tech-section-icon">📦</span>
          <div><span class="tech-section-title">PVC Shrinkage Film</span><span class="tech-section-zh">· PVC收缩膜</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='pvc-shrink.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📦</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">PVC Shrink</span>
              <div class="tech-card-name">PVC Shrinkage Film | PVC收缩膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality PVC shrinkage film.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">8-50μm</span><span class="tech-spec-pill">High shrink</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.4/m²</span><a href="pvc-shrink.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- PVC Cling film -->
      <div class="tech-section" id="pvc-cling">
        <div class="tech-section-header">
          <span class="tech-section-icon">🔄</span>
          <div><span class="tech-section-title">PVC Cling film</span><span class="tech-section-zh">· PVC缠绕膜</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='pvc-cling.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🔄</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">PVC Cling</span>
              <div class="tech-card-name">PVC Cling Film | PVC缠绕膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality PVC cling film.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">8-50μm</span><span class="tech-spec-pill">High cling</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.3/m²</span><a href="pvc-cling.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

`;

  content = content.substring(0, pofEnd) + subCategories + content.substring(pofEnd);
}

// Add Tear Tape sub-categories
const tearEnd = content.indexOf('<!-- Paper Products -->');
if (tearEnd !== -1) {
  const subCategories = `

      <!-- Clear Tear Tape -->
      <div class="tech-section" id="clear-tear">
        <div class="tech-section-header">
          <span class="tech-section-icon">✂️</span>
          <div><span class="tech-section-title">Clear Tear Tape</span><span class="tech-section-zh">· 透明撕裂带</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='tear-tape-clear.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">✂️</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Clear Tear Tape</span>
              <div class="tech-card-name">Clear Tear Tape | 透明撕裂带 | Aec Group</div>
              <div class="tech-card-desc">High-quality clear tear tape.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">12-30μm</span><span class="tech-spec-pill">Transparent</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.5/m²</span><a href="tear-tape-clear.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Golden Tear Tape -->
      <div class="tech-section" id="golden-tear">
        <div class="tech-section-header">
          <span class="tech-section-icon">🌟</span>
          <div><span class="tech-section-title">Golden Tear Tape</span><span class="tech-section-zh">· 金色撕裂带</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='tear-tape-golden.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🌟</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Golden Tear Tape</span>
              <div class="tech-card-name">Golden Tear Tape | 金色撕裂带 | Aec Group</div>
              <div class="tech-card-desc">High-quality golden tear tape.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">12-30μm</span><span class="tech-spec-pill">Golden color</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.8/m²</span><a href="tear-tape-golden.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Red Tear Tape -->
      <div class="tech-section" id="red-tear">
        <div class="tech-section-header">
          <span class="tech-section-icon">🔴</span>
          <div><span class="tech-section-title">Red Tear Tape</span><span class="tech-section-zh">· 红色撕裂带</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='tear-tape-red.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🔴</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Red Tear Tape</span>
              <div class="tech-card-name">Red Tear Tape | 红色撕裂带 | Aec Group</div>
              <div class="tech-card-desc">High-quality red tear tape.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">12-30μm</span><span class="tech-spec-pill">Red color</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.8/m²</span><a href="tear-tape-red.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Laser Tear Tape -->
      <div class="tech-section" id="laser-tear">
        <div class="tech-section-header">
          <span class="tech-section-icon">🔦</span>
          <div><span class="tech-section-title">Laser Tear Tape</span><span class="tech-section-zh">· 激光撕裂带</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='tear-tape-laser.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🔦</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Laser Tear Tape</span>
              <div class="tech-card-name">Laser Tear Tape | 激光撕裂带 | Aec Group</div>
              <div class="tech-card-desc">High-quality laser tear tape.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">12-30μm</span><span class="tech-spec-pill">Laser finish</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $2.0/m²</span><a href="tear-tape-laser.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Printed Tear Tape -->
      <div class="tech-section" id="printed-tear">
        <div class="tech-section-header">
          <span class="tech-section-icon">🖨️</span>
          <div><span class="tech-section-title">Printed Tear Tape</span><span class="tech-section-zh">· 印刷撕裂带</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='tear-tape-printed.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🖨️</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Printed Tear Tape</span>
              <div class="tech-card-name">Printed Tear Tape | 印刷撕裂带 | Aec Group</div>
              <div class="tech-card-desc">High-quality printed tear tape.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">12-30μm</span><span class="tech-spec-pill">Printed</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $2.0/m²</span><a href="tear-tape-printed.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- BOPP Sheet Inserts Tear Tape -->
      <div class="tech-section" id="bopp-sheet-tear">
        <div class="tech-section-header">
          <span class="tech-section-icon">📄</span>
          <div><span class="tech-section-title">BOPP Sheet Inserts Tear Tape</span><span class="tech-section-zh">· BOPP片材撕裂带</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='tear-tape-bopp-sheet.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📄</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPP Sheet Tear</span>
              <div class="tech-card-name">BOPP Sheet Inserts Tear Tape | BOPP片材撕裂带 | Aec Group</div>
              <div class="tech-card-desc">High-quality BOPP sheet inserts tear tape.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">12-30μm</span><span class="tech-spec-pill">BOPP sheet</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.8/m²</span><a href="tear-tape-bopp-sheet.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Self-Adhesive Labels In Rolls -->
      <div class="tech-section" id="labels-rolls">
        <div class="tech-section-header">
          <span class="tech-section-icon">🏷️</span>
          <div><span class="tech-section-title">Self-Adhesive Labels In Rolls</span><span class="tech-section-zh">· 自粘标签卷</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='self-labels-rolls.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🏷️</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Labels Rolls</span>
              <div class="tech-card-name">Self-Adhesive Labels In Rolls | 自粘标签卷 | Aec Group</div>
              <div class="tech-card-desc">High-quality self-adhesive labels in rolls.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various sizes</span><span class="tech-spec-pill">Self-adhesive</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $2.0/m²</span><a href="self-labels-rolls.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Self-Adhesive Labels In Sheets -->
      <div class="tech-section" id="labels-sheets">
        <div class="tech-section-header">
          <span class="tech-section-icon">📋</span>
          <div><span class="tech-section-title">Self-Adhesive Labels In Sheets</span><span class="tech-section-zh">· 自粘标签片材</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='self-labels-sheets.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📋</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Labels Sheets</span>
              <div class="tech-card-name">Self-Adhesive Labels In Sheets | 自粘标签片材 | Aec Group</div>
              <div class="tech-card-desc">High-quality self-adhesive labels in sheets.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various sizes</span><span class="tech-spec-pill">Self-adhesive</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $2.0/m²</span><a href="self-labels-sheets.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- TTR Barcode Ribbons -->
      <div class="tech-section" id="ttr-barcode">
        <div class="tech-section-header">
          <span class="tech-section-icon">📊</span>
          <div><span class="tech-section-title">TTR Barcode Ribbons</span><span class="tech-section-zh">· 热转印条码碳带</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='barcode-ribbons.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📊</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">TTR Barcode</span>
              <div class="tech-card-name">TTR Barcode Ribbons | 热转印条码碳带 | Aec Group</div>
              <div class="tech-card-desc">High-quality TTR barcode ribbons.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various widths</span><span class="tech-spec-pill">Barcode</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $3.0/m²</span><a href="barcode-ribbons.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Wax/resin Ribbons -->
      <div class="tech-section" id="wax-resin">
        <div class="tech-section-header">
          <span class="tech-section-icon">🎗️</span>
          <div><span class="tech-section-title">Wax/resin Ribbons</span><span class="tech-section-zh">· 蜡基/树脂碳带</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='wax-resin-ribbon.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🎗️</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Wax/Resin</span>
              <div class="tech-card-name">Wax/resin Ribbons | 蜡基/树脂碳带 | Aec Group</div>
              <div class="tech-card-desc">High-quality wax/resin ribbons.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various widths</span><span class="tech-spec-pill">Wax/Resin</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $3.5/m²</span><a href="wax-resin-ribbon.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

`;

  content = content.substring(0, tearEnd) + subCategories + content.substring(tearEnd);
}

// Add Paper Products sub-categories
const paperEnd = content.indexOf('<!-- Machines & Equipment -->');
if (paperEnd !== -1) {
  const subCategories = `

      <!-- Copy Paper jumbo rolls -->
      <div class="tech-section" id="copy-paper-jumbo">
        <div class="tech-section-header">
          <span class="tech-section-icon">📄</span>
          <div><span class="tech-section-title">Copy Paper jumbo rolls</span><span class="tech-section-zh">· 复印纸大卷</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='copy-paper-jumbo.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📄</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Copy Paper</span>
              <div class="tech-card-name">Copy Paper Jumbo Rolls | 复印纸大卷 | Aec Group</div>
              <div class="tech-card-desc">High-quality copy paper in jumbo rolls.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">70-80gsm</span><span class="tech-spec-pill">Jumbo roll</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $0.5/m²</span><a href="copy-paper-jumbo.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- A4 Copy Paper -->
      <div class="tech-section" id="a4-copy">
        <div class="tech-section-header">
          <span class="tech-section-icon">📄</span>
          <div><span class="tech-section-title">A4 Copy Paper</span><span class="tech-section-zh">· A4复印纸</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='a4-copy-paper.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📄</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">A4 Copy Paper</span>
              <div class="tech-card-name">A4 Copy Paper | A4复印纸 | Aec Group</div>
              <div class="tech-card-desc">High-quality A4 copy paper.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">70-80gsm</span><span class="tech-spec-pill">A4 size</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $0.6/m²</span><a href="a4-copy-paper.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Letter Size Copy Paper -->
      <div class="tech-section" id="letter-copy">
        <div class="tech-section-header">
          <span class="tech-section-icon">📄</span>
          <div><span class="tech-section-title">Letter Size Copy Paper</span><span class="tech-section-zh">· 信纸尺寸复印纸</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='letter-copy-paper.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📄</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Letter Copy</span>
              <div class="tech-card-name">Letter Size Copy Paper | 信纸尺寸复印纸 | Aec Group</div>
              <div class="tech-card-desc">High-quality letter size copy paper.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">70-80gsm</span><span class="tech-spec-pill">Letter size</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $0.6/m²</span><a href="letter-copy-paper.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Legal size Copy Paper -->
      <div class="tech-section" id="legal-copy">
        <div class="tech-section-header">
          <span class="tech-section-icon">📄</span>
          <div><span class="tech-section-title">Legal size Copy Paper</span><span class="tech-section-zh">· 法律文件尺寸复印纸</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='legal-copy-paper.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📄</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Legal Copy</span>
              <div class="tech-card-name">Legal size Copy Paper | 法律文件尺寸复印纸 | Aec Group</div>
              <div class="tech-card-desc">High-quality legal size copy paper.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">70-80gsm</span><span class="tech-spec-pill">Legal size</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $0.6/m²</span><a href="legal-copy-paper.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- LWC Paper -->
      <div class="tech-section" id="lwc-paper">
        <div class="tech-section-header">
          <span class="tech-section-icon">📄</span>
          <div><span class="tech-section-title">LWC Paper</span><span class="tech-section-zh">· 轻量涂布纸</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='lwc-paper.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📄</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">LWC Paper</span>
              <div class="tech-card-name">LWC Paper | 轻量涂布纸 | Aec Group</div>
              <div class="tech-card-desc">High-quality LWC paper.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various gsm</span><span class="tech-spec-pill">Coated</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $0.7/m²</span><a href="lwc-paper.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Photo Paper -->
      <div class="tech-section" id="photo-paper">
        <div class="tech-section-header">
          <span class="tech-section-icon">📷</span>
          <div><span class="tech-section-title">Photo Paper</span><span class="tech-section-zh">· 相纸</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='photo-paper.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📷</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Photo Paper</span>
              <div class="tech-card-name">Photo Paper | 相纸 | Aec Group</div>
              <div class="tech-card-desc">High-quality photo paper.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various sizes</span><span class="tech-spec-pill">Glossy</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.0/m²</span><a href="photo-paper.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Inkjet Printing Supply -->
      <div class="tech-section" id="inkjet-supply">
        <div class="tech-section-header">
          <span class="tech-section-icon">🖨️</span>
          <div><span class="tech-section-title">Inkjet Printing Supply</span><span class="tech-section-zh">· 喷墨打印耗材</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='inkjet-printing.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🖨️</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Inkjet Supply</span>
              <div class="tech-card-name">Inkjet Printing Supply | 喷墨打印耗材 | Aec Group</div>
              <div class="tech-card-desc">High-quality inkjet printing supply.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various types</span><span class="tech-spec-pill">Inkjet</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.5/m²</span><a href="inkjet-printing.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

`;

  content = content.substring(0, paperEnd) + subCategories + content.substring(paperEnd);
}

// Add Machines & Equipment sub-categories
const machinesEnd = content.indexOf('<!-- TTR Ribbons & Labels -->');
if (machinesEnd !== -1) {
  const subCategories = `

      <!-- Slitting Machines -->
      <div class="tech-section" id="slitting-machines">
        <div class="tech-section-header">
          <span class="tech-section-icon">✂️</span>
          <div><span class="tech-section-title">Slitting Machines</span><span class="tech-section-zh">· 分切机</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='slitting-machine.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">✂️</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Slitting</span>
              <div class="tech-card-name">Slitting Machines | 分切机 | Aec Group</div>
              <div class="tech-card-desc">High-quality slitting machines.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various widths</span><span class="tech-spec-pill">High precision</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">Contact for price</span><a href="slitting-machine.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Printing Machines -->
      <div class="tech-section" id="printing-machines">
        <div class="tech-section-header">
          <span class="tech-section-icon">🖨️</span>
          <div><span class="tech-section-title">Printing Machines</span><span class="tech-section-zh">· 印刷机</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='gravure-printer.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🖨️</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Gravure</span>
              <div class="tech-card-name">Gravure Printer | 凹版印刷机 | Aec Group</div>
              <div class="tech-card-desc">High-quality gravure printing machines.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various colors</span><span class="tech-spec-pill">High speed</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">Contact for price</span><a href="gravure-printer.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div><div class="tech-card" onclick="window.location.href='flexo-printer.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🖨️</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Flexo</span>
              <div class="tech-card-name">Flexo Printer | 柔版印刷机 | Aec Group</div>
              <div class="tech-card-desc">High-quality flexo printing machines.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various colors</span><span class="tech-spec-pill">High speed</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">Contact for price</span><a href="flexo-printer.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Bag Machines -->
      <div class="tech-section" id="bag-machines">
        <div class="tech-section-header">
          <span class="tech-section-icon">🛍️</span>
          <div><span class="tech-section-title">Bag Machines</span><span class="tech-section-zh">· 制袋机</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='pouch-machine.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🛍️</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Bag Machine</span>
              <div class="tech-card-name">Pouch Making Machine | 袋装机 | Aec Group</div>
              <div class="tech-card-desc">High-quality pouch making machines.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various sizes</span><span class="tech-spec-pill">High speed</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">Contact for price</span><a href="pouch-machine.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Tape Machines -->
      <div class="tech-section" id="tape-machines">
        <div class="tech-section-header">
          <span class="tech-section-icon">📦</span>
          <div><span class="tech-section-title">Tape Machines</span><span class="tech-section-zh">· 胶带机</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='tape-extruder.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📦</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Tape Machine</span>
              <div class="tech-card-name">Tape Extruder | 胶带挤出机 | Aec Group</div>
              <div class="tech-card-desc">High-quality tape extruder machines.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various widths</span><span class="tech-spec-pill">High output</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">Contact for price</span><a href="tape-extruder.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Metal Film Machines -->
      <div class="tech-section" id="metal-film-machines">
        <div class="tech-section-header">
          <span class="tech-section-icon">🌟</span>
          <div><span class="tech-section-title">Metal Film Machines</span><span class="tech-section-zh">· 镀膜机</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='vacuum-metallizer.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🌟</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Metallizer</span>
              <div class="tech-card-name">Vacuum Metallizer | 真空镀膜机 | Aec Group</div>
              <div class="tech-card-desc">High-quality vacuum metallizer.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various widths</span><span class="tech-spec-pill">High vacuum</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">Contact for price</span><a href="vacuum-metallizer.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

`;

  content = content.substring(0, machinesEnd) + subCategories + content.substring(machinesEnd);
}

// Add TTR Ribbons & Labels sub-categories
const ttrEnd = content.indexOf('<!-- Adhesive Glue -->');
if (ttrEnd !== -1) {
  const subCategories = `

      <!-- Self-Adhesive Labels -->
      <div class="tech-section" id="labels-rolls-nav">
        <div class="tech-section-header">
          <span class="tech-section-icon">🏷️</span>
          <div><span class="tech-section-title">Self-Adhesive Labels</span><span class="tech-section-zh">· 自粘标签</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='self-labels-rolls.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🏷️</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Labels Rolls</span>
              <div class="tech-card-name">Self-Adhesive Labels In Rolls | 自粘标签卷 | Aec Group</div>
              <div class="tech-card-desc">High-quality self-adhesive labels in rolls.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various sizes</span><span class="tech-spec-pill">Self-adhesive</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $2.0/m²</span><a href="self-labels-rolls.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div><div class="tech-card" onclick="window.location.href='self-labels-sheets.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📋</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Labels Sheets</span>
              <div class="tech-card-name">Self-Adhesive Labels In Sheets | 自粘标签片材 | Aec Group</div>
              <div class="tech-card-desc">High-quality self-adhesive labels in sheets.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various sizes</span><span class="tech-spec-pill">Self-adhesive</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $2.0/m²</span><a href="self-labels-sheets.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- TTR Barcode Ribbons -->
      <div class="tech-section" id="ttr-barcode-nav">
        <div class="tech-section-header">
          <span class="tech-section-icon">📊</span>
          <div><span class="tech-section-title">TTR Barcode Ribbons</span><span class="tech-section-zh">· 热转印条码碳带</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='barcode-ribbons.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📊</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">TTR Barcode</span>
              <div class="tech-card-name">TTR Barcode Ribbons | 热转印条码碳带 | Aec Group</div>
              <div class="tech-card-desc">High-quality TTR barcode ribbons.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various widths</span><span class="tech-spec-pill">Barcode</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $3.0/m²</span><a href="barcode-ribbons.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- Wax/resin Ribbons -->
      <div class="tech-section" id="wax-resin-nav">
        <div class="tech-section-header">
          <span class="tech-section-icon">🎗️</span>
          <div><span class="tech-section-title">Wax/resin Ribbons</span><span class="tech-section-zh">· 蜡基/树脂碳带</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='wax-resin-ribbon.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🎗️</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">Wax/Resin</span>
              <div class="tech-card-name">Wax/resin Ribbons | 蜡基/树脂碳带 | Aec Group</div>
              <div class="tech-card-desc">High-quality wax/resin ribbons.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">Various widths</span><span class="tech-spec-pill">Wax/Resin</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $3.5/m²</span><a href="wax-resin-ribbon.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

`;

  content = content.substring(0, ttrEnd) + subCategories + content.substring(ttrEnd);
}

// Add Adhesive Glue sub-categories
const adhesiveEnd = content.indexOf('<!-- Other Products -->');
if (adhesiveEnd !== -1) {
  const subCategories = `

      <!-- Adhesive Glue -->
      <div class="tech-section" id="adhesive-glue">
        <div class="tech-section-header">
          <span class="tech-section-icon">🧴</span>
          <div><span class="tech-section-title">Adhesive Glue</span><span class="tech-section-zh">· 胶水粘合剂</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='adhesive-glue.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🧴</div></