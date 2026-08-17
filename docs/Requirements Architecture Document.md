# Requirements Architecture Document

**Project**: Rosui Ghor

- **Document Version**: 1.0
- **Project Type**: University Course Project
- **Architecture Scope**: Simple Single Vendor Web Application
- **Frontend**: React + TypeScript
- **Backend**: Laravel
- **Database**: MySQL
- **Authentication**: Laravel Sanctum, where required
- **UI Framework**: Tailwind CSS

---

## 1. System Overview

Rosui Ghor is a simple single-vendor recipe management and browsing website based on the core recipe functionality of the original Shaad application.

The original Shaad application provides recipe browsing, category filtering, recipe search, recipe details, user access control, and an admin content management panel.

Rosui Ghor removes the subscription, telecom verification, payment, SMS, AI, and external service requirements from the original application.

The system will contain three practical access states:

1. Guest
2. Authenticated User
3. Administrator

The application will use:

```text
React + TypeScript
        ↓
     REST API
        ↓
      Laravel
        ↓
       MySQL
```

The project is intentionally designed for fewer than 50 users and does not require production-level scalability, infrastructure, monitoring, real-time processing, or complex enterprise functionality.

---

## 2. Project Objectives

### 2.1 Primary Objective

Build a functional recipe website that demonstrates:

- Frontend development with React and TypeScript
- Responsive UI development with Tailwind CSS
- REST API development with Laravel
- MySQL database management
- User authentication
- Role-based access
- CRUD operations
- Search and filtering
- User-specific database records
- Admin dashboard functionality

### 2.2 Academic Objective

The system should provide enough functionality to demonstrate practical understanding of:

- Full-stack web development
- Client-server architecture
- API integration
- Authentication and authorization
- Relational database design
- CRUD operations
- Responsive web design

The system does not need enterprise-level architecture.

---

## 3. Scope Definition

### 3.1 Included

The project includes:

- User registration
- User login
- User logout
- Role-based access
- Recipe browsing
- Recipe search
- Recipe category filtering
- Recipe details
- User-specific recipe interactions
- Basic user profile
- Category management
- Recipe management
- Image URL support
- Image upload support
- Basic admin dashboard
- Basic administrative statistics
- Responsive design

### 3.2 Explicitly Excluded

The following features are outside the project scope:

- Subscription system
- Payment gateway
- Billing
- OTP
- Robi/Airtel verification
- AppsPro
- bdapps
- SMS system
- AI chatbot
- AI recommendations
- Real-time communication
- Notifications
- Multi-vendor functionality
- Multi-tenant architecture
- Hardware integration
- Advanced analytics
- Enterprise audit system
- Complex compliance system
- Microservices
- Distributed architecture

The original Shaad documentation identifies subscription, AppsPro/bdapps, SMS, and future AI functionality as separate capabilities. These are intentionally excluded from Rosui Ghor.

---

## 4. User Roles

### 4.1 Guest

A guest is an unauthenticated visitor.

Permissions:

- View homepage
- View recipe cards
- View recipe title
- View recipe image
- View category
- View cooking time
- View difficulty
- Search recipes
- Filter recipes
- Attempt to access recipe details
- Redirect to login when accessing protected recipe details
- Access login
- Access registration

Guests cannot:

- View protected recipe details
- Create user-specific records
- Manage recipes
- Manage categories
- Access the admin dashboard

---

### 4.2 Authenticated User

A registered and authenticated user can:

- Browse recipes
- Search recipes
- Filter recipes
- View complete recipe details
- View ingredients
- View cooking instructions
- Perform supported recipe interactions
- Store user-specific interaction data
- View their own profile
- Update basic profile information
- Logout

All user-specific recipe-related records must contain the authenticated user's ID.

---

### 4.3 Administrator

The administrator can:

- Login through the same authentication system
- Access the admin dashboard after authentication
- View basic statistics
- Create recipes
- Read recipes
- Update recipes
- Delete recipes
- Create categories
- Read categories
- Update categories
- Delete categories
- Upload recipe images
- Provide external recipe image URLs
- Manage content relationships between categories and recipes

There is no need for multiple administrator permission levels.

---

## 5. Authentication Architecture

The system will use one login system.

```text
                    Login
                      │
                      ↓
              Laravel Authentication
                      │
             ┌────────┴────────┐
             ↓                 ↓
          User Role         Admin Role
             ↓                 ↓
       User Interface     Admin Dashboard
```

The login form does not need separate user and admin login pages.

After successful authentication, Laravel determines the user's role.

```text
role = user
    ↓
User application

role = admin
    ↓
Admin dashboard
```

Laravel Sanctum can be used for authentication between React and Laravel.

Authentication must protect:

- Recipe detail endpoint
- User profile endpoints
- User-specific interaction endpoints
- Admin endpoints

---

## 6. Core Modules

The system will contain the following modules.

### 6.1 Authentication Module

Responsibilities:

- Registration
- Login
- Logout
- Authentication state
- Role identification
- Protected routes
- Unauthorized access handling

---

### 6.2 User Module

Responsibilities:

- User profile
- Basic profile information
- User-specific records
- Logout

User information should remain minimal.

Recommended fields:

- Name
- Email
- Password
- Role

---

### 6.3 Recipe Module

Responsibilities:

- Recipe listing
- Recipe search
- Recipe filtering
- Recipe details
- Recipe creation
- Recipe editing
- Recipe deletion
- Recipe image handling
- Recipe-category relationship

The original Shaad recipe structure includes title, category, ingredients, steps, image URL, cooking time, difficulty, and premium status. Rosui Ghor keeps the useful recipe fields and removes premium status.

---

### 6.4 Category Module

Responsibilities:

- Category listing
- Category creation
- Category editing
- Category deletion
- Recipe-category association

Initial categories may include:

- Breakfast
- Lunch
- Dinner
- Snacks

However, these are not hard-coded.

The administrator can CRUD categories.

---

### 6.5 User Recipe Interaction Module

Authenticated users can perform the selected recipe interactions.

The exact interaction records must be associated with:

```text
authenticated_user_id
recipe_id
```

This ensures that user-specific activity belongs to the correct account.

The system does not need a generalized event-tracking system.

---

### 6.6 Admin Dashboard Module

The dashboard should remain intentionally simple.

Recommended statistics:

```text
Total Users
Total Recipes
Total Categories
```

Optional:

```text
Recent Recipes
Recipes by Category
```

No advanced charts or analytics are required.

---

## 7. Functional Requirements

### FR-001 User Registration

The system shall allow a visitor to create an account using:

- Name
- Email
- Password
- Password confirmation

The system shall validate the submitted information before creating the account.

---

### FR-002 User Login

The system shall allow registered users and administrators to log in through the same login interface.

The system shall authenticate credentials and determine the user's role.

---

### FR-003 User Logout

Authenticated users shall be able to logout.

Logout shall invalidate the authenticated session/token according to the selected Laravel authentication implementation.

---

### FR-004 Recipe Browsing

The system shall display recipe cards.

Recipe cards should contain basic information such as:

- Recipe image
- Recipe title
- Category
- Cooking time
- Difficulty

---

### FR-005 Protected Recipe Details

Recipe details shall require authentication.

Guest behavior:

```text
Recipe Card
     ↓
View Recipe
     ↓
Login Required
```

Authenticated behavior:

```text
Recipe Card
     ↓
View Recipe
     ↓
Complete Recipe Details
```

Complete details include:

- Recipe title
- Description
- Image
- Category
- Ingredients
- Cooking time
- Difficulty
- Cooking instructions

---

### FR-006 Recipe Search

Users shall be able to search recipes by recipe title.

The search should be simple and database-backed.

No external search engine is required.

---

### FR-007 Category Filtering

Users shall be able to filter recipes by category.

Example:

```text
All
Breakfast
Lunch
Dinner
Snacks
```

Categories must come from the database.

---

### FR-008 Recipe Creation

Administrators shall be able to create recipes.

Required recipe information should include:

- Title
- Description
- Category
- Ingredients
- Cooking time
- Difficulty
- Instructions

Image:

- External URL, or
- Uploaded image

---

### FR-009 Recipe Editing

Administrators shall be able to edit existing recipes.

---

### FR-010 Recipe Deletion

Administrators shall be able to permanently delete recipes.

No soft-delete system is required.

---

### FR-011 Category Creation

Administrators shall be able to create categories.

---

### FR-012 Category Editing

Administrators shall be able to edit categories.

---

### FR-013 Category Deletion

Administrators shall be able to delete categories.

If recipes are associated with a category, the administrator must handle the associated recipes before the category can be removed.

The application should provide a clear response explaining why deletion cannot proceed when dependent recipes exist.

---

### FR-014 Image Handling

The administrator shall have two options:

```text
Option 1
External Image URL

Option 2
Upload Image
```

The selected image reference must be associated with the recipe.

The system should store the appropriate image path or URL in the recipe record.

---

### FR-015 User Profile

Authenticated users shall have a basic profile page.

The profile should contain:

- Name
- Email
- Logout

Users should be able to update basic profile information.

No subscription, billing, notification, or advanced security settings are required.

---

### FR-016 Admin Dashboard

The administrator shall have access to a basic dashboard showing:

- Total users
- Total recipes
- Total categories

The dashboard should also provide navigation to:

- Recipes
- Categories
- Users, if needed for basic viewing

---

## 8. Reporting Requirements

Reporting is intentionally limited.

### Required Dashboard Statistics

The administrator should see:

```text
Users
Recipes
Categories
```

These values should come directly from the database.

No reporting engine is required.

No PDF reporting is required.

No Excel reporting is required.

No advanced graphical analytics are required.

---

## 9. Business Rules

### BR-001

Only authenticated users can access complete recipe details.

### BR-002

Guests can browse basic recipe information.

### BR-003

Only administrators can create recipes.

### BR-004

Only administrators can edit recipes.

### BR-005

Only administrators can delete recipes.

### BR-006

Only administrators can manage categories.

### BR-007

A user-specific recipe interaction must reference the authenticated user's ID.

### BR-008

A recipe must belong to a valid category.

### BR-009

An administrator cannot delete a category while recipes depend on that category unless the administrator first resolves the relationship.

### BR-010

Deleted recipes are permanently removed.

### BR-011

Deleted categories are permanently removed after their dependent recipe relationships are handled.

### BR-012

The application is single-vendor.

There is no vendor registration or vendor management system.

---

## 10. Navigation Architecture

### Guest Navigation

```text
Home
├── Recipes
├── Categories
├── Login
└── Register
```

Attempting to access recipe details:

```text
Recipe Details
      ↓
Authentication Check
      ↓
Login if unauthenticated
```

---

### User Navigation

```text
Home
├── Recipes
│    ├── Search
│    ├── Filter
│    └── Recipe Details
├── Profile
└── Logout
```

---

### Admin Navigation

```text
Admin Dashboard
├── Statistics
├── Recipes
│    ├── View
│    ├── Add
│    ├── Edit
│    └── Delete
├── Categories
│    ├── View
│    ├── Add
│    ├── Edit
│    └── Delete
└── Logout
```

---

## 11. Module and Reporting Separation

### Functional Modules

| Module            | Main Function                   |
| ----------------- | ------------------------------- |
| Authentication    | Login, registration, logout     |
| Users             | Profile and user data           |
| Recipes           | Recipe browsing and management  |
| Categories        | Category management             |
| User Interactions | User-specific recipe activity   |
| Admin Dashboard   | Basic administrative statistics |

### Reporting

| Report/Statistic    | Audience        |
| ------------------- | --------------- |
| Total Users         | Admin           |
| Total Recipes       | Admin           |
| Total Categories    | Admin           |
| Recent Recipes      | Admin, optional |
| Recipes by Category | Admin, optional |

No separate reporting module is necessary.

---

## 12. Integration Matrix

| Integration                |                           Required | Purpose                   |
| -------------------------- | ---------------------------------: | ------------------------- |
| React ↔ Laravel API        |                                Yes | Application communication |
| Laravel ↔ MySQL            |                                Yes | Data persistence          |
| Laravel Sanctum            | Yes, if required by implementation | Authentication            |
| External image URL         |                           Optional | Recipe images             |
| Local/server image storage |                           Optional | Uploaded recipe images    |
| Payment API                |                                 No | Excluded                  |
| SMS API                    |                                 No | Excluded                  |
| AI API                     |                                 No | Excluded                  |
| AppsPro                    |                                 No | Excluded                  |
| bdapps                     |                                 No | Excluded                  |
| WebSocket                  |                                 No | Excluded                  |

---

## 13. Non-Functional Requirements

### NFR-001 Responsiveness

The application must be responsive across:

- Mobile phones
- Tablets
- Laptops
- Desktop monitors
- Large desktop screens

The layout must remain usable when browser zoom changes.

The frontend must avoid fixed-width layouts that break when the viewport is enlarged or reduced.

---

### NFR-002 UI Framework

Tailwind CSS will be used for responsive styling.

Responsive behavior should use appropriate viewport breakpoints and flexible layout techniques.

---

### NFR-003 Performance

The system only targets fewer than 50 users.

Therefore:

- No caching infrastructure is required.
- No Redis is required.
- No load balancing is required.
- No CDN architecture is required.
- No database partitioning is required.
- No horizontal scaling is required.

---

### NFR-004 Maintainability

The frontend and backend should remain logically separated.

```text
React
  ↓
API
  ↓
Laravel
  ↓
MySQL
```

The frontend should not directly access MySQL.

---

### NFR-005 Usability

The interface should provide:

- Clear navigation
- Clear authentication states
- Readable recipe information
- Simple forms
- Clear validation messages
- Clear success/error feedback

---

## 14. Security Requirements

Security is limited to reasonable university-project requirements.

### Authentication

- Passwords must be securely hashed.
- Protected API endpoints must require authentication.
- Admin endpoints must require administrator authorization.

### Authorization

The frontend should hide unauthorized UI elements, but Laravel must enforce authorization on the server.

Example:

```text
User attempts:
DELETE /api/recipes/5

Laravel:
Check authentication
        ↓
Check role
        ↓
Admin?
   ├── Yes → Delete
   └── No  → 403 Forbidden
```

### Input Validation

Laravel should validate:

- Registration data
- Login data
- Recipe data
- Category data
- Profile updates
- Image uploads

### Image Upload

Uploaded files should be validated for:

- File type
- File size
- Valid image format

---

## 15. Data Ownership

User-specific records must reference the authenticated user.

Conceptually:

```text
User
  │
  └── user_id
         │
         ↓
   User Interaction
         │
         └── recipe_id
                │
                ↓
              Recipe
```

This prevents user-specific records from becoming detached from their owner.

---

## 16. Scalability Strategy

No advanced scalability architecture is required.

Target:

```text
< 50 users
```

Recommended architecture:

```text
Single React application
        ↓
Single Laravel application
        ↓
Single MySQL database
```

This is sufficient for the project.

Do not introduce:

- Microservices
- Message queues
- Kubernetes
- Docker orchestration
- Distributed databases
- Event-driven architecture
- Complex caching layers

---

## 17. Operational Workflow

### User

```text
Register
   ↓
Login
   ↓
Browse Recipes
   ↓
Search / Filter
   ↓
Open Recipe
   ↓
View Complete Details
   ↓
Perform Supported Interaction
```

### Admin

```text
Login
   ↓
Dashboard
   ↓
Create Category
   ↓
Create Recipe
   ↓
Recipe Available to Users
   ↓
Edit / Delete When Necessary
```

---

## 18. Developer Deliverables

The implementation should produce:

### Frontend

- React + TypeScript application
- Responsive Tailwind UI
- Authentication pages
- Recipe pages
- User profile
- Admin dashboard
- Admin CRUD interfaces

#### Backend

- Laravel application
- Authentication
- API routes
- Controllers
- Models
- Validation
- Authorization
- Image handling

#### Database

- Users table
- Categories table
- Recipes table
- User-specific interaction table or tables required by the selected interaction features

#### Documentation

The project documentation will consist of:

1. Requirements Architecture Document
2. Functional Specification Document
3. Database Architecture Document
4. Product Requirements Document
5. Design Document
6. Tech Stack Document

This ordering follows the project architecture requirement that requirements must exist before the PRD, and database architecture must exist before the Tech Stack Document.

---

## 19. Phased Architecture

### Phase 1: Foundation

- React project setup
- Laravel project setup
- MySQL setup
- API communication
- Tailwind setup
- Basic authentication structure

### Phase 2: MVP

- Registration
- Login
- Logout
- Role handling
- Recipe listing
- Recipe details
- Categories
- Recipe CRUD
- Category CRUD

### Phase 3: Feature Expansion

- Recipe search
- Category filtering
- User-specific recipe interactions
- Image upload
- External image URL
- User profile
- Admin statistics

### Phase 4: Security Hardening

Only basic project-level security:

- Validation
- Authorization
- Authentication protection
- Upload validation
- Error handling

### Phase 5: Scalability and Automation

Not required for this project.

The phase exists only as an architectural boundary. No implementation is planned.

### Phase 6: Launch and Monitoring

For the university project:

- Local testing
- Basic deployment if required
- Final demonstration
- Basic error verification

No production monitoring infrastructure is required.

---

## 20. Final Scope Boundary

Rosui Ghor should remain a simple full-stack university project.

The final architecture is:

```text
                         ROSUI GHOR
                             │
              ┌──────────────┴──────────────┐
              │                             │
            Guest                     Authenticated
              │                             │
       Browse Recipes              User / Admin Role
       Search Recipes                     │
       Filter Recipes              ┌───────┴───────┐
              │                     │               │
       Login Required             User            Admin
              │                     │               │
              ↓                     │          Dashboard
        Recipe Details              │          Recipe CRUD
                                    │          Category CRUD
                                    │          Statistics
                                    │
                                    ↓
                              User Interactions
                                    │
                                    ↓
                              Laravel REST API
                                    │
                                    ↓
                                  MySQL
```

The architecture deliberately avoids the subscription and external-service architecture of the original Shaad application. The original documentation describes those systems as part of the mobile product, while Rosui Ghor only retains the recipe, authentication, category, and administrative content-management concepts needed for this project.
