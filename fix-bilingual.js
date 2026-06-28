const fs = require('fs');
let content = fs.readFileSync('products.html', 'utf8');

// Fix BOPP Film sub-items to be bilingual
const replacements = [
  ['Bopp Printing &amp; Laminating Film', 'Bopp Printing &amp; Laminating Film · BOPP印刷复合膜'],
  ['Bopp Heat Sealable Film', 'Bopp Heat Sealable Film · BOPP热封膜'],
  ['Bopp Flower Wrapping Film', 'Bopp Flower Wrapping Film · BOPP花卉包装膜'],
  ['Bopp White Pearlized Film', 'Bopp White Pearlized Film · BOPP白色珠光膜'],
  ['Bopp Cigarette Packs Wrapping Film', 'Bopp Cigarette Packs Wrapping Film · BOPP烟包膜'],
  ['Bopp Metallized Film', 'Bopp Metallized Film · BOPP镀铝膜'],
  ['Bopp Capacitor Film', 'Bopp Capacitor Film · BOPP电容器膜'],

  // Fix BOPET Film sub-items
  ['BOPET 4.5Mic TTR Thermal Transfer Film', 'BOPET 4.5Mic TTR Thermal Transfer Film · BOPET 4.5微米热转印膜'],
  ['BOPET polyester film 4.5microns', 'BOPET polyester film 4.5microns · BOPET聚酯薄膜4.5微米'],
  ['BOPET polyester film 4.0microns', 'BOPET polyester film 4.0microns · BOPET聚酯薄膜4.0微米'],
  ['4.5MIC BOPET Film In Stock', '4.5MIC BOPET Film In Stock · BOPET 4.5微米现货'],
  ['3.8-4.5MIC BOPET TTR Film', '3.8-4.5MIC BOPET TTR Film · BOPET 3.8-4.5微米热转印膜'],
  ['4.5MIC BOPET Film B grade', '4.5MIC BOPET Film B grade · BOPET 4.5微米B级'],
  ['BOPET TTR basic film', 'BOPET TTR basic film · BOPET TTR基膜'],
  ['BOPET Metallized Film Silver', 'BOPET Metallized Film Silver · BOPET镀银膜'],
  ['4.5Mic BOPET Metallized Film', '4.5Mic BOPET Metallized Film · 4.5微米BOPET镀铝膜'],
  ['6 Mic BOPET Metallized Film', '6 Mic BOPET Metallized Film · 6微米BOPET镀铝膜'],
  ['BOPET PLAIN FILM', 'BOPET PLAIN FILM · BOPET普通膜'],
  ['BOPET Film Clear transparent', 'BOPET Film Clear transparent · BOPET透明薄膜'],
  ['BOPET Insulating Film', 'BOPET Insulating Film · BOPET绝缘膜'],
  ['Color VMPET film', 'Color VMPET film · 彩色VMPET膜'],
  ['BOPET Thermal Laminating Film', 'BOPET Thermal Laminating Film · BOPET热复合膜'],
  ['BOPET Twist Film', 'BOPET Twist Film · BOPET扭结膜'],
  ['VMPET Twist Film', 'VMPET Twist Film · VMPET扭结膜'],
  ['BOPET Capacitor Film', 'BOPET Capacitor Film · BOPET电容器膜'],

  // Fix other categories
  ['Packing Tape Jumbo Rolls', 'Packing Tape Jumbo Rolls · 包装胶带大卷'],
  ['BOPP Tape Jumbo Rolls', 'BOPP Tape Jumbo Rolls · BOPP胶带大卷'],
  ['BOPP Crystal Adhesive Tape Jumbo Rolls', 'BOPP Crystal Adhesive Tape Jumbo Rolls · BOPP水晶胶带大卷'],
  ['BOPP Tape Finsihed Rolls', 'BOPP Tape Finsihed Rolls · BOPP胶带成品卷'],
  ['Acrylic adhesive BOPP Tape', 'Acrylic adhesive BOPP Tape · 丙烯酸胶BOPP胶带'],
  ['Printed BOPP adhesive tape', 'Printed BOPP adhesive tape · 印刷BOPP胶带'],
  ['Masking Tape Jumbo Roll', 'Masking Tape Jumbo Roll · 美纹纸胶带大卷'],
  ['Double sides tape jumbo rolls', 'Double sides tape jumbo rolls · 双面胶带大卷'],
  ['BOPS Windows Envelope Film', 'BOPS Windows Envelope Film · BOPS窗口信封膜'],
  ['BOPS Windows Envelope Film Glossy', 'BOPS Windows Envelope Film Glossy · BOPS光亮窗口信封膜'],
  ['BOPS Windows Envelope Film Matt', 'BOPS Windows Envelope Film Matt · BOPS哑光窗口信封膜'],
  ['BOPS Shrinkage Film', 'BOPS Shrinkage Film · BOPS收缩膜'],
  ['BOPS Film For Food Contianer', 'BOPS Film For Food Contianer · BOPS食品容器膜'],
  ['GCPP film', 'GCPP film · GCPP镀铝流延膜'],
  ['VMCPP Film', 'VMCPP Film · VMCPP真空镀铝膜'],
  ['BOPA nylon film', 'BOPA nylon film · BOPA尼龙膜'],
  ['BOPA nylon film 12Mic', 'BOPA nylon film 12Mic · BOPA尼龙膜12微米'],
  ['BOPA nylon film 15Mic', 'BOPA nylon film 15Mic · BOPA尼龙膜15微米'],
  ['POF Shrinkage Film Single Layer', 'POF Shrinkage Film Single Layer · POF单层收缩膜'],
  ['POF Shrinkage Film Central Fold', 'POF Shrinkage Film Central Fold · POF中折收缩膜'],
  ['POF Shrinkage Film Color', 'POF Shrinkage Film Color · POF彩色收缩膜'],
  ['PE Stretch Film', 'PE Stretch Film · PE拉伸膜'],
  ['PE Cling film', 'PE Cling film · PE缠绕膜'],
  ['PVC Shrinkage Film', 'PVC Shrinkage Film · PVC收缩膜'],
  ['PVC Cling film', 'PVC Cling film · PVC缠绕膜'],
  ['Clear Tear Tape', 'Clear Tear Tape · 透明撕裂带'],
  ['Golden Tear Tape', 'Golden Tear Tape · 金色撕裂带'],
  ['Red Tear Tape', 'Red Tear Tape · 红色撕裂带'],
  ['Laser Tear Tape', 'Laser Tear Tape · 激光撕裂带'],
  ['Printed Tear Tape', 'Printed Tear Tape · 印刷撕裂带'],
  ['BOPP Sheet Inserts Tear Tape', 'BOPP Sheet Inserts Tear Tape · BOPP片材撕裂带'],
  ['Self-Adhesive Labels In Rolls', 'Self-Adhesive Labels In Rolls · 自粘标签卷'],
  ['Self-Adhesive Labels In Sheets', 'Self-Adhesive Labels In Sheets · 自粘标签片材'],
  ['TTR Barcode Ribbons', 'TTR Barcode Ribbons · 热转印条码碳带'],
  ['Wax/resin Ribbons', 'Wax/resin Ribbons · 蜡基/树脂碳带'],
  ['Copy Paper jumbo rolls', 'Copy Paper jumbo rolls · 复印纸大卷'],
  ['A4 Copy Paper', 'A4 Copy Paper · A4复印纸'],
  ['Letter Size Copy Paper', 'Letter Size Copy Paper · 信纸尺寸复印纸'],
  ['Legal size Copy Paper', 'Legal size Copy Paper · 法律文件尺寸复印纸'],
  ['LWC Paper', 'LWC Paper · 轻量涂布纸'],
  ['Photo Paper', 'Photo Paper · 相纸'],
  ['Inkjet Printing Supply', 'Inkjet Printing Supply · 喷墨打印耗材'],
  ['Slitting Machines', 'Slitting Machines · 分切机'],
  ['Printing Machines', 'Printing Machines · 印刷机'],
  ['Bag Machines', 'Bag Machines · 制袋机'],
  ['Tape Machines', 'Tape Machines · 胶带机'],
  ['Metal Film Machines', 'Metal Film Machines · 镀膜机'],
  ['Adhesive Glue', 'Adhesive Glue · 胶水粘合剂'],

  // Fix BOPP Thermal Lamination sub-items
  ['BOPP Thermal Lamination Film Glossy', 'BOPP Thermal Lamination Film Glossy · BOPP热复合光亮膜'],
  ['BOPP Thermal Lamination Film Matt', 'BOPP Thermal Lamination Film Matt · BOPP热复合哑光膜'],
  ['Soft Touch Velvet thermal BOPP', 'Soft Touch Velvet thermal BOPP · 柔软触感天鹅绒BOPP'],
  ['BOPET thermal laminating film', 'BOPET thermal laminating film · BOPET热复合膜'],
  ['BOPA thermal lamination film', 'BOPA thermal lamination film · BOPA热复合膜'],
  ['Matal BOPP thermal lamination film', 'Matal BOPP thermal lamination film · 金属BOPP热复合膜'],
  ['Laser BOPET thermal lamination film', 'Laser BOPET thermal lamination film · 激光BOPET热复合膜'],

  // Fix Coating Film sub-items
  ['PVDC Coating Film (K Film)', 'PVDC Coating Film (K Film) · PVDC涂布K膜'],
  ['Acrylic Acid Coating Film', 'Acrylic Acid Coating Film · 丙烯酸涂层膜'],

  // Fix Specs sub-items
  ['BOPP Plain Film Specs', 'BOPP Plain Film Specs · BOPP普通薄膜规格'],
  ['BOPP Heat Sealable Specs', 'BOPP Heat Sealable Specs · BOPP热封薄膜规格'],
  ['BOPP Pearlized Specs', 'BOPP Pearlized Specs · BOPP珠光薄膜规格'],
  ['BOPET Clear Film Specs', 'BOPET Clear Film Specs · BOPET透明薄膜规格'],
  ['CPP Film Specs', 'CPP Film Specs · CPP流延膜规格'],

  // Fix Applications sub-items
  ['Food Packaging', 'Food Packaging · 食品包装'],
  ['Pharmaceutical', 'Pharmaceutical · 医药'],
  ['Tobacco', 'Tobacco · 烟草'],
  ['Printing', 'Printing · 印刷出版'],
  ['Electronics', 'Electronics · 电子'],

  // Fix Equipment sub-items
  ['Manufacturing Equipment', 'Manufacturing Equipment · 制造设备'],
  ['Gravure Printer', 'Gravure Printer · 凹版印刷机'],

  // Fix Why Us sub-items
  ['Integrated Manufacturing', 'Integrated Manufacturing · 一体化制造'],
  ['20+ Years Export', '20+ Years Export · 20余年出口'],
  ['Custom Specifications', 'Custom Specifications · 定制规格'],
  ['Competitive Pricing', 'Competitive Pricing · 价格优势'],
];

for (const [english, bilingual] of replacements) {
  const searchStr = '>' + english + '</a>';
  const replaceStr = '>' + bilingual + '</a>';
  content = content.split(searchStr).join(replaceStr);
}

// Also fix the nav-sub-title items
const titleReplacements = [
  ['BOPET 4.5Mic TTR Thermal Transfer Film', 'BOPET 4.5Mic TTR Thermal Transfer Film · BOPET 4.5微米热转印膜'],
  ['BOPET Metallized Film Silver', 'BOPET Metallized Film Silver · BOPET镀银膜'],
  ['BOPET PLAIN FILM', 'BOPET PLAIN FILM · BOPET普通膜'],
  ['BOPET Capacitor Film', 'BOPET Capacitor Film · BOPET电容器膜'],
  ['Packing Tape Jumbo Rolls', 'Packing Tape Jumbo Rolls · 包装胶带大卷'],
  ['Tear Tape', 'Tear Tape · 撕裂带'],
  ['Labels &amp; TTR Ribbons', 'Labels &amp; TTR Ribbons · 标签和碳带'],
  ['Self-adhesive Labels', 'Self-adhesive Labels · 自粘标签'],
  ['TTR Ribbons', 'TTR Ribbons · 热转印碳带'],
  ['Copy Paper', 'Copy Paper · 复印纸'],
  ['Slitting Machines', 'Slitting Machines · 分切机'],
  ['Printing Machines', 'Printing Machines · 印刷机'],
  ['Bag Machines', 'Bag Machines · 制袋机'],
  ['Tape Machines', 'Tape Machines · 胶带机'],
  ['Metal Film Machines', 'Metal Film Machines · 镀膜机'],
];

for (const [english, bilingual] of titleReplacements) {
  const searchStr = '>' + english + '</li>';
  const replaceStr = '>' + bilingual + '</li>';
  content = content.split(searchStr).join(replaceStr);
}

fs.writeFileSync('products.html', content);
console.log('Fixed bilingual labels in products.html sidebar');
