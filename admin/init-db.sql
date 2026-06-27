-- 创建页面设置表
CREATE TABLE IF NOT EXISTS page_settings (
  id SERIAL PRIMARY KEY,
  hero_title_en VARCHAR(255),
  hero_title_zh VARCHAR(255),
  hero_desc TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建分类表
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建产品表
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) UNIQUE,
  title VARCHAR(255),
  name_en VARCHAR(255) NOT NULL,
  name_zh VARCHAR(255),
  category VARCHAR(100),
  description_en TEXT,
  description_zh TEXT,
  description TEXT,
  thickness VARCHAR(100),
  width VARCHAR(100),
  material VARCHAR(100),
  price VARCHAR(100),
  featured BOOLEAN DEFAULT false,
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建公司信息表
CREATE TABLE IF NOT EXISTS company_info (
  id SERIAL PRIMARY KEY,
  comp_desc_en TEXT,
  comp_desc_zh TEXT,
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
INSERT INTO categories (name, sort_order) VALUES
  ('BOPP Film', 1),
  ('BOPET Film', 2),
  ('Coated Film', 3),
  ('Packing Tape', 4),
  ('CPP / BOPA', 5),
  ('POF Shrink', 6),
  ('Tear Tape', 7),
  ('Paper Products', 8),
  ('Machines & Equipment', 9)
ON CONFLICT DO NOTHING;

-- 插入默认页面设置
INSERT INTO page_settings (hero_title_en, hero_title_zh, hero_desc)
VALUES ('Film Technology Redefined', '薄膜技术重新定义', 'Precision packaging solutions for global industries')
ON CONFLICT DO NOTHING;
