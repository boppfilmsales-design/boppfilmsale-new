const fs = require('fs');
let content = fs.readFileSync('products.html', 'utf8');

// Add BOPS Windows Envelope Film sub-categories
const bopsEnd = content.indexOf('<!-- CPP / BOPA Film -->');
if (bopsEnd !== -1) {
  const subCategories = `

      <!-- BOPS Windows Envelope Film Glossy -->
      <div class="tech-section" id="bops-glossy">
        <div class="tech-section-header">
          <span class="tech-section-icon">✨</span>
          <div><span class="tech-section-title">BOPS Windows Envelope Film Glossy</span><span class="tech-section-zh">· BOPS光亮窗口信封膜</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='bops-glossy.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">✨</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPS Glossy</span>
              <div class="tech-card-name">BOPS Windows Envelope Film Glossy | BOPS光亮窗口信封膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality BOPS glossy film for window envelopes.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">8-20μm</span><span class="tech-spec-pill">High gloss</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.2/m²</span><a href="bops-glossy.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- BOPS Windows Envelope Film Matt -->
      <div class="tech-section" id="bops-matt">
        <div class="tech-section-header">
          <span class="tech-section-icon">🌙</span>
          <div><span class="tech-section-title">BOPS Windows Envelope Film Matt</span><span class="tech-section-zh">· BOPS哑光窗口信封膜</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='bops-matt.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🌙</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPS Matt</span>
              <div class="tech-card-name">BOPS Windows Envelope Film Matt | BOPS哑光窗口信封膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality BOPS matt film for window envelopes.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">8-20μm</span><span class="tech-spec-pill">Matt finish</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.1/m²</span><a href="bops-matt.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- BOPS Shrinkage Film -->
      <div class="tech-section" id="bops-shrink">
        <div class="tech-section-header">
          <span class="tech-section-icon">📦</span>
          <div><span class="tech-section-title">BOPS Shrinkage Film</span><span class="tech-section-zh">· BOPS收缩膜</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='bops-shrink.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">📦</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPS Shrink</span>
              <div class="tech-card-name">BOPS Shrinkage Film | BOPS收缩膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality BOPS shrinkage film.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">8-20μm</span><span class="tech-spec-pill">High shrink</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.3/m²</span><a href="bops-shrink.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- BOPS Film For Food Container -->
      <div class="tech-section" id="bops-food">
        <div class="tech-section-header">
          <span class="tech-section-icon">🍽️</span>
          <div><span class="tech-section-title">BOPS Film For Food Container</span><span class="tech-section-zh">· BOPS食品容器膜</span></div>
          <span class="tech-section-count">1 Product</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='bops-food.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🍽️</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPS Food</span>
              <div class="tech-card-name">BOPS Film For Food Container | BOPS食品容器膜 | Aec Group</div>
              <div class="tech-card-desc">Food-grade BOPS film for food containers.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">8-20μm</span><span class="tech-spec-pill">Food grade</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.4/m²</span><a href="bops-food.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

`;

  content = content.substring(0, bopsEnd) + subCategories + content.substring(bopsEnd);
}

// Add CPP / BOPA Film sub-categories
const cppEnd = content.indexOf('<!-- POF / PE / PVC -->');
if (cppEnd !== -1) {
  const subCategories = `

      <!-- GCPP film -->
      <div class="tech-section" id="gcpp-film">
        <div class="tech-section-header">
          <span class="tech-section-icon">✨</span>
          <div><span class="tech-section-title">GCPP film</span><span class="tech-section-zh">· GCPP镀铝流延膜</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='gcpp-film.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">✨</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">GCPP</span>
              <div class="tech-card-name">Gcpp Film | GCPP流延膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality GCPP film.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">8-50μm</span><span class="tech-spec-pill">High barrier</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.5/m²</span><a href="gcpp-film.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- VMCPP Film -->
      <div class="tech-section" id="vmcpp-film">
        <div class="tech-section-header">
          <span class="tech-section-icon">🌟</span>
          <div><span class="tech-section-title">VMCPP Film</span><span class="tech-section-zh">· VMCPP真空镀铝膜</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='vmcpp-film.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🌟</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">VMCPP</span>
              <div class="tech-card-name">Vmcpp Film | VMCPP真空镀铝膜 | Aec Group</div>
              <div class="tech-card-desc">High-quality VMCPP film.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">8-50μm</span><span class="tech-spec-pill">High barrier</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $1.8/m²</span><a href="vmcpp-film.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

      <!-- BOPA nylon film -->
      <div class="tech-section" id="bopa-12mic">
        <div class="tech-section-header">
          <span class="tech-section-icon">🔬</span>
          <div><span class="tech-section-title">BOPA nylon film</span><span class="tech-section-zh">· BOPA尼龙膜</span></div>
          <span class="tech-section-count">2 Products</span>
        </div>
        <div class="pgrid" ><div class="tech-card" onclick="window.location.href='bopa-12mic.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🔬</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPA</span>
              <div class="tech-card-name">BOPA nylon film 12Mic | BOPA尼龙膜12微米 | Aec Group</div>
              <div class="tech-card-desc">High-quality BOPA nylon film 12 microns.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">12μm</span><span class="tech-spec-pill">High strength</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $2.0/m²</span><a href="bopa-12mic.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div><div class="tech-card" onclick="window.location.href='bopa-15mic.html'" style="cursor:pointer">
            <div class="tech-card-img"><div class="tech-icon">🔬</div></div>
            <div class="tech-card-body">
              <span class="tech-card-tag">BOPA</span>
              <div class="tech-card-name">BOPA nylon film 15Mic | BOPA尼龙膜15微米 | Aec Group</div>
              <div class="tech-card-desc">High-quality BOPA nylon film 15 microns.</div>
              <div class="tech-card-specs"><span class="tech-spec-pill">15μm</span><span class="tech-spec-pill">High strength</span></div>
              <div class="tech-card-footer"><span class="tech-card-price">From $2.2/m²</span><a href="bopa-15mic.html" class="tech-card-btn">Details <span class="arrow">→</span></a></div>
            </div>
          </div></div>
      </div>

`;

  content = content.substring(0, cppEnd) + subCategories + content.substring(cppEnd);
}

// Save the file
fs.writeFileSync('products.html', content);
console.log('Added more sub-category sections');
