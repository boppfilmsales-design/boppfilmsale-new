-- 创建页面表
CREATE TABLE IF NOT EXISTS pages (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title_en VARCHAR(255),
  title_zh VARCHAR(255),
  content_en TEXT,
  content_zh TEXT,
  specs JSONB DEFAULT '{}',
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建分类表
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name_en VARCHAR(100) NOT NULL,
  name_zh VARCHAR(100),
  slug VARCHAR(100) UNIQUE,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建产品表
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category_id INTEGER REFERENCES categories(id),
  description TEXT,
  thickness VARCHAR(100),
  haze VARCHAR(100),
  gloss VARCHAR(100),
  heat_seal VARCHAR(100),
  price VARCHAR(100),
  image_url VARCHAR(500),
  specs JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建网站设置表
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 插入默认管理员（密码：admin123）
INSERT INTO users (username, password_hash)
VALUES ('admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918')
ON CONFLICT (username) DO NOTHING;

-- 插入默认分类
INSERT INTO categories (name_en, name_zh, slug, sort_order) VALUES
  ('BOPP Film', 'BOPP薄膜', 'bopp', 1),
  ('BOPET Film', 'BOPET薄膜', 'bopet', 2),
  ('Coated Film', '涂布膜', 'coating', 3),
  ('Packing Tape', '包装胶带', 'tape', 4),
  ('CPP / BOPA', '流延膜', 'cpp', 5),
  ('POF Shrink', '收缩膜', 'pof', 6)
ON CONFLICT (slug) DO NOTHING;

-- 插入默认页面
INSERT INTO pages (slug, title_en, title_zh) VALUES
  ('home', 'Home', '首页'),
  ('about', 'About Us', '关于我们'),
  ('contact', 'Contact', '联系我们')
ON CONFLICT (slug) DO NOTHING;

-- 插入默认公司信息
INSERT INTO site_settings (key, value) VALUES
  ('company_name', 'AEC GROUP'),
  ('company_slogan', 'Film Technology Redefined'),
  ('company_year', '2006'),
  ('company_employees', '1200')
ON CONFLICT (key) DO NOTHING;
