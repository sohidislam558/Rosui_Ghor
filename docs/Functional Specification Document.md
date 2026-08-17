# Rosui Ghor Functional Specification Document

- **Document Version**: 1.0
- **Project Type**: University Course Project
- **System Type**: Single Vendor Recipe Web Application

---

## 1. Document Purpose

This document defines the detailed functional behavior of Rosui Ghor.

It translates the Requirements Architecture Document into implementable workflows, CRUD operations, permissions, validation rules, state transitions, and edge-case behavior.

The system is intentionally simple. It targets fewer than 50 users and does not require production-level infrastructure.

---

## 2. System Actors

| Actor | Description                                            |
| ----- | ------------------------------------------------------ |
| Guest | Unauthenticated website visitor                        |
| User  | Registered and authenticated recipe consumer           |
| Admin | Authenticated administrator who manages system content |

The same login interface is used by users and administrators.

The system determines access based on the authenticated user's role.

---

## 3. Authentication Module

### 3.1 Registration

#### Workflow

```text
Guest
  ↓
Register Page
  ↓
Enter Name, Email, Password, Password Confirmation
  ↓
Client Validation
  ↓
Laravel API
  ↓
Server Validation
  ↓
Create User
  ↓
Redirect to Login or Authenticated Area
```

#### Required Fields

| Field                 | Required | Rules                          |
| --------------------- | -------: | ------------------------------ |
| Name                  |      Yes | Non-empty                      |
| Email                 |      Yes | Valid email, unique            |
| Password              |      Yes | Minimum project-defined length |
| Password Confirmation |      Yes | Must match password            |

#### Failure Cases

- Email already exists
- Invalid email
- Missing name
- Missing password
- Password confirmation mismatch
- Invalid request

The backend must return meaningful validation errors.

---

## 4. Login

### Workflow

```text
Login Page
   ↓
Email + Password
   ↓
Laravel Authentication
   ↓
Credentials Valid?
   ├── No → Error
   │
   └── Yes
         ↓
      Check Role
         ├── user → User Area
         └── admin → Admin Dashboard
```

### Successful User Login

The user is authenticated and redirected to the normal user interface.

### Successful Admin Login

The administrator is authenticated and redirected to the admin dashboard.

### Failed Login

The system displays a generic authentication error.

The application should not reveal whether the email exists.

---

## 5. Logout

### Workflow

```text
Authenticated User
       ↓
Logout
       ↓
Authentication Token/Session Invalidated
       ↓
Return to Public Website
```

After logout, protected pages and API endpoints must no longer be accessible.

---

## 6. Authentication State

The frontend should maintain a simple authentication state containing the information required to determine:

- Whether the user is authenticated
- Current user information
- Current role
- Whether authentication state is being loaded

Example conceptual state:

```text
auth
├── user
├── isAuthenticated
├── role
└── loading
```

No complex state management architecture is required.

---

## 7. Role-Based Authorization

### Permission Matrix

| Function                  | Guest | User | Admin |
| ------------------------- | ----: | ---: | ----: |
| View Homepage             |   Yes |  Yes |   Yes |
| View Recipe Cards         |   Yes |  Yes |   Yes |
| Search Recipes            |   Yes |  Yes |   Yes |
| Filter Recipes            |   Yes |  Yes |   Yes |
| View Complete Recipe      |    No |  Yes |   Yes |
| Create User Account       |   Yes |   No |    No |
| View Own Profile          |    No |  Yes |   Yes |
| Update Own Profile        |    No |  Yes |   Yes |
| Create Recipe             |    No |   No |   Yes |
| Edit Recipe               |    No |   No |   Yes |
| Delete Recipe             |    No |   No |   Yes |
| Create Category           |    No |   No |   Yes |
| Edit Category             |    No |   No |   Yes |
| Delete Category           |    No |   No |   Yes |
| View Dashboard Statistics |    No |   No |   Yes |

Authorization must be enforced by Laravel.

Frontend route protection alone is insufficient.

---

## 8. Recipe Module

### 8.1 Recipe Listing

The recipe listing page displays recipe cards.

Each card should contain:

- Recipe image
- Recipe title
- Category
- Cooking time
- Difficulty
- View Recipe action

Guests may see these basic fields.

The complete recipe content remains protected.

---

## 9. Recipe Card Behavior

### Guest

```text
Recipe Card
    ↓
View Recipe
    ↓
Authentication Check
    ↓
Not Authenticated
    ↓
Redirect to Login
```

### Authenticated User

```text
Recipe Card
    ↓
View Recipe
    ↓
Authentication Check
    ↓
Authenticated
    ↓
Recipe Details
```

The same behavior applies to administrators when they access the normal recipe interface.

---

## 10. Recipe Details

Authenticated users can view:

- Title
- Description
- Image
- Category
- Ingredients
- Cooking time
- Difficulty
- Instructions

The recipe details page should clearly separate:

```text
Recipe Information
Ingredients
Cooking Instructions
```

The page must handle missing optional content without breaking the layout.

---

## 11. Recipe Search

The recipe listing page shall contain a search field.

### Search Workflow

```text
User enters search term
       ↓
Frontend sends query
       ↓
Laravel API
       ↓
Search recipes
       ↓
Return matching records
       ↓
Update recipe list
```

The minimum required search field is:

```text
Recipe Title
```

The implementation should not introduce a separate search engine.

---

## 12. Category Filtering

The category filter must use categories stored in MySQL.

Example:

```text
All
Breakfast
Lunch
Dinner
Snacks
```

The actual category list is dynamic.

If the administrator creates a new category, it should become available to users.

### Workflow

```text
Select Category
       ↓
Request Recipes
       ↓
Laravel filters by category_id
       ↓
Filtered Results
```

---

## 13. Combined Search and Filtering

Search and category filtering should work together.

Example:

```text
Search: Chicken
Category: Dinner
```

The system should return recipes that satisfy both conditions.

Selecting "All" should remove the category restriction.

Clearing the search field should remove the search restriction.

---

## 14. Recipe Creation

Only administrators can create recipes.

### Workflow

```text
Admin Dashboard
      ↓
Recipes
      ↓
Add Recipe
      ↓
Fill Form
      ↓
Select Image Source
      ↓
Validate
      ↓
Submit
      ↓
Laravel Validation
      ↓
Create Recipe
      ↓
Success Response
      ↓
Recipe List
```

### Recipe Form

| Field        | Required |
| ------------ | -------: |
| Title        |      Yes |
| Description  |      Yes |
| Category     |      Yes |
| Ingredients  |      Yes |
| Cooking Time |      Yes |
| Difficulty   |      Yes |
| Instructions |      Yes |
| Image        |      Yes |

The image may be supplied through either an external URL or an uploaded image.

---

## 15. Recipe Image Handling

The administrator chooses one of two methods.

### Option A: External URL

```text
Image Source
   ↓
External URL
   ↓
Enter URL
   ↓
Validate URL
   ↓
Store URL
```

### Option B: Upload

```text
Image Source
   ↓
Upload
   ↓
Select Image
   ↓
Validate File
   ↓
Store Image
   ↓
Store Image Reference
```

The frontend should clearly indicate which image method is selected.

Only the required image reference should be stored with the recipe.

---

## 16. Recipe Editing

Only administrators can edit recipes.

### Workflow

```text
Admin
  ↓
Recipe List
  ↓
Edit
  ↓
Existing Data Loaded
  ↓
Modify Fields
  ↓
Validate
  ↓
Update Database
  ↓
Success
  ↓
Recipe List
```

If the administrator does not replace the existing image, the current image remains unchanged.

---

## 17. Recipe Deletion

Only administrators can delete recipes.

### Workflow

```text
Admin
  ↓
Recipe List
  ↓
Delete
  ↓
Confirmation
  ↓
Delete Request
  ↓
Laravel Authorization
  ↓
Permanent Database Deletion
```

The frontend should request confirmation before deletion.

The system must permanently remove the recipe.

If an uploaded image belongs exclusively to the deleted recipe, the corresponding stored file should also be removed where applicable.

---

## 18. Category Module

### 18.1 Category List

Administrators can view all categories.

Each category should display:

- Name
- Description, if used
- Number of associated recipes, if useful
- Edit action
- Delete action

---

## 19. Category Creation

### Workflow

```text
Admin
  ↓
Categories
  ↓
Add Category
  ↓
Enter Name
  ↓
Enter Description
  ↓
Validate
  ↓
Create
```

Category names should be unique.

---

## 20. Category Editing

Administrators can modify an existing category.

Changing a category name must update the existing category record rather than creating a new category.

Recipes already associated with that category continue to reference the same category ID.

---

## 21. Category Deletion

Categories can be permanently deleted.

However, a category with associated recipes should not be deleted automatically.

The system should detect dependent recipes.

### Behavior

```text
Delete Category
       ↓
Check Associated Recipes
       ↓
Has Recipes?
   ├── Yes → Reject deletion
   │          Show affected relationship
   │
   └── No → Permanently Delete
```

The administrator must handle the recipes first.

Possible administrator action:

```text
Recipe A
Old Category
    ↓
Edit Recipe
    ↓
New Category
```

After no recipes reference the old category, the administrator can delete it.

---

## 22. User Profile Module

Authenticated users can access their profile.

### Profile Fields

- Name
- Email

The profile should also provide:

- Logout

No additional account-management system is required.

---

## 23. Profile Update

### Workflow

```text
User
 ↓
Profile
 ↓
Edit Information
 ↓
Validation
 ↓
Update User
 ↓
Success
```

Email uniqueness must be maintained.

The currently authenticated user's own email should be allowed when checking uniqueness.

---

## 24. User Recipe Interactions

Authenticated users may perform supported recipe interactions.

Every interaction must reference:

```text
user_id
recipe_id
```

This ensures the application knows which user performed the action on which recipe.

### Example

```text
User 12
   ↓
Recipe 7
   ↓
Interaction
   ↓
user_id = 12
recipe_id = 7
```

The system should prevent unauthenticated users from creating these records.

---

## 25. Interaction Ownership

Users can access and modify only their own user-specific records.

Conceptually:

```text
User A
  └── Interaction A

User B
  └── Interaction B
```

User A must not be able to modify Interaction B.

The backend should enforce ownership using the authenticated user's ID.

---

## 26. Admin Dashboard

The administrator dashboard is intentionally minimal.

### Required Statistics

```text
Total Users
Total Recipes
Total Categories
```

The statistics should be calculated from current database records.

### Example

```text
┌───────────────┐
│ Total Users   │
│      24       │
└───────────────┘

┌───────────────┐
│ Total Recipes │
│      48       │
└───────────────┘

┌───────────────┐
│ Categories    │
│       4       │
└───────────────┘
```

No advanced analytics are required.

---

## 27. CRUD Matrix

### Users

| Operation       | Guest | User | Admin |
| --------------- | ----: | ---: | ----: |
| Create Account  |   Yes |   No |    No |
| Read Own Data   |    No |  Yes |   Yes |
| Update Own Data |    No |  Yes |   Yes |
| Delete Account  |    No |   No |    No |

Account deletion is intentionally excluded from the current scope.

---

### Recipes

| Operation  | Guest | User | Admin |
| ---------- | ----: | ---: | ----: |
| Create     |    No |   No |   Yes |
| Read Basic |   Yes |  Yes |   Yes |
| Read Full  |    No |  Yes |   Yes |
| Update     |    No |   No |   Yes |
| Delete     |    No |   No |   Yes |

---

### Categories

| Operation | Guest | User | Admin |
| --------- | ----: | ---: | ----: |
| Create    |    No |   No |   Yes |
| Read      |   Yes |  Yes |   Yes |
| Update    |    No |   No |   Yes |
| Delete    |    No |   No |   Yes |

---

### User Interactions

| Operation             | Guest | User | Admin |
| --------------------- | ----: | ---: | ----: |
| Create Own            |    No |  Yes |   Yes |
| Read Own              |    No |  Yes |   Yes |
| Update Own            |    No |  Yes |   Yes |
| Delete Own            |    No |  Yes |   Yes |
| Access Another User's |    No |   No |    No |

Admin access to user-specific records should only be implemented if required by the selected interaction feature.

---

## 28. State Transitions

### Authentication

```text
Unauthenticated
      ↓
Login
      ↓
Authenticating
      ↓
Authenticated
      ↓
Logout
      ↓
Unauthenticated
```

Failure:

```text
Authenticating
      ↓
Authentication Failed
      ↓
Unauthenticated
```

---

### Recipe

```text
Nonexistent
    ↓
Created
    ↓
Available
    ↓
Updated
    ↓
Available
    ↓
Deleted
    ↓
Nonexistent
```

---

### Category

```text
Nonexistent
    ↓
Created
    ↓
Available
    ↓
Updated
    ↓
Available
    ↓
Delete Request
    ↓
Dependency Check
    ├── Has Recipes → Remains Available
    └── No Recipes → Deleted
```

---

## 29. Validation Rules

### User Registration

- Name cannot be empty.
- Email must be valid.
- Email must be unique.
- Password cannot be empty.
- Password confirmation must match.

### Login

- Email required.
- Password required.

### Category

- Name required.
- Name must be unique.
- Description may be optional.

### Recipe

- Title required.
- Description required.
- Category required.
- Category must exist.
- Ingredients required.
- Cooking time required.
- Difficulty required.
- Instructions required.
- Image source required.

### External Image

If URL mode is selected:

- URL must be present.
- URL must have valid URL syntax.

### Uploaded Image

If upload mode is selected:

- File must be a valid image.
- File must comply with configured upload size.
- Unsupported file types must be rejected.

---

## 30. Difficulty Values

Difficulty should use a controlled set of values.

Recommended:

```text
Easy
Medium
Hard
```

The frontend should use a select field instead of allowing arbitrary difficulty values.

This prevents inconsistent database values such as:

```text
easy
Easy
EASY
Very Easy
Simple
```

---

## 31. Cooking Time

Cooking time should be stored consistently.

Recommended approach:

```text
cooking_time
```

Store the numeric duration in minutes.

Example:

```text
30
```

The frontend can display:

```text
30 minutes
```

This makes filtering and future calculations easier without introducing unnecessary complexity.

---

## 32. Ingredients

Ingredients can be stored as structured text or JSON depending on the database implementation.

For the minimum university scope, structured text is acceptable.

Example:

```text
500g chicken
2 onions
3 cloves garlic
1 tsp salt
2 tbsp oil
```

The frontend should present ingredients in a readable format.

---

## 33. Cooking Instructions

Instructions can be stored as structured text.

Example:

```text
1. Clean and cut the chicken.
2. Heat oil in a pan.
3. Add onion and garlic.
4. Add chicken and spices.
5. Cook until done.
```

The frontend should display instructions in an ordered, readable format.

---

## 34. API Error Handling

The backend should return appropriate HTTP responses.

Recommended behavior:

| Situation               | Response |
| ----------------------- | -------: |
| Successful request      |      200 |
| Created                 |      201 |
| Validation failure      |      422 |
| Unauthenticated         |      401 |
| Unauthorized            |      403 |
| Resource not found      |      404 |
| Unexpected server error |      500 |

The frontend should translate these responses into user-friendly messages.

---

## 35. Frontend Error States

The frontend must handle:

- Loading
- Empty results
- Validation errors
- Authentication errors
- Unauthorized access
- Not found
- Server errors
- Network failure

Example recipe listing states:

```text
Loading
   ↓
Recipes Loaded
```

or:

```text
Loading
   ↓
No Recipes Found
```

or:

```text
Loading
   ↓
Request Failed
   ↓
Retry
```

---

## 36. Empty States

The application should not display blank pages when there is no data.

Examples:

```text
No recipes found.
Try another search or category.
```

```text
No categories available.
```

```text
No recipes have been added yet.
```

Admin pages should provide the relevant creation action.

---

## 37. Responsive Functional Requirements

The application must remain functional across:

- Small mobile screens
- Large mobile screens
- Tablets
- Small laptops
- Desktop monitors
- Large monitors

The interface must also remain usable when the browser is zoomed.

Avoid:

- fixed viewport-dependent widths
- overflowing tables
- content clipped outside the viewport
- buttons that become inaccessible
- forms that exceed the available width
- navigation that cannot collapse

Admin tables should become horizontally scrollable or transform into responsive layouts on small screens.

---

## 38. Security Enforcement

The frontend may perform route checks for user experience.

However, the Laravel backend must remain the final authorization layer.

Example:

```text
React:
Admin route check
       ↓
Laravel:
Authentication check
       ↓
Role check
       ↓
Permission granted
```

A user must not gain administrative access by manually modifying frontend state.

---

## 39. Edge Case Matrix

| Edge Case                                | Expected Behavior            |
| ---------------------------------------- | ---------------------------- |
| Guest opens recipe details               | Redirect to login            |
| Invalid login                            | Display authentication error |
| Duplicate registration email             | Reject registration          |
| User accesses admin API                  | Return 403                   |
| Admin accesses nonexistent recipe        | Return 404                   |
| User accesses nonexistent recipe         | Return 404                   |
| Recipe has invalid category              | Reject request               |
| Delete category with recipes             | Reject deletion              |
| Delete recipe                            | Permanently delete           |
| Invalid image URL                        | Reject request               |
| Invalid image upload                     | Reject request               |
| Empty search                             | Show normal recipe list      |
| Search has no results                    | Show empty state             |
| No categories                            | Show appropriate empty state |
| No recipes                               | Show appropriate empty state |
| Network failure                          | Display error state          |
| Expired authentication                   | Return user to login         |
| User attempts another user's interaction | Reject request               |

---

## 40. Frontend Route Specification

Recommended routes:

```text
/
    Home

/login
    Login

/register
    Register

/recipes
    Recipe Listing

/recipes/:id
    Protected Recipe Details

/profile
    Protected User Profile

/admin
    Protected Admin Dashboard

/admin/recipes
    Recipe Management

/admin/recipes/create
    Create Recipe

/admin/recipes/:id/edit
    Edit Recipe

/admin/categories
    Category Management
```

---

## 41. Backend API Structure

Recommended API structure:

```text
/api/register
/api/login
/api/logout
/api/user

/api/recipes
/api/recipes/{id}

/api/categories
/api/categories/{id}

/api/user/interactions
/api/user/interactions/{id}

/api/admin/statistics
```

Exact controller and route organization belongs to the implementation phase.

---

## 42. Authentication Middleware

Protected routes should use authentication middleware.

Admin routes should additionally use role authorization.

Conceptually:

```text
Public API
    ↓
No authentication required

User API
    ↓
Sanctum Authentication

Admin API
    ↓
Sanctum Authentication
    ↓
Admin Authorization
```

---

## 43. Data Validation Responsibility

Validation occurs at two levels.

### Frontend

Purpose:

- Immediate user feedback
- Better form experience
- Prevent obvious invalid submissions

### Backend

Purpose:

- Actual data protection
- Database integrity
- Security
- Consistent API behavior

Backend validation is mandatory even when frontend validation exists.

---

## 44. Audit Requirements

No dedicated audit-trail system is required.

The application does not need to record:

- Which admin changed a recipe
- Previous recipe versions
- Change history
- Login history
- Administrative activity logs

Basic `created_at` and `updated_at` timestamps are sufficient.

---

## 45. Data Deletion Requirements

Recipe deletion is permanent.

Category deletion is permanent when no dependent recipes remain.

No recycle bin is required.

No restoration system is required.

No soft-delete columns are required.

---

## 46. Implementation Priority

### Priority 1

- Authentication
- User roles
- Recipe database
- Category database
- Recipe CRUD
- Category CRUD
- Protected recipe details

### Priority 2

- Search
- Category filtering
- Image upload
- External image URL
- User profile

### Priority 3

- User recipe interactions
- Admin statistics
- UI refinement
- Responsive optimization

---

## 47. Acceptance Criteria

The project is functionally complete when:

1. A user can register.
2. A user can log in.
3. An administrator can log in through the same login page.
4. Users and administrators are redirected to the correct interface based on role.
5. Guests can browse recipe cards.
6. Guests cannot access complete recipe details.
7. Authenticated users can view complete recipe details.
8. Users can search recipes.
9. Users can filter recipes by category.
10. Administrators can create recipes.
11. Administrators can edit recipes.
12. Administrators can permanently delete recipes.
13. Administrators can create categories.
14. Administrators can edit categories.
15. Administrators can delete categories when dependencies are resolved.
16. Administrators can use either an external image URL or an uploaded image.
17. User-specific recipe interactions are associated with the authenticated user's ID.
18. Users can manage their basic profile.
19. Administrators can see basic system statistics.
20. The application works responsively across mobile, tablet, laptop, and desktop screens.
21. The application remains usable under browser zoom changes.
22. Laravel enforces authentication and authorization.
23. MySQL stores all required application data.
24. No subscription, payment, AI, SMS, or unnecessary external system is required.

---

## 48. Functional Completion Boundary

The project should stop when the above acceptance criteria are satisfied.

Additional features should not be introduced simply because they are technically possible.

The intended final system remains:

```text
Rosui Ghor
│
├── Authentication
├── User Management
├── Recipe Browsing
├── Recipe Search
├── Category Filtering
├── Recipe Details
├── User Recipe Interactions
├── User Profile
├── Admin Dashboard
├── Recipe CRUD
└── Category CRUD
```

This functional specification is the implementation reference for the Rosui Ghor frontend and Laravel backend.
