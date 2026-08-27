# Rosui Ghor — Backend REST API

This is the **Laravel 13 REST API backend** for **Rosui Ghor (রন্ধনশালা)**, built on PHP 8.5+ with **MySQL** and **Laravel Sanctum**.

---

## 🏗️ Architecture & Stack

- **Framework**: Laravel 13 on PHP 8.5+
- **Database**: MySQL / MariaDB (relational schema with foreign keys, composite indexes, and strict relational integrity)
- **Authentication**: Laravel Sanctum Bearer tokens
- **Authorization**: `EnsureAdmin` role-based middleware
- **File Storage**: Local public filesystem disk with symbolic link for recipe images
- **SPA Integration**: Laravel serves the production-built React SPA from `public/index.html` on web fallback routes while routing all `/api/*` endpoints to REST controllers.

---

## 📂 Backend Structure

```
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/Api/
│   │   │   ├── AuthController.php            # Register, Login, Logout, ForgotPassword, ResetPassword
│   │   │   ├── RecipeController.php          # Full CRUD + search + category filters
│   │   │   ├── CategoryController.php        # CRUD + relational deletion guard
│   │   │   ├── RecipeInteractionController.php # Favorite toggle
│   │   │   ├── UserController.php            # Profile management
│   │   │   └── AdminStatisticsController.php # Total users, recipes, categories count
│   │   ├── Middleware/
│   │   │   └── EnsureAdmin.php               # Role authorization check
│   │   └── Requests/                         # Form Request validation rules
│   └── Models/
│       ├── User.php
│       ├── Category.php
│       ├── Recipe.php
│       └── RecipeInteraction.php
├── config/                                   # Database, Sanctum, CORS configuration
├── database/
│   ├── migrations/                           # Schema migrations
│   └── seeders/                              # Database, User, Category, Recipe seeders
├── routes/
│   ├── api.php                               # All 20 REST API routes
│   └── web.php                               # SPA serving routes
└── public/                                   # Built assets & index.html
```

---

## ⚡ Setup & Commands

### 1. Environment & Dependencies
```bash
# In backend/ directory
composer install
cp .env.example .env
php artisan key:generate
```

### 2. Database Migration & Seed
```bash
# Run migrations and seed database with categories, recipes, and users:
php artisan migrate:fresh --seed
```

### 3. Image Storage Symlink
```bash
php artisan storage:link
```

### 4. Start Server
```bash
php artisan serve --port=8000
```
API endpoints will be live at `http://127.0.0.1:8000/api`.

---

## 🔑 Default Credentials

- **Admin Account**: `admin@rosuighor.test` / `password` (Full access to create, edit, and delete recipes and categories)
- **User Account**: `user@rosuighor.test` / `password` (Access to view recipe details, save favorites, update profile)

---

## 📖 API Documentation Reference

For comprehensive request/response payloads and status codes, see [Root API Documentation](../docs/api-documentation.md).
