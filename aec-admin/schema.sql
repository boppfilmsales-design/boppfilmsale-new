-- AEC GROUP Database Schema for Neon Postgres
-- Run this in your Neon SQL editor to set up the database

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  description TEXT,
  thickness VARCHAR(100),
  haze VARCHAR(100),
  gloss VARCHAR(100),
  heat_seal VARCHAR(100),
  image_url VARCHAR(500),
  specs JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table for admin authentication
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, password_hash)
VALUES ('admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918')
ON CONFLICT (username) DO NOTHING;

-- Sample product data
INSERT INTO products (title, category, description, thickness, haze, gloss, heat_seal, image_url, sort_order)
VALUES
  ('BOPP Plain Film', 'BOPP Film', 'Standard biaxially oriented polypropylene film for general packaging, printing and lamination applications.', '3-75μm', '≤1.5%', '≥85 GU', 'No', NULL, 1),
  ('BOPP Glossy Film', 'BOPP Film', 'High gloss biaxially oriented polypropylene film with excellent clarity and gloss for premium packaging.', '8-50μm', '≤1.0%', '≥95 GU', 'No', NULL, 2),
  ('BOPP Matte Film', 'BOPP Film', 'Matte finish biaxially oriented polypropylene film with excellent printability and soft touch feel.', '10-60μm', '≤2.0%', '≤30 GU', 'No', NULL, 3),
  ('BOPP Heat Sealable Film', 'BOPP Film', 'Heat sealable biaxially oriented polypropylene film with strong heat seal strength for automated packaging.', '12-75μm', '≤1.5%', '≥85 GU', 'Yes', NULL, 4),
  ('BOPET Clear Film', 'BOPET Film', 'Clear biaxially oriented polyester film with excellent clarity, strength and barrier properties.', '6-50μm', '≤1.0%', '≥98 GU', 'No', NULL, 5),
  ('PVDC K Film', 'Coated Film', 'PVDC coated BOPP film with superior oxygen and moisture barrier properties for food packaging.', '8-100μm', '≤1.5%', '≥90 GU', 'No', NULL, 6);
