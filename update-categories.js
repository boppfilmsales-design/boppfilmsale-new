const fs = require('fs');
let content = fs.readFileSync('products.html', 'utf8');

// Function to find and replace text
function replaceText(search, replace) {
  content = content.split(search).join(replace);
}

// 1. Update BOPP Thermal Lamination Film sidebar
replaceText(
  '<a href="#boppthermal-cat"><span class="nav-dot"></span>BOPP Thermal Laminatinn Film · BOPP预涂膜</a>',
  `<a href="#boppthermal-cat"><span class="nav-dot"></span>BOPP Thermal Laminatinn Film · BOPP预涂膜</a>
        <ul class="nav-sub">
          <li><a href="#bopp-thermal-glossy">BOPP Thermal Lamination Film Glossy</a></li>
          <li><a href="#bopp-thermal-matt">BOPP Thermal Lamination Film Matt</a></li>
          <li><a href="#soft-touch-velvet">Soft Touch Velvet thermal BOPP</a></li>
          <li><a href="#bopet-thermal">BOPET thermal laminating film</a></li>
          <li><a href="#bopa-thermal">BOPA thermal lamination film</a></li>
          <li><a href="#matal-bopp-thermal">Matal BOPP thermal lamination film</a></li>
          <li><a href="#laser-bopet-thermal">Laser BOPET thermal lamination film</a></li>
        </ul>`
);

// 2. Update Coating Film sidebar
replaceText(
  '<a href="#coatingfilm-cat"><span class="nav-dot"></span>Coating Film · 涂布膜</a>',
  `<a href="#coatingfilm-cat"><span class="nav-dot"></span>Coating Film · 涂布膜</a>
        <ul class="nav-sub">
          <li><a href="#pvdc-kfilm">PVDC Coating Film (K Film)</a></li>
          <li><a href="#acrylic-coat">Acrylic Acid Coating Film</a></li>
        </ul>`
);

// 3. Update BOPP Packing Tape sidebar
replaceText(
  '<a href="#packingtape-cat"><span class="nav-dot"></span>BOPP Packing Tape · 包装胶带</a>',
  `<a href="#packingtape-cat"><span class="nav-dot"></span>BOPP Packing Tape · 包装胶带</a>
        <ul class="nav-sub">
          <li class="nav-sub-title">Packing Tape Jumbo Rolls</li>
          <li><a href="#bopp-tape-jumbo">BOPP Tape Jumbo Rolls</a></li>
          <li><a href="#bopp-crystal-jumbo">BOPP Crystal Adhesive Tape Jumbo Rolls</a></li>
          <li><a href="#bopp-tape-finished">BOPP Tape Finsihed Rolls</a></li>
          <li><a href="#acrylic-bopp-tape">Acrylic adhesive BOPP Tape</a></li>
          <li><a href="#printed-bopp-tape">Printed BOPP adhesive tape</a></li>
          <li><a href="#masking-tape-jumbo">Masking Tape Jumbo Roll</a></li>
          <li><a href="#double-sides-jumbo">Double sides tape jumbo rolls</a></li>
        </ul>`
);

// 4. Update BOPS Windows Envelope Film sidebar
replaceText(
  '<a href="#bopswindows-cat"><span class="nav-dot"></span>BOPS Windows Envelope Film · 聚苯乙烯薄膜</a>',
  `<a href="#bopswindows-cat"><span class="nav-dot"></span>BOPS Windows Envelope Film · 聚苯乙烯薄膜</a>
        <ul class="nav-sub">
          <li><a href="#bops-glossy">BOPS Windows Envelope Film Glossy</a></li>
          <li><a href="#bops-matt">BOPS Windows Envelope Film Matt</a></li>
          <li><a href="#bops-shrink">BOPS Shrinkage Film</a></li>
          <li><a href="#bops-food">BOPS Film For Food Contianer</a></li>
        </ul>`
);

// 5. Update CPP / BOPA Film sidebar
replaceText(
  '<a href="#cppbopa-cat"><span class="nav-dot"></span>CPP / BOPA Film · 流延膜&amp;尼龙膜</a>',
  `<a href="#cppbopa-cat"><span class="nav-dot"></span>CPP / BOPA Film · 流延膜&amp;尼龙膜</a>
        <ul class="nav-sub">
          <li class="nav-sub-title">CPP Film</li>
          <li><a href="#gcpp-film">GCPP film</a></li>
          <li><a href="#vmcpp-film">VMCPP Film</a></li>
          <li class="nav-sub-title">BOPA nylon film</li>
          <li><a href="#bopa-12mic">BOPA nylon film 12Mic</a></li>
          <li><a href="#bopa-15mic">BOPA nylon film 15Mic</a></li>
        </ul>`
);

// 6. Update POF / PE / PVC sidebar
replaceText(
  '<a href="#pofpepvc-cat"><span class="nav-dot"></span>POF / PE / PVC · 收缩膜及袋类产品</a>',
  `<a href="#pofpepvc-cat"><span class="nav-dot"></span>POF / PE / PVC · 收缩膜及袋类产品</a>
        <ul class="nav-sub">
          <li class="nav-sub-title">POF Shrinkage Film</li>
          <li><a href="#pof-single">POF Shrinkage Film Single Layer</a></li>
          <li><a href="#pof-central">POF Shrinkage Film Central Fold</a></li>
          <li><a href="#pof-color">POF Shrinkage Film Color</a></li>
          <li class="nav-sub-title">PE film</li>
          <li><a href="#pe-stretch">PE Stretch Film</a></li>
          <li><a href="#pe-cling">PE Cling film</a></li>
          <li class="nav-sub-title">PVC film</li>
          <li><a href="#pvc-shrink">PVC Shrinkage Film</a></li>
          <li><a href="#pvc-cling">PVC Cling film</a></li>
        </ul>`
);

// 7. Update Tear Tape & Clips sidebar
replaceText(
  '<a href="#teartape-cat"><span class="nav-dot"></span>Tear Tape &amp; Clips · 拉线和包扎绳</a>',
  `<a href="#teartape-cat"><span class="nav-dot"></span>Tear Tape &amp; Clips · 拉线和包扎绳</a>
        <ul class="nav-sub">
          <li class="nav-sub-title">Tear Tape</li>
          <li><a href="#clear-tear">Clear Tear Tape</a></li>
          <li><a href="#golden-tear">Golden Tear Tape</a></li>
          <li><a href="#red-tear">Red Tear Tape</a></li>
          <li><a href="#laser-tear">Laser Tear Tape</a></li>
          <li><a href="#printed-tear">Printed Tear Tape</a></li>
          <li><a href="#bopp-sheet-tear">BOPP Sheet Inserts Tear Tape</a></li>
          <li class="nav-sub-title">Labels &amp; TTR Ribbons</li>
          <li><a href="#labels-rolls">Self-Adhesive Labels In Rolls</a></li>
          <li><a href="#labels-sheets">Self-Adhesive Labels In Sheets</a></li>
          <li><a href="#ttr-barcode">TTR Barcode Ribbons</a></li>
          <li><a href="#wax-resin">Wax/resin Ribbons</a></li>
        </ul>`
);

// 8. Update Paper Products sidebar
replaceText(
  '<a href="#paperproducts-cat"><span class="nav-dot"></span>Paper Products · 纸制品</a>',
  `<a href="#paperproducts-cat"><span class="nav-dot"></span>Paper Products · 纸制品</a>
        <ul class="nav-sub">
          <li><a href="#copy-paper-jumbo">Copy Paper jumbo rolls</a></li>
          <li><a href="#a4-copy">A4 Copy Paper</a></li>
          <li><a href="#letter-copy">Letter Size Copy Paper</a></li>
          <li><a href="#legal-copy">Legal size Copy Paper</a></li>
          <li><a href="#lwc-paper">LWC Paper</a></li>
          <li><a href="#photo-paper">Photo Paper</a></li>
          <li><a href="#inkjet-supply">Inkjet Printing Supply</a></li>
        </ul>`
);

// 9. Update Machines & Equipment sidebar
replaceText(
  '<a href="#machinesequipment-cat"><span class="nav-dot"></span>Machines &amp; Equipment · 机器设备</a>',
  `<a href="#machinesequipment-cat"><span class="nav-dot"></span>Machines &amp; Equipment · 机器设备</a>
        <ul class="nav-sub">
          <li><a href="#slitting-machines">Slitting Machines</a></li>
          <li><a href="#printing-machines">Printing Machines</a></li>
          <li><a href="#bag-machines">Bag Machines</a></li>
          <li><a href="#tape-machines">Tape Machines</a></li>
          <li><a href="#metal-film-machines">Metal Film Machines</a></li>
        </ul>`
);

// 10. Update TTR Ribbons & Labels sidebar
replaceText(
  '<a href="#ttrlabels-cat"><span class="nav-dot"></span>TTR Ribbons &amp; Labels · 热转印碳带</a>',
  `<a href="#ttrlabels-cat"><span class="nav-dot"></span>TTR Ribbons &amp; Labels · 热转印碳带</a>
        <ul class="nav-sub">
          <li class="nav-sub-title">Self-adhesive Labels</li>
          <li><a href="#labels-rolls-nav">Self-Adhesive Labels In Rolls</a></li>
          <li><a href="#labels-sheets-nav">Self-Adhesive Labels In Sheets</a></li>
          <li class="nav-sub-title">TTR Ribbons</li>
          <li><a href="#ttr-barcode-nav">TTR Barcode Ribbons</a></li>
          <li><a href="#wax-resin-nav">Wax/resin Ribbons</a></li>
        </ul>`
);

// 11. Update Adhesive Glue sidebar
replaceText(
  '<a href="#adhesives-cat"><span class="nav-dot"></span>Adhesive Glue · 胶水粘合剂</a>',
  `<a href="#adhesives-cat"><span class="nav-dot"></span>Adhesive Glue · 胶水粘合剂</a>
        <ul class="nav-sub">
          <li><a href="#adhesive-glue">Adhesive Glue</a></li>
        </ul>`
);

fs.writeFileSync('products.html', content);
console.log('Updated all category sidebar menus');
