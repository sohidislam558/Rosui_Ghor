# Rosui Ghor Database Architecture Document

- **Document Version**: 1.0
- **Project Type**: University Course Project
- **Database**: MySQL
- **Backend**: Laravel
- **Architecture**: Simple Single Vendor

---

## 1. Database Architecture Overview

The Rosui Ghor database is designed for a small university project with fewer than 50 expected users.

The database prioritizes:

- Simplicity
- Clear relationships
- Easy Laravel integration
- Data integrity
- Basic authentication
- Recipe management
- Category management
- User-specific recipe interactions

The database does not require:

- Database partitioning
- Replication
- Sharding
- Redis
- Elasticsearch
- Event sourcing
- Complex audit logging
- Multi-tenancy
- Multi-vendor structures

Recommended logical structure:

```text
users
  │
  ├──────────────┐
  │              │
  ↓              ↓
user_interactions │
  │              │
  │              │
  └──────→ recipes ←──── categories
```

---

## 2. Core Entities

The database will contain four primary functional areas:

1. Users
2. Categories
3. Recipes
4. User Recipe Interactions

Recommended core tables:

```text
users
categories
recipes
recipe_interactions
```

Laravel's standard authentication-related migration structure may be used where appropriate.

---

## 3. Entity Relationship Overview

```text
┌────────────────────┐
│       users        │
├────────────────────┤
│ id PK              │
│ name               │
│ email              │
│ password           │
│ role               │
│ created_at         │
│ updated_at         │
└─────────┬──────────┘
          │
          │ 1:N
          ↓
┌────────────────────────┐
│   recipe_interactions  │
├────────────────────────┤
│ id PK                  │
│ user_id FK             │
│ recipe_id FK           │
│ interaction_type       │
│ created_at             │
│ updated_at             │
└──────────┬─────────────┘
           │
           │ N:1
           ↓
┌────────────────────┐
│      recipes       │
├────────────────────┤
│ id PK              │
│ category_id FK     │
│ title              │
│ description        │
│ image_url          │
│ image_path         │
│ ingredients        │
│ cooking_time       │
│ difficulty         │
│ instructions       │
│ created_at         │
│ updated_at         │
└─────────┬──────────┘
          │
          │ N:1
          ↓
┌────────────────────┐
│     categories     │
├────────────────────┤
│ id PK              │
│ name               │
│ description        │
│ created_at         │
│ updated_at         │
└────────────────────┘
```

---

## 4. Users Table

### Purpose

Stores both normal users and administrators.

A separate `admins` table is not required.

The user's role determines access.

### Structure

| Column     | Type            | Constraints        | Description           |
| ---------- | --------------- | ------------------ | --------------------- |
| id         | BIGINT UNSIGNED | PK, Auto Increment | User identifier       |
| name       | VARCHAR(255)    | NOT NULL           | User name             |
| email      | VARCHAR(255)    | UNIQUE, NOT NULL   | Login email           |
| password   | VARCHAR(255)    | NOT NULL           | Hashed password       |
| role       | VARCHAR/ENUM    | NOT NULL           | `user` or `admin`     |
| created_at | TIMESTAMP       | Nullable           | Creation timestamp    |
| updated_at | TIMESTAMP       | Nullable           | Last update timestamp |

### Role Values

Only two values are required:

```text
user
admin
```

No additional roles should be created.

---

## 5. Users Constraints

### Primary Key

```text
users.id
```

### Unique Constraint

```text
users.email
```

Two accounts cannot use the same email address.

### Role Constraint

The application must ensure that only valid roles are stored.

Recommended application-level values:

```text
user
admin
```

---

## 6. Categories Table

### Purpose

Stores recipe categories managed by the administrator.

The original Shaad application uses categories such as Breakfast, Lunch, Dinner, and Snacks. Rosui Ghor keeps these as possible initial categories while allowing the administrator to CRUD categories.

### Structure

| Column      | Type            | Constraints        | Description           |
| ----------- | --------------- | ------------------ | --------------------- |
| id          | BIGINT UNSIGNED | PK, Auto Increment | Category identifier   |
| name        | VARCHAR(100)    | UNIQUE, NOT NULL   | Category name         |
| description | TEXT            | NULL               | Category description  |
| created_at  | TIMESTAMP       | Nullable           | Creation timestamp    |
| updated_at  | TIMESTAMP       | Nullable           | Last update timestamp |

---

## 7. Category Constraints

### Primary Key

```text
categories.id
```

### Unique Constraint

```text
categories.name
```

Category names must be unique.

For example, the database should not contain:

```text
Breakfast
Breakfast
```

---

## 8. Recipes Table

### Purpose

Stores all recipe content.

This is the primary content table in Rosui Ghor.

### Structure

| Column       | Type             | Constraints        | Description                 |
| ------------ | ---------------- | ------------------ | --------------------------- |
| id           | BIGINT UNSIGNED  | PK, Auto Increment | Recipe identifier           |
| category_id  | BIGINT UNSIGNED  | FK, NOT NULL       | Associated category         |
| title        | VARCHAR(255)     | NOT NULL           | Recipe title                |
| description  | TEXT             | NOT NULL           | Recipe description          |
| image_url    | TEXT             | NULL               | External image URL          |
| image_path   | VARCHAR(500)     | NULL               | Uploaded image path         |
| ingredients  | TEXT             | NOT NULL           | Ingredient information      |
| cooking_time | UNSIGNED INTEGER | NOT NULL           | Cooking duration in minutes |
| difficulty   | VARCHAR(50)      | NOT NULL           | Easy, Medium, or Hard       |
| instructions | LONGTEXT/TEXT    | NOT NULL           | Cooking instructions        |
| created_at   | TIMESTAMP        | Nullable           | Creation timestamp          |
| updated_at   | TIMESTAMP        | Nullable           | Last update timestamp       |

---

## 9. Recipe Image Storage Strategy

A recipe can use either an external image URL or an uploaded image.

The database therefore supports two image references:

```text
image_url
image_path
```

### External URL

Example:

```text
image_url = https://example.com/chicken.jpg
image_path = NULL
```

### Uploaded Image

Example:

```text
image_url = NULL
image_path = recipes/chicken-curry.jpg
```

The application should ensure that the two modes are not accidentally used simultaneously unless the implementation intentionally supports a fallback mechanism.

Recommended rule:

```text
External URL → image_url populated
Upload       → image_path populated
```

---

## 10. Recipe Category Relationship

Each recipe belongs to exactly one category.

Relationship:

```text
Category 1 ───────── N Recipes
```

Example:

```text
Dinner
  │
  ├── Chicken Curry
  ├── Beef Bhuna
  └── Vegetable Khichuri
```

Database relationship:

```text
recipes.category_id
        ↓
categories.id
```

---

## 11. Foreign Key

The `recipes.category_id` column must reference:

```text
categories.id
```

Recommended foreign key:

```text
FOREIGN KEY (category_id)
REFERENCES categories(id)
```

The database should prevent orphan recipes.

---

## 12. Category Deletion Strategy

A category cannot be deleted while recipes reference it.

Recommended database behavior:

```text
ON DELETE RESTRICT
```

Workflow:

```text
Admin deletes category
        ↓
Database checks recipes
        ↓
Recipes exist?
   ├── Yes → Delete rejected
   └── No → Category deleted
```

The administrator must reassign or delete dependent recipes before deleting the category.

This matches the functional requirement that the system should handle category dependencies rather than silently deleting or orphaning recipes.

---

## 13. Recipe Deletion Strategy

Recipes are permanently deleted.

No soft-delete field is required.

When an administrator deletes a recipe:

```text
recipes record
     ↓
PERMANENT DELETE
```

Associated user interaction records must also be handled.

Recommended foreign-key behavior for `recipe_interactions.recipe_id`:

```text
ON DELETE CASCADE
```

Therefore:

```text
Delete Recipe
      ↓
Delete related interactions
      ↓
Recipe removed
```

This prevents orphan interaction records.

---

## 14. Recipe Interactions Table

### Purpose

Stores user-specific recipe actions.

The user explicitly requires recipe-related user actions to be stored with the logged-in user's ID.

The interaction table therefore connects:

```text
User
   +
Recipe
   +
Interaction
```

### Structure

| Column           | Type            | Constraints        | Description               |
| ---------------- | --------------- | ------------------ | ------------------------- |
| id               | BIGINT UNSIGNED | PK, Auto Increment | Interaction ID            |
| user_id          | BIGINT UNSIGNED | FK, NOT NULL       | User who performed action |
| recipe_id        | BIGINT UNSIGNED | FK, NOT NULL       | Related recipe            |
| interaction_type | VARCHAR(50)     | NOT NULL           | Type of interaction       |
| created_at       | TIMESTAMP       | Nullable           | Creation time             |
| updated_at       | TIMESTAMP       | Nullable           | Last update time          |

---

## 15. Interaction Type

The system should keep interaction types simple.

Possible values can include:

```text
favorite
```

If another interaction is required during implementation, it can use the same table.

The database should not introduce multiple separate tables for every simple interaction.

For example, there is no need for:

```text
favorites
recipe_views
recipe_saves
recipe_likes
```

unless the final feature requirements specifically require different data structures.

---

## 16. User Interaction Relationship

One user can have many recipe interactions.

```text
User 1 ───────── N Interactions
```

One recipe can have many user interactions.

```text
Recipe 1 ─────── N Interactions
```

Therefore:

```text
Users
  │
  │ 1:N
  ↓
Recipe Interactions
  ↑
  │ N:1
  │
Recipes
```

This effectively creates a many-to-many relationship between users and recipes through the interaction table.

---

## 17. Interaction Foreign Keys

The table contains:

```text
user_id → users.id
recipe_id → recipes.id
```

Recommended behavior:

```text
user_id
ON DELETE CASCADE

recipe_id
ON DELETE CASCADE
```

This ensures that interaction records do not remain when their parent records are permanently deleted.

---

## 18. Interaction Uniqueness

If the selected interaction is a binary action such as `favorite`, the system should prevent duplicate active records.

Recommended composite unique constraint:

```text
UNIQUE(user_id, recipe_id, interaction_type)
```

Example:

```text
User 7
Recipe 15
favorite
```

cannot be inserted twice.

The user can instead toggle the existing interaction.

---

## 19. User-Specific Data Ownership

The backend must always derive the user ID from the authenticated session/token.

It should not trust a user-provided `user_id` when creating or modifying their own interaction.

Incorrect approach:

```text
POST /interactions

{
    "user_id": 15,
    "recipe_id": 8
}
```

where the client is allowed to decide the user ID.

Correct conceptual approach:

```text
Authenticated User
        ↓
Laravel Authentication
        ↓
Authenticated User ID
        ↓
Create Interaction
```

The backend determines ownership.

---

## 20. Database Relationships Summary

| Parent   | Child              | Relationship |
| -------- | ------------------ | ------------ |
| User     | Recipe Interaction | 1:N          |
| Recipe   | Recipe Interaction | 1:N          |
| Category | Recipe             | 1:N          |

No other relationship is required for the minimum project.

---

## 21. Complete ER Model

```text
                         ┌──────────────────────┐
                         │        USERS         │
                         ├──────────────────────┤
                         │ PK id                │
                         │ name                 │
                         │ email                │
                         │ password             │
                         │ role                 │
                         │ created_at           │
                         │ updated_at           │
                         └──────────┬───────────┘
                                    │
                                    │ 1
                                    │
                                    │ N
                         ┌──────────▼───────────┐
                         │ RECIPE_INTERACTIONS  │
                         ├──────────────────────┤
                         │ PK id                │
                         │ FK user_id           │
                         │ FK recipe_id         │
                         │ interaction_type     │
                         │ created_at           │
                         │ updated_at           │
                         └──────────┬───────────┘
                                    │
                                    │ N
                                    │
                                    │ 1
                         ┌──────────▼───────────┐
                         │       RECIPES        │
                         ├──────────────────────┤
                         │ PK id                │
                         │ FK category_id       │
                         │ title                │
                         │ description          │
                         │ image_url            │
                         │ image_path           │
                         │ ingredients          │
                         │ cooking_time         │
                         │ difficulty           │
                         │ instructions         │
                         │ created_at           │
                         │ updated_at           │
                         └──────────┬───────────┘
                                    │
                                    │ N
                                    │
                                    │ 1
                         ┌──────────▼───────────┐
                         │     CATEGORIES       │
                         ├──────────────────────┤
                         │ PK id                │
                         │ name                 │
                         │ description          │
                         │ created_at           │
                         │ updated_at           │
                         └──────────────────────┘
```

---

## 22. Database Normalization

The database follows a simple relational structure.

### First Normal Form

Fields should contain logically manageable values.

For example:

```text
title
description
cooking_time
difficulty
```

are individual attributes.

Ingredients and instructions are stored as recipe content rather than creating unnecessary tables for every ingredient step.

For the project's small scope, this is acceptable.

---

## 23. Why Ingredients Do Not Need Separate Tables

A fully normalized recipe system could contain:

```text
ingredients
recipe_ingredients
units
measurements
```

That would add unnecessary complexity.

Rosui Ghor is a small university project.

The recommended approach is to store the recipe's ingredient instructions as structured text.

This is easier to:

- Implement
- Seed
- Manage through Laravel
- Display in React
- Explain during the university presentation

---

## 24. Why Instructions Do Not Need Separate Tables

The same principle applies to cooking instructions.

There is no requirement for:

```text
recipe_steps
step_images
step_timers
step_ingredients
```

The `instructions` field is sufficient for the project.

---

## 25. Indexing Strategy

Only practical indexes are required.

### Required

#### Users

```text
PRIMARY KEY(id)
UNIQUE(email)
```

#### Categories

```text
PRIMARY KEY(id)
UNIQUE(name)
```

#### Recipes

```text
PRIMARY KEY(id)
INDEX(category_id)
```

#### Recipe Interactions

```text
PRIMARY KEY(id)
INDEX(user_id)
INDEX(recipe_id)
UNIQUE(user_id, recipe_id, interaction_type)
```

---

## 26. Search Indexing

The primary search requirement is recipe title search.

For fewer than 50 users and a small recipe dataset, a normal indexed database query is sufficient.

No Elasticsearch or external search system is required.

A basic Laravel query can search the title using a `LIKE` condition.

If the recipe dataset becomes significantly larger in the future, the search architecture can be reconsidered.

That future complexity is outside the current project.

---

## 27. Category Filtering Index

The `recipes.category_id` field should have an index.

This supports queries such as:

```text
WHERE category_id = ?
```

The index is inexpensive and directly supports the application's category filtering functionality.

---

## 28. Composite Interaction Index

For user-specific recipe interactions, use:

```text
UNIQUE(user_id, recipe_id, interaction_type)
```

This provides both:

- Duplicate prevention
- Efficient lookup of a user's interaction with a recipe

---

## 29. Soft Delete Strategy

Soft deletion is intentionally excluded.

The database should not contain:

```text
deleted_at
```

for recipes or categories.

Deletion means permanent deletion.

---

## 30. Timestamp Strategy

Laravel timestamps should be used.

Core tables should contain:

```text
created_at
updated_at
```

These timestamps are useful for:

- Sorting recent recipes
- Dashboard information
- Basic data management
- Debugging

No additional history tables are required.

---

## 31. Audit Log Strategy

No audit table is required.

The project explicitly excludes audit trails.

Therefore, do not create:

```text
audit_logs
activity_logs
admin_actions
change_history
```

unless a future requirement explicitly introduces them.

---

## 32. Database Transactions

Transactions should be used only where multiple database operations must succeed together.

Example:

Deleting a recipe and its dependent records may be handled transactionally if the implementation performs multiple application-level operations.

The project does not require a complex transaction orchestration layer.

---

## 33. Referential Integrity

Foreign keys should be enabled.

Required relationships:

```text
recipes.category_id
    → categories.id

recipe_interactions.user_id
    → users.id

recipe_interactions.recipe_id
    → recipes.id
```

The database should reject invalid references.

---

## 34. Recommended Foreign Key Behavior

| Relationship         | Delete Behavior |
| -------------------- | --------------- |
| Category → Recipe    | RESTRICT        |
| User → Interaction   | CASCADE         |
| Recipe → Interaction | CASCADE         |

This produces predictable deletion behavior.

---

## 35. Seed Data

The development database should include initial categories:

```text
Breakfast
Lunch
Dinner
Snacks
```

A development admin account should also be created through a Laravel seeder.

Example conceptual data:

```text
Admin
Name: Project Admin
Role: admin
```

The actual password must be securely hashed and must not be hard-coded into production configuration.

Sample recipes may also be seeded for demonstration purposes.

---

## 36. Migration Order

Recommended migration order:

```text
1. users
2. categories
3. recipes
4. recipe_interactions
```

This order respects foreign-key dependencies.

---

## 37. Database Migration Dependency

```text
users
   │
   └──────────────┐
                  ↓
          recipe_interactions
                  ↑
                  │
categories → recipes
```

The recipes table requires categories.

The interaction table requires users and recipes.

Therefore, migrations must be executed in dependency-safe order.

---

## 38. Data Retention

No special retention policy is required.

Data remains in the database until explicitly deleted.

Recipe and category deletions are permanent.

No automatic archival process is required.

---

## 39. Backup Strategy

For the university project, no automated backup infrastructure is required.

During development, the database can be exported manually when necessary.

No:

- replication
- point-in-time recovery
- disaster recovery cluster
- automated backup service

is required.

---

## 40. Database Security

The application should use environment variables for database configuration.

Example conceptual configuration:

```text
DB_CONNECTION=mysql
DB_HOST=...
DB_PORT=...
DB_DATABASE=...
DB_USERNAME=...
DB_PASSWORD=...
```

Database credentials must not be committed to the repository.

Laravel should communicate with MySQL through its configured database connection.

The React frontend must never contain database credentials.

---

## 41. Database Access Architecture

Correct:

```text
React
  ↓
Laravel API
  ↓
Laravel Models / Query Builder
  ↓
MySQL
```

Incorrect:

```text
React
  ↓
MySQL
```

The frontend must never directly connect to MySQL.

---

## 42. Database Performance

The expected scale is fewer than 50 users.

Therefore, the following are sufficient:

- MySQL
- Normal relational tables
- Foreign keys
- Basic indexes
- Laravel Eloquent
- Pagination where useful

No advanced database performance architecture is necessary.

---

## 43. Pagination

Recipe listing can use Laravel pagination even though the expected user count is small.

Recommended default:

```text
12 recipes per page
```

This keeps the UI manageable and prevents unnecessary data loading.

Pagination is optional for very small datasets but recommended because it is straightforward to implement.

---

## 44. API Data Exposure

The API should not return sensitive information unnecessarily.

For normal user responses, do not expose:

```text
password
```

The frontend should receive only the user fields required for the interface.

---

## 45. Sensitive Data

The only sensitive application data is primarily:

- User password hash
- Authentication credentials/tokens

Passwords must never be stored as plain text.

No payment, subscription, phone billing, or financial information exists in the Rosui Ghor database.

---

## 46. Database Architecture Boundary

The database intentionally stops at:

```text
Users
Categories
Recipes
Recipe Interactions
```

The following tables are specifically excluded:

```text
subscriptions
payments
billing
sms_logs
chat_messages
ai_logs
vendors
tenants
audit_logs
notifications
```

These concepts belong to the original Shaad application's broader architecture or future features and are not required for Rosui Ghor.

---

## 47. Final Database Schema Summary

```text
users
────────────────────────
id PK
name
email UNIQUE
password
role
created_at
updated_at

categories
────────────────────────
id PK
name UNIQUE
description
created_at
updated_at

recipes
────────────────────────
id PK
category_id FK
title
description
image_url
image_path
ingredients
cooking_time
difficulty
instructions
created_at
updated_at

recipe_interactions
────────────────────────
id PK
user_id FK
recipe_id FK
interaction_type
created_at
updated_at
```

---

## 48. Final Relationship Summary

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

The database is intentionally small, relational, and directly aligned with the functional specification.

No additional tables should be introduced unless a new approved requirement requires them.
