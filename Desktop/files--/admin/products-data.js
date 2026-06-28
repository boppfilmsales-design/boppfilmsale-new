// Product data for AEC GROUP website
// This file is shared between the frontend products page and the admin panel

var productsData = {
  categories: [
    { id: 'boppfilm-cat', nameEn: 'BOPP Film', nameZh: 'BOPP薄膜', icon: '🎞️', order: 1 },
    { id: 'bopetfilm-cat', nameEn: 'BOPET Film', nameZh: 'BOPET薄膜', icon: '🧊', order: 2 },
    { id: 'boppthermal-cat', nameEn: 'BOPP Thermal Laminatinn Film', nameZh: 'BOPP预涂膜', icon: '🔥', order: 3 },
    { id: 'coatingfilm-cat', nameEn: 'Coating Film', nameZh: '涂布膜', icon: '🛡️', order: 4 },
    { id: 'packingtape-cat', nameEn: 'BOPP Packing Tape', nameZh: '包装胶带', icon: '📦', order: 5 },
    { id: 'bopswindows-cat', nameEn: 'BOPS Windows Envelope Film', nameZh: '聚苯乙烯薄膜', icon: '📄', order: 6 },
    { id: 'cppbopa-cat', nameEn: 'CPP / BOPA Film', nameZh: '流延膜&尼龙膜', icon: '🌊', order: 7 },
    { id: 'pofpepvc-cat', nameEn: 'POF / PE / PVC', nameZh: '收缩膜及袋类产品', icon: '🎬', order: 8 },
    { id: 'teartape-cat', nameEn: 'Tear Tape & Clips', nameZh: '拉线和包扎绳', icon: '📌', order: 9 },
    { id: 'paperproducts-cat', nameEn: 'Paper Products', nameZh: '纸制品', icon: '📄', order: 10 },
    { id: 'machinesequipment-cat', nameEn: 'Machines & Equipment', nameZh: '机器设备', icon: '🔧', order: 11 },
    { id: 'ttrlabels-cat', nameEn: 'TTR Ribbons & Labels', nameZh: '热转印碳带', icon: '📊', order: 12 },
    { id: 'adhesives-cat', nameEn: 'Adhesive Glue', nameZh: '胶水粘合剂', icon: '🧴', order: 13 },
    { id: 'other-cat', nameEn: 'Other Products', nameZh: '其他产品', icon: '📦', order: 14 }
  ],
  products: [
    // BOPP Film
    { id: 1, nameEn: 'Pe or Bopp Bags', nameZh: 'PE或BOPP袋子', category: 'boppfilm-cat', descriptionEn: 'High-quality bopp film product for industrial and packaging applications.', descriptionZh: '优质BOPP薄膜产品，适用于工业和包装应用。', price: 'From $0.8/m²', thickness: '3-75μm', specs: ['High clarity', 'Good printability'], status: 'active' },
    { id: 2, nameEn: 'Bopp Anti-Fog Film', nameZh: 'BOPP防雾薄膜', category: 'boppfilm-cat', descriptionEn: 'High-quality bopp film product for industrial and packaging applications.', descriptionZh: '优质BOPP薄膜产品，适用于工业和包装应用。', price: 'From $0.8/m²', thickness: '3-75μm', specs: ['High clarity', 'Anti-fog'], status: 'active' },
    { id: 3, nameEn: 'Bopp Anti Static Film', nameZh: 'BOPP抗静电薄膜', category: 'boppfilm-cat', descriptionEn: 'High-quality bopp film product for industrial and packaging applications.', descriptionZh: '优质BOPP薄膜产品，适用于工业和包装应用。', price: 'From $0.8/m²', thickness: '3-75μm', specs: ['High clarity', 'Anti-static'], status: 'active' },
    { id: 4, nameEn: 'Bopp Bag Grade Film', nameZh: 'BOPP袋级薄膜', category: 'boppfilm-cat', descriptionEn: 'High-quality bopp film product for industrial and packaging applications.', descriptionZh: '优质BOPP薄膜产品，适用于工业和包装应用。', price: 'From $0.8/m²', thickness: '3-75μm', specs: ['High clarity', 'Strong'], status: 'active' },
    { id: 5, nameEn: 'Bopp Bags', nameZh: 'BOPP袋子', category: 'boppfilm-cat', descriptionEn: 'High-quality bopp film product for industrial and packaging applications.', descriptionZh: '优质BOPP薄膜产品，适用于工业和包装应用。', price: 'From $0.8/m²', thickness: '3-75μm', specs: ['High clarity', 'Durable'], status: 'active' },
    { id: 6, nameEn: 'Biaxial-oriented Polypropylene Film', nameZh: '双向拉伸聚丙烯薄膜', category: 'boppfilm-cat', descriptionEn: 'High-quality bopp film product for industrial and packaging applications.', descriptionZh: '优质BOPP薄膜产品，适用于工业和包装应用。', price: 'From $0.8/m²', thickness: '3-75μm', specs: ['High clarity', 'High strength'], status: 'active' },

    // BOPET Film
    { id: 101, nameEn: 'BOPET Clear Film', nameZh: 'BOPET透明薄膜', category: 'bopetfilm-cat', descriptionEn: 'High-quality bopet film for packaging applications.', descriptionZh: '优质BOPET薄膜，适用于包装应用。', price: 'From $1.3/m²', thickness: '4.5-350μm', specs: ['Clear', 'High strength'], status: 'active' },
    { id: 102, nameEn: 'BOPET Plain Film', nameZh: 'BOPET普通薄膜', category: 'bopetfilm-cat', descriptionEn: 'High-quality bopet film for packaging applications.', descriptionZh: '优质BOPET薄膜，适用于包装应用。', price: 'From $1.3/m²', thickness: '4.5-350μm', specs: ['Plain', 'High strength'], status: 'active' },
    { id: 103, nameEn: 'BOPET Metallized Film', nameZh: 'BOPET镀铝薄膜', category: 'bopetfilm-cat', descriptionEn: 'High-quality bopet film for packaging applications.', descriptionZh: '优质BOPET薄膜，适用于包装应用。', price: 'From $1.8/m²', thickness: '4.5-350μm', specs: ['Metallized', 'High barrier'], status: 'active' },
    { id: 104, nameEn: 'BOPET Capacitor Film', nameZh: 'BOPET电容器薄膜', category: 'bopetfilm-cat', descriptionEn: 'High-quality bopet film for electronic applications.', descriptionZh: '优质BOPET薄膜，适用于电子应用。', price: 'From $2.5/m²', thickness: '4.5-12μm', specs: ['High breakdown', 'Clear'], status: 'active' },

    // Add more products as needed...
  ]
};

// Make it available globally
if (typeof window !== 'undefined') {
  window.productsData = productsData;
}
