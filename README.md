# Rosui Ghor (রন্ধনশালা) — Single-Vendor Recipe Web Application

**Rosui Ghor** is a modern, warm, and responsive single-vendor recipe web application designed for everyday cooking enthusiasts and university course demonstration. It pairs a fast **React 19 + TypeScript + Vite + Tailwind CSS** frontend with a robust, conventional **Laravel + MySQL** REST API backend secured by **Laravel Sanctum**.

---

## 🚀 Technology Stack

### Frontend

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (v4)
- **Routing**: TanStack Router (File-based routing)
- **HTTP Client**: Axios with Bearer token interceptor
- **Icons**: Lucide React
- **Typography**: Google Fonts (`Playfair Display` for editorial serif titles & `Inter` for clean UI controls)

### Backend

- **Framework**: Laravel 13 on PHP 8.5+
- **Database**: MySQL / MariaDB (relational schema with foreign keys and composite indexes)
- **Authentication**: Laravel Sanctum (Bearer token authentication)
- **Validation**: Laravel Form Requests
- **File Storage**: Laravel Filesystem with public storage symlink
- **Architecture**: Conventional MVC REST API (Routes -> Form Requests -> Controllers -> Eloquent Models -> MySQL)

---

## 📂 Project Structure

```
Rosui_Ghor/
├── backend/                  # Laravel REST API Application
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/Api/ # Auth, Recipe, Category, User, Stats controllers
│   │   │   ├── Middleware/      # EnsureAdmin role middleware
│   │   │   └── Requests/        # Form Request validation classes
│   │   └── Models/              # User, Category, Recipe, RecipeInteraction
│   ├── config/                  # CORS, Sanctum, Database configuration
│   ├── database/
│   │   ├── migrations/          # Schema migrations for MySQL
│   │   └── seeders/             # User, Category, and Recipe seeders
│   ├── routes/
│   │   └── api.php              # REST API route definitions
│   └── storage/                 # Uploaded recipe image disk storage
├── docs/                     # Full Project Specifications & Reports
│   ├── Requirements Architecture Document.md
│   ├── Functional Specification Document.md
│   ├── Database Architecture Document.md
│   ├── Product Requirements Document.md
│   ├── Design Document.md
│   ├── Tech Stack Document.md
│   ├── frontend-completion-audit.md
│   ├── frontend-validation-report.md
│   ├── backend-integration-audit.md
│   ├── backend-validation-report.md
│   └── api-documentation.md
├── src/                      # React 19 Frontend Application
│   ├── components/           # UI components (auth, recipe, admin, user, common)
│   ├── context/              # AuthContext for session management
│   ├── routes/               # 11 TanStack Router route views
│   ├── services/             # Axios API client and service layer
│   └── types/                # TypeScript interface definitions
├── package.json              # Frontend dependencies
├── vite.config.ts            # Vite configuration
└── README.md                 # Project documentation
```

---

## 🛠️ Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v18+ or v20+) and **npm**
- **PHP** (v8.3 or v8.5+)
- **Composer** (v2.x)
- **MySQL / MariaDB** (running on `127.0.0.1:3306`)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Aqib2607/Rosui_Ghor.git
cd Rosui_Ghor
```

### 2. Frontend Setup

Install frontend npm packages and prepare `.env`:

```bash
# Install frontend packages
npm install

# Create frontend .env file
cp .env.example .env
```

Ensure your root `.env` points to the Laravel API:

```env
VITE_API_URL=http://localhost:8000/api
```

---

### 3. Backend Setup

Navigate into the `backend/` directory and configure environment:

```bash
cd backend

# Install PHP dependencies
composer install

# Create backend .env file
cp .env.example .env

# Generate application encryption key
php artisan key:generate
```

Configure your MySQL connection in `backend/.env`:

```env
APP_NAME="Rosui Ghor"
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=rosui_ghor
DB_USERNAME=root
DB_PASSWORD=
```

---

### 4. Database Setup & Seeders

Create the MySQL database `rosui_ghor` if it doesn't already exist, then run migrations and seeders:

```bash
# In backend/ directory:
php artisan migrate:fresh --seed
```

This creates:

- `users` table (with roles `user` and `admin`)
- `categories` table (Breakfast, Lunch, Dinner, Snacks)
- `recipes` table (12 seeded recipes with full cooking instructions and ingredients)
- `recipe_interactions` table (Favorites)
- `personal_access_tokens` table (Sanctum)

---

### 5. Storage Symlink for Recipe Images

To enable public access for uploaded recipe images:

```bash
# In backend/ directory:
php artisan storage:link
```

---

## 🚦 Running Locally

### Start the Laravel Backend API

In one terminal window, run:

```bash
cd backend
php artisan serve --port=8000
```

Backend API will be accessible at `http://127.0.0.1:8000/api`.

### Start the React Frontend

In a second terminal window, run:

```bash
# From workspace root:
npm run dev
```

Frontend application will be accessible at `http://localhost:8080/` (or `http://localhost:5173/`).

---

## 👥 Demo User Accounts

| Role | Email | Password | Access Capabilities |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@rosuighor.test` | `password` | Admin Dashboard, Metric Statistics, Recipe Creation/Editing/Deletion, Category Management, Relational Deletion Guard. |
| **Standard User** | `user@rosuighor.test` | `password` | Recipe Discovery, Protected Recipe Details, Favorite Toggling, Profile Management. |
| **Guest Visitor** | *Unauthenticated* | — | Homepage, Recipe Browsing, Title Search, Category Filters, Login, Registration. |

*Quick login demo buttons are available on the `/login` page to populate these credentials instantly.*

---

## 📖 API Documentation

For the complete REST API endpoint reference, request bodies, query parameters, status codes, and JSON responses, see [`docs/api-documentation.md`](docs/api-documentation.md).

---

## 🧪 Quality & Validation Reports

- **Frontend UI/UX Completion Audit**: [`docs/frontend-completion-audit.md`](docs/frontend-completion-audit.md)
- **Frontend Validation Report**: [`docs/frontend-validation-report.md`](docs/frontend-validation-report.md)
- **Backend & API Integration Audit**: [`docs/backend-integration-audit.md`](docs/backend-integration-audit.md)
- **Backend Validation Report**: [`docs/backend-validation-report.md`](docs/backend-validation-report.md)

---

## 📜 License

This course project is developed for educational purposes under the MIT License.
