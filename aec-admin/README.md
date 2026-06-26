# AEC Admin - Backend Management System

## Project Structure

```
aec-admin/
├── api/
│   ├── products.js    # Products CRUD API
│   └── auth.js        # Authentication API
├── admin/
│   └── index.html     # Admin panel (login + product management)
├── lib/
│   └── db.js          # Neon Postgres database connection
├── content.html       # Product detail page (frontend)
├── schema.sql         # Database schema
├── package.json
└── vercel.json
```

## Setup Instructions

### 1. Install Dependencies
```bash
cd aec-admin
npm install
```

### 2. Database Setup
1. Go to Neon Console: https://console.neon.tech
2. Open your project's SQL editor
3. Run the contents of `schema.sql`

### 3. Environment Variables
In Vercel, add:
- `DATABASE_URL` = Your Neon Postgres connection string

### 4. Deploy to Vercel
```bash
cd aec-admin
vercel
```

Or connect the folder to Vercel via the dashboard.

### 5. Access
- Admin Panel: `https://your-project.vercel.app/admin/index.html`
- Product Page: `https://your-project.vercel.app/content.html`
- API: `https://your-project.vercel.app/api/products`

### Default Login
- Username: `admin`
- Password: `admin123`
