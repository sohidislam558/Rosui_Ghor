# Rosui Ghor Tech Stack Document

- **Document Version**: 1.0
- **Project Type**: University Course Project
- **Application Type**: Single Vendor Recipe Web Application

---

## 1. Technology Overview

Rosui Ghor will use a straightforward full-stack web architecture.

```text
React + TypeScript + Tailwind CSS
              ↓
          REST API
              ↓
        Laravel Backend
              ↓
          MySQL
```

The technology choices prioritize:

- Simplicity
- Ease of development
- Easy debugging
- University-level learning
- Clear separation between frontend and backend
- Minimal dependencies
- Responsive design

The project does not require production-scale infrastructure.

---

## 2. Frontend Stack

### 2.1 React

React will be used as the primary frontend framework.

Purpose:

- Build reusable UI components
- Manage application views
- Render recipe data
- Build authentication interfaces
- Build admin interfaces
- Handle user interactions

React is appropriate because the project contains multiple interactive views without requiring a large frontend framework.

---

## 3. TypeScript

TypeScript will be used instead of plain JavaScript.

Purpose:

- Type API responses
- Type component props
- Type form data
- Reduce common runtime errors
- Improve development experience

Recommended structure:

```text
src/
├── components/
├── pages/
├── layouts/
├── hooks/
├── services/
├── types/
├── context/
└── utils/
```

The structure should remain simple.

Do not introduce unnecessary architectural layers.

---

## 4. Vite

Vite will be used as the frontend build tool.

Purpose:

- Development server
- TypeScript support
- Production build
- Fast development workflow

Recommended project setup:

```text
React
+
TypeScript
+
Vite
```

No Next.js or other meta-framework is required.

---

## 5. Tailwind CSS

Tailwind CSS will be used for styling.

Reasons:

- Fast UI development
- Responsive utilities
- Consistent spacing
- Easy component styling
- Suitable for the project's responsive requirements

The uploaded AI Website Building Guide identifies Tailwind CSS as a suitable styling solution for modern web projects where responsive utility-based styling is useful.

---

## 6. Frontend Routing

### React Router

React Router should be used for client-side navigation.

Required route groups:

```text
Public
├── /
├── /login
└── /register

User
├── /recipes
├── /recipes/:id
└── /profile

Admin
├── /admin
├── /admin/recipes
├── /admin/recipes/create
├── /admin/recipes/:id/edit
└── /admin/categories
```

Protected routes should redirect unauthenticated users appropriately.

---

## 7. HTTP Client

### Axios

Axios can be used for communication between React and Laravel.

Purpose:

- GET requests
- POST requests
- PUT/PATCH requests
- DELETE requests
- Authentication handling
- Error handling

Example architecture:

```text
React Component
      ↓
API Service
      ↓
Axios
      ↓
Laravel API
```

Keep API calls outside large UI components where practical.

---

## 8. State Management

The application does not require Redux.

Recommended approach:

- React Context for authentication state
- Local component state for page-specific state
- React hooks for reusable behavior

Possible authentication context:

```text
AuthContext
├── user
├── isAuthenticated
├── role
├── login()
├── logout()
└── register()
```

Recipe search and filter state can remain local to the recipe listing page.

No global state library is required unless implementation complexity later justifies one.

---

## 9. Form Handling

For this project, standard React controlled forms are sufficient.

The application does not require a dedicated form-management library.

Forms include:

- Login
- Registration
- Profile
- Recipe creation
- Recipe editing
- Category creation
- Category editing

If implementation becomes repetitive, React Hook Form may be introduced, but it is not a required dependency.

---

## 10. Frontend Validation

Basic client-side validation should be implemented for immediate feedback.

Examples:

```text
Email
Password
Required fields
URL format
Image selection
Cooking time
```

However, client-side validation does not replace backend validation.

Laravel remains responsible for authoritative validation.

---

## 11. Icon Library

### Lucide React

Lucide React is recommended for interface icons.

Use it for:

- Search
- Menu
- User
- Clock
- Edit
- Delete
- Plus
- Logout
- Chevron
- Filter

Use a single icon system throughout the application.

---

## 12. Animation

Animation is optional.

Tailwind CSS transitions should handle most interactions.

Use simple transitions for:

- Button hover
- Recipe card hover
- Navigation
- Modal
- Mobile menu

Framer Motion is not required.

The project should not introduce a large animation dependency simply for visual effects.

---

## 13. Backend Stack

### Laravel

Laravel will provide the backend application and REST API.

Responsibilities:

- Authentication
- Authorization
- API routing
- Validation
- Business logic
- Database communication
- Image upload handling
- Recipe CRUD
- Category CRUD
- User profile management
- Dashboard statistics

Laravel is suitable for the project's relational data model and CRUD-heavy backend.

---

## 14. PHP

Laravel will use PHP.

The exact PHP version should follow the Laravel version selected during implementation.

The project should use a currently supported Laravel/PHP combination rather than mixing unsupported versions.

---

## 15. API Architecture

The backend will expose REST-style endpoints.

Conceptual structure:

```text
/api
│
├── Authentication
│
├── Recipes
│
├── Categories
│
├── User
│
├── User Interactions
│
└── Admin Statistics
```

The API should return JSON responses.

---

## 16. Authentication

### Laravel Sanctum

Laravel Sanctum is recommended for authentication between React and Laravel.

Purpose:

- Authenticate frontend users
- Protect API endpoints
- Identify authenticated users
- Support role-based authorization

Authentication flow:

```text
React
  ↓
Login Request
  ↓
Laravel
  ↓
Validate Credentials
  ↓
Authenticate User
  ↓
React receives authentication state
```

Protected requests must include the appropriate authentication credentials according to the Sanctum setup.

---

## 17. Authorization

Authorization will be role-based.

Roles:

```text
user
admin
```

Laravel must enforce administrative permissions.

Example:

```text
POST /api/recipes

Authenticated?
   ↓
Yes
   ↓
Admin?
   ├── Yes → Create Recipe
   └── No  → 403
```

The frontend must never be treated as the final security layer.

---

## 18. Database

### MySQL

MySQL will be the primary relational database.

Reasons:

- Simple relational structure
- Excellent Laravel integration
- Suitable for CRUD applications
- Easy local development
- Appropriate for fewer than 50 users
- Easy to demonstrate academically

---

## 19. Database Tables

The core database contains:

```text
users
categories
recipes
recipe_interactions
```

No separate vendor or tenant tables are required.

---

## 20. Database Relationships

```text
users
  │
  │ 1:N
  ↓
recipe_interactions
  ↑
  │ N:1
  │
recipes
  ↑
  │ N:1
  │
categories
```

This structure directly supports the requirements.

---

## 21. Laravel ORM

### Eloquent ORM

Laravel Eloquent should be used for database interaction.

Recommended models:

```text
User
Category
Recipe
RecipeInteraction
```

Example relationships:

```text
User
  hasMany RecipeInteraction

Category
  hasMany Recipe

Recipe
  belongsTo Category
  hasMany RecipeInteraction

RecipeInteraction
  belongsTo User
  belongsTo Recipe
```

---

## 22. Database Migrations

Laravel migrations should define the database schema.

Migration order:

```text
1. users
2. categories
3. recipes
4. recipe_interactions
```

Foreign keys must be defined through migrations.

---

## 23. Database Seeders

Laravel seeders should provide development data.

Initial categories:

```text
Breakfast
Lunch
Dinner
Snacks
```

A development administrator account should also be seeded.

Sample recipes may be included to make the project immediately demonstrable after database setup.

---

## 24. Recipe Image Storage

The system supports:

1. External image URL
2. Uploaded image

### External URL

Stored in:

```text
recipes.image_url
```

#### Uploaded Image

Stored using Laravel's file storage system.

The database stores:

```text
recipes.image_path
```

The actual binary image should not be stored directly in MySQL.

---

## 25. File Storage

Laravel's filesystem should be used for uploaded recipe images.

Conceptual structure:

```text
storage/
└── app/
    └── public/
        └── recipes/
```

The public storage link should be configured according to Laravel's standard filesystem approach.

---

## 26. Image Validation

Laravel must validate uploaded images.

Validation should include:

- Valid image type
- Allowed extensions
- Maximum file size
- Valid upload request

The application should reject unsupported files.

---

## 27. Search Implementation

Recipe search will use MySQL queries through Laravel.

Minimum search:

```text
recipes.title
```

Conceptual query:

```text
title LIKE "%search%"
```

For the expected project scale, this is sufficient.

No:

- Elasticsearch
- Algolia
- Meilisearch

is required.

---

## 28. Category Filtering

Category filtering uses:

```text
recipes.category_id
```

Laravel should query recipes based on the selected category.

The category relationship should be handled through Eloquent.

---

## 29. Pagination

Laravel pagination can be used for recipe listings.

Recommended:

```text
12 recipes per page
```

Pagination is useful even though the expected dataset is small.

It also keeps the frontend implementation clean.

---

## 30. API Response Structure

API responses should follow a consistent JSON structure.

Successful response example:

```json
{
  "data": {}
}
```

Collection example:

```json
{
  "data": [],
  "meta": {}
}
```

Validation errors should return structured field-level errors.

The exact response structure should remain consistent throughout the application.

---

## 31. Error Handling

Laravel should return appropriate HTTP status codes.

Recommended:

```text
200  Successful request
201  Resource created
401  Unauthenticated
403  Unauthorized
404  Resource not found
422  Validation error
500  Server error
```

React should translate these responses into usable UI feedback.

---

## 32. API Service Organization

Frontend API communication should be separated into services.

Recommended:

```text
src/services/
├── authService.ts
├── recipeService.ts
├── categoryService.ts
├── userService.ts
└── interactionService.ts
```

This keeps API logic out of visual components.

---

## 33. Frontend Type Definitions

TypeScript interfaces should represent backend data.

Recommended types:

```text
User
Category
Recipe
RecipeInteraction
AuthResponse
ApiError
Pagination
```

Example conceptual recipe type:

```text
Recipe
├── id
├── category_id
├── title
├── description
├── image_url
├── image_path
├── ingredients
├── cooking_time
├── difficulty
├── instructions
├── created_at
└── updated_at
```

---

## 34. Environment Configuration

Frontend environment variables should contain only non-sensitive public configuration.

Example:

```text
VITE_API_URL=...
```

Backend environment variables should contain:

```text
APP_ENV=...
APP_KEY=...
APP_URL=...

DB_CONNECTION=mysql
DB_HOST=...
DB_PORT=...
DB_DATABASE=...
DB_USERNAME=...
DB_PASSWORD=...
```

Sensitive credentials must remain in backend environment configuration.

---

## 35. Secret Management

Never place:

- Database passwords
- Application secrets
- Authentication secrets
- Private API credentials

inside React source code.

Never commit `.env` files containing real credentials.

Use `.env.example` for documenting required configuration keys.

---

## 36. Development Environment

Recommended development tools:

```text
VS Code
Git
GitHub
Node.js
npm
PHP
Composer
Laravel
MySQL
Postman
```

For local MySQL development, XAMPP can be used if preferred.

---

## 37. Package Management

### Frontend

Use:

```text
npm
```

### Backend

Use:

```text
Composer
```

Dependencies should be kept minimal.

Do not install packages without a specific project requirement.

---

## 38. Recommended Frontend Dependencies

Core:

```text
react
react-dom
react-router-dom
axios
```

Styling:

```text
tailwindcss
```

Icons:

```text
lucide-react
```

Development/build:

```text
vite
typescript
```

No additional library should be added unless it provides a clear benefit.

---

## 39. Recommended Backend Dependencies

Laravel's standard ecosystem should provide most requirements.

Primary components:

```text
Laravel
Laravel Sanctum
Laravel Eloquent
Laravel Validation
Laravel Filesystem
```

No external backend framework is required.

---

## 40. Development Workflow

Recommended workflow:

```text
1. Install dependencies
2. Configure environment
3. Create database
4. Run migrations
5. Run seeders
6. Start Laravel server
7. Start React development server
8. Test API
9. Test frontend
10. Test complete workflows
```

---

## 41. Local Development Architecture

```text
Browser
   │
   ├──────────────→ React Dev Server
   │                    │
   │                    │ API
   │                    ↓
   └──────────────→ Laravel
                        │
                        ↓
                      MySQL
```

The React application should never communicate directly with MySQL.

---

## 42. Production/Deployment Scope

The project does not require a complex production architecture.

If deployment is required, a simple deployment can be used:

```text
React Frontend
      ↓
Static/Web Hosting

Laravel Backend
      ↓
PHP Hosting

MySQL
      ↓
Managed or Hosted MySQL
```

The exact hosting provider is not part of the current functional requirements.

---

## 43. SEO

SEO is not a major project requirement because Rosui Ghor is primarily an academic full-stack application.

Basic practices are sufficient:

- Meaningful page titles
- Semantic HTML
- Descriptive image alt text
- Clean URLs

No advanced SEO infrastructure is required.

---

## 44. Performance Strategy

The application should use simple performance practices:

- Responsive images
- Lazy loading where useful
- Pagination
- Avoid unnecessary API requests
- Efficient database queries
- Component reuse
- Avoid unnecessary global state

No:

- Redis
- CDN architecture
- Server-side rendering
- Edge computing
- Load balancing

is required.

---

## 45. Responsive Implementation

Tailwind CSS responsive utilities should be used.

The frontend must support:

```text
Mobile
Tablet
Laptop
Desktop
Large Desktop
```

The implementation should use:

- CSS Grid
- Flexbox
- max-width containers
- responsive padding
- responsive typography
- flexible images
- responsive navigation

---

## 46. Browser Zoom Compatibility

The UI must remain usable under browser zoom changes.

Technical practices:

- Avoid fixed-width main containers
- Use relative and responsive sizing
- Allow text wrapping
- Avoid content positioned entirely with absolute coordinates
- Avoid fixed-height content sections
- Use responsive grids
- Allow tables to scroll on small screens

---

## 47. Security Architecture

Minimum security architecture:

```text
React
  ↓
Laravel Authentication
  ↓
Laravel Authorization
  ↓
Laravel Validation
  ↓
Eloquent
  ↓
MySQL
```

Security responsibilities:

| Layer                 | Responsibility                           |
| --------------------- | ---------------------------------------- |
| React                 | Basic UI validation and route experience |
| Laravel Auth          | Authentication                           |
| Laravel Authorization | Role enforcement                         |
| Laravel Validation    | Input validation                         |
| Laravel Filesystem    | Upload handling                          |
| MySQL                 | Data integrity                           |

---

## 48. CSRF and Authentication Considerations

If Laravel Sanctum is configured using its stateful SPA authentication approach, the frontend must follow Laravel's required CSRF and cookie/session workflow.

The final implementation should use one consistent Sanctum strategy.

Do not mix multiple authentication approaches unnecessarily.

---

## 49. Authorization Middleware

Recommended conceptual middleware:

```text
auth
```

for authenticated endpoints.

For administrative endpoints:

```text
auth
+
admin authorization
```

Example:

```text
/admin/recipes
/admin/categories
/admin/statistics
```

must require administrator access.

---

## 50. Validation Architecture

Validation must exist on the backend.

Example recipe validation:

```text
title
description
category_id
ingredients
cooking_time
difficulty
instructions
image
```

The backend should reject invalid values before database persistence.

---

## 51. Database Integrity

Use:

- Primary keys
- Foreign keys
- Unique constraints
- Required fields
- Indexes

Important constraints:

```text
users.email UNIQUE

categories.name UNIQUE

recipes.category_id → categories.id

recipe_interactions.user_id → users.id

recipe_interactions.recipe_id → recipes.id
```

---

## 52. Git Strategy

Git should be used throughout development.

Recommended repository structure:

```text
rosui-ghor/
├── frontend/
├── backend/
├── docs/
└── README.md
```

Recommended branch:

```text
main
```

For a small university project, additional branching is optional.

---

## 53. Commit Strategy

Use descriptive commits.

Examples:

```text
feat: add user authentication
feat: add recipe CRUD
feat: add category management
feat: add recipe search
feat: add admin dashboard
fix: resolve recipe image upload
style: improve responsive recipe cards
```

Avoid vague commits such as:

```text
update
changes
final
done
```

---

## 54. Testing Strategy

Testing should focus on the project's important workflows.

### Authentication

- Registration
- Login
- Logout
- Invalid credentials
- Role-based redirection

### Recipes

- Create
- Read
- Update
- Delete
- Search
- Category filtering
- Protected details

### Categories

- Create
- Read
- Update
- Delete
- Dependency handling

### User Interactions

- Create
- Read
- Update/toggle
- Ownership

### Responsive UI

Test:

- Mobile
- Tablet
- Desktop
- Browser zoom

---

## 55. API Testing

Postman or another API testing tool may be used during development.

Test:

```text
Authentication
Recipes
Categories
Users
Interactions
Admin Statistics
```

The goal is to verify backend behavior before relying entirely on the React interface.

---

## 56. Error Logging

For this project, standard Laravel development logging is sufficient.

No external observability platform is required.

No:

- ELK stack
- Datadog
- Sentry
- Prometheus
- Grafana

is required.

---

## 57. Monitoring

Production monitoring is outside the project scope.

For development:

- Laravel logs
- Browser console
- Network tab
- API responses
- MySQL errors

are sufficient.

---

## 58. Dependency Control

The project should avoid unnecessary dependencies.

Before adding a package, determine whether the requirement can be implemented using:

- React
- TypeScript
- Tailwind
- Laravel
- MySQL
- Native browser APIs

If yes, avoid adding another dependency.

---

## 59. Architecture Complexity Rules

The implementation must not introduce:

- Microservices
- Repository-service-controller over-abstraction
- Event buses
- Message queues
- Distributed systems
- Complex domain-driven architecture
- Multi-tenant infrastructure
- Vendor isolation
- Advanced caching

The application is intentionally a conventional full-stack web application.

---

## 60. Recommended Project Structure

### Frontend

```text
frontend/
├── src/
│   ├── components/
│   │   ├── common/
│   │   ├── recipe/
│   │   ├── auth/
│   │   └── admin/
│   │
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Recipes.tsx
│   │   ├── RecipeDetails.tsx
│   │   ├── Profile.tsx
│   │   └── admin/
│   │
│   ├── layouts/
│   │   ├── PublicLayout.tsx
│   │   ├── UserLayout.tsx
│   │   └── AdminLayout.tsx
│   │
│   ├── services/
│   │   ├── authService.ts
│   │   ├── recipeService.ts
│   │   ├── categoryService.ts
│   │   ├── userService.ts
│   │   └── interactionService.ts
│   │
│   ├── context/
│   │   └── AuthContext.tsx
│   │
│   ├── hooks/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
│
├── public/
├── package.json
└── vite.config.ts
```

---

## 61. Backend Project Structure

```text
backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   ├── Requests/
│   │   └── Middleware/
│   │
│   ├── Models/
│   │   ├── User.php
│   │   ├── Category.php
│   │   ├── Recipe.php
│   │   └── RecipeInteraction.php
│
├── database/
│   ├── migrations/
│   ├── seeders/
│   └── factories/
│
├── routes/
│   └── api.php
│
├── storage/
├── config/
├── resources/
├── .env
└── composer.json
```

Do not create additional architectural layers unless implementation complexity actually requires them.

---

## 62. Documentation Structure

The project documentation should be stored in:

```text
docs/
```

Recommended files:

```text
docs/
├── requirements-architecture.md
├── functional-specifications.md
├── database-architecture.md
├── prd.md
├── design-document.md
└── tech-stack.md
```

The uploaded AI Website Building Guide recommends separating the PRD, Design Document, and Tech Stack Document so AI development tools can reference each document independently.

---

## 63. Implementation Order

The recommended implementation sequence is:

### Phase 1

```text
Project Setup
↓
React + TypeScript
↓
Laravel
↓
MySQL
↓
Tailwind
```

### Phase 2

```text
Database
↓
Migrations
↓
Models
↓
Seeders
```

### Phase 3

```text
Authentication
↓
Sanctum
↓
Roles
↓
Protected Routes
```

### Phase 4

```text
Recipe CRUD
↓
Category CRUD
↓
Image Handling
```

### Phase 5

```text
Search
↓
Filtering
↓
User Interactions
↓
Profile
```

### Phase 6

```text
Admin Dashboard
↓
Statistics
↓
Responsive Refinement
↓
Testing
```

---

## 64. Deployment Philosophy

The project does not require a production-grade deployment architecture.

If deployed for demonstration:

```text
React Frontend
        ↓
Frontend Hosting

Laravel Backend
        ↓
PHP Hosting

MySQL
        ↓
Database Hosting
```

Environment-specific configuration should be used.

The frontend should point to the correct Laravel API URL through environment configuration.

---

## 65. What Not to Add

The following technologies should not be added without a specific requirement:

```text
Next.js
Redux
GraphQL
WebSockets
Redis
Docker
Kubernetes
Elasticsearch
MongoDB
Firebase
Supabase
AWS-specific infrastructure
Microservices
Message queues
AI APIs
Payment APIs
SMS APIs
```

The existing React, Laravel, and MySQL stack is sufficient.

---

## 66. Technology Decision Summary

| Area             | Selected Technology | Reason                         |
| ---------------- | ------------------- | ------------------------------ |
| Frontend         | React               | Component-based UI             |
| Language         | TypeScript          | Type safety                    |
| Build Tool       | Vite                | Simple and fast                |
| Styling          | Tailwind CSS        | Responsive UI                  |
| Routing          | React Router        | Client-side navigation         |
| HTTP             | Axios               | API communication              |
| Icons            | Lucide React        | Consistent icons               |
| Backend          | Laravel             | REST API and CRUD              |
| Backend Language | PHP                 | Laravel requirement            |
| Authentication   | Laravel Sanctum     | SPA/API authentication         |
| ORM              | Eloquent            | Laravel database access        |
| Database         | MySQL               | Relational data                |
| File Storage     | Laravel Filesystem  | Recipe uploads                 |
| API Format       | JSON                | Frontend/backend communication |
| API Testing      | Postman             | Development testing            |
| Version Control  | Git                 | Source management              |

---

## 67. Final Technology Architecture

```text
┌─────────────────────────────────────────────┐
│                USER BROWSER                 │
│                                             │
│       React + TypeScript + Tailwind         │
│                                             │
│  React Router    Axios    Auth Context      │
└──────────────────────┬──────────────────────┘
                       │
                       │ HTTPS / JSON API
                       ↓
┌─────────────────────────────────────────────┐
│              LARAVEL BACKEND                │
│                                             │
│  Routes                                     │
│  Controllers                                │
│  Validation                                 │
│  Sanctum Authentication                     │
│  Authorization                              │
│  Eloquent ORM                               │
│  Filesystem                                 │
└──────────────────────┬──────────────────────┘
                       │
                       ↓
┌─────────────────────────────────────────────┐
│                  MYSQL                      │
│                                             │
│  users                                      │
│  categories                                 │
│  recipes                                    │
│  recipe_interactions                        │
└─────────────────────────────────────────────┘
```

---

## 68. Final Technology Boundary

Rosui Ghor should remain a conventional three-layer web application:

```text
Presentation
     ↓
Application/API
     ↓
Database
```

The selected technology stack is sufficient for every requirement defined in the Requirements Architecture, Functional Specification, Database Architecture, PRD, and Design Document.

The project should prioritize completing the required functionality correctly rather than increasing architectural complexity.

---

## 69. Final Stack

```text
Frontend:
React
TypeScript
Vite
Tailwind CSS
React Router
Axios
Lucide React

Backend:
Laravel
PHP
Laravel Sanctum
Eloquent ORM

Database:
MySQL

Storage:
Laravel Filesystem

Development:
VS Code
Git
GitHub
Node.js
npm
Composer
Postman
XAMPP/MySQL where appropriate
```

This stack provides everything required to implement, demonstrate, and maintain the Rosui Ghor university project without introducing unnecessary production-level infrastructure.
