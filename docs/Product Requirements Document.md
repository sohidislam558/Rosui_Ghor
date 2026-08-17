# Rosui Ghor Product Requirements Document

- **Document Version**: 1.0
- **Project Type**: University Course Project
- **Product Type**: Single Vendor Recipe Web Application
- **Frontend**: React + TypeScript
- **Backend**: Laravel
- **Database**: MySQL
- **UI**: Tailwind CSS

---

## 1. Product Overview

Rosui Ghor is a simple web-based recipe platform for a single cooking content provider.

The system allows visitors to discover recipes, search and filter recipes, and register for an account. Authenticated users can access complete recipe details and perform supported recipe interactions. An administrator manages recipes and categories through a dedicated dashboard.

The project is based on the useful recipe-management concepts of the original Shaad application, which includes recipe browsing, categories, search, recipe details, and an administrative recipe-management panel.

Rosui Ghor intentionally removes the original application's subscription, telecom verification, billing, SMS, and AI-related functionality.

The product is designed specifically as a university course project. It targets fewer than 50 users and prioritizes straightforward implementation over production-level infrastructure.

---

## 2. Product Goal

The primary goal is to build a complete but simple full-stack recipe website that demonstrates practical knowledge of:

- React
- TypeScript
- Tailwind CSS
- Laravel
- REST APIs
- MySQL
- Authentication
- Authorization
- CRUD operations
- Responsive web design
- Relational database relationships

The project should be easy to demonstrate, explain, test, and maintain.

---

## 3. Product Objectives

### Objective 1: Recipe Discovery

Allow visitors to discover available recipes through:

- Recipe cards
- Search
- Categories
- Basic recipe information

### Objective 2: Protected Recipe Content

Require authentication before users can access complete recipe information.

### Objective 3: Content Management

Allow the administrator to manage:

- Recipes
- Categories
- Recipe images

### Objective 4: User Accounts

Allow users to:

- Register
- Login
- Logout
- Manage basic profile information
- Perform supported recipe interactions

### Objective 5: Academic Demonstration

Demonstrate a complete frontend-to-backend workflow:

```text
React
  ↓
Laravel API
  ↓
MySQL
```

---

## 4. Target Users

### 4.1 Guest

A visitor who has not logged in.

Typical goals:

- Understand what Rosui Ghor offers
- Browse recipes
- Search for recipes
- Filter by category
- Decide whether to register

Restrictions:

- Cannot view complete recipe details
- Cannot perform authenticated interactions
- Cannot access profile
- Cannot access admin functionality

---

### 4.2 Registered User

A normal authenticated user.

Typical goals:

- Browse recipes
- Search recipes
- Filter recipes
- Read complete recipes
- Save or perform supported interactions
- Manage basic profile information

---

### 4.3 Administrator

The person responsible for managing the single recipe collection.

Typical goals:

- Add recipes
- Edit recipes
- Delete recipes
- Create categories
- Edit categories
- Delete categories
- Monitor basic system statistics

There is only one administrative role.

---

## 5. Product Scope

### 5.1 MVP Features

The minimum viable product contains:

- Homepage
- User registration
- User login
- User logout
- Role-based authentication
- Recipe listing
- Recipe cards
- Recipe search
- Category filtering
- Protected recipe details
- User profile
- Recipe interactions
- Admin dashboard
- Recipe CRUD
- Category CRUD
- Recipe image upload
- External image URL
- Basic dashboard statistics
- Responsive design

---

## 6. Features Outside Scope

The following are explicitly excluded:

- Subscription
- Payment
- Billing
- OTP
- SMS
- Telecom verification
- Robi integration
- Airtel integration
- AppsPro
- bdapps
- AI chatbot
- AI recipe assistant
- AI recommendations
- Multi-vendor
- Multi-tenant architecture
- Real-time communication
- Notifications
- Hardware integration
- Advanced analytics
- Audit logs
- Complex reporting
- Social login
- Enterprise monitoring

The original Shaad application includes subscription and AppsPro/bdapps integration, while its future plan includes an AI cooking assistant. These features are outside Rosui Ghor's product scope.

---

## 7. Core Product Features

### 7.1 Homepage

The homepage introduces Rosui Ghor and provides access to the recipe collection.

Recommended sections:

1. Navigation
2. Hero section
3. Featured or latest recipes
4. Categories
5. Short introduction
6. Call to action
7. Footer

The homepage should not contain unnecessary functionality.

---

## 8. Recipe Discovery

The recipe discovery experience is the central user-facing feature.

Users should be able to:

- Browse recipes
- Search recipes
- Filter by category
- View basic recipe information
- Open recipe details

Recipe cards should show:

- Image
- Title
- Category
- Cooking time
- Difficulty
- View Recipe button

---

## 9. Guest Recipe Access

Guests can browse recipe previews.

Example:

```text
┌─────────────────────────────┐
│        Recipe Image         │
├─────────────────────────────┤
│ Chicken Curry               │
│ Dinner                      │
│ 45 minutes · Medium         │
│                             │
│       View Recipe           │
└─────────────────────────────┘
```

When the guest selects View Recipe:

```text
View Recipe
     ↓
Authentication Check
     ↓
Not Logged In
     ↓
Login
```

The guest should not receive the protected recipe content through the API.

---

## 10. Authenticated Recipe Access

After successful authentication:

```text
Recipe Card
     ↓
View Recipe
     ↓
Recipe Details
```

Complete information includes:

- Title
- Description
- Image
- Category
- Ingredients
- Cooking time
- Difficulty
- Instructions

---

## 11. Search Requirements

The recipe list must provide a search field.

Minimum search behavior:

```text
Search term
     ↓
Recipe title matching
     ↓
Matching recipes
```

Example:

```text
Search: Chicken
```

Potential results:

- Chicken Curry
- Chicken Roast
- Chicken Biriyani

Search should work with the category filter.

---

## 12. Category Requirements

Categories are database-managed.

Initial categories can include:

- Breakfast
- Lunch
- Dinner
- Snacks

The administrator can:

- Add category
- Edit category
- Delete category

Users can filter recipes by category.

---

## 13. Recipe Management

The administrator can create recipes containing:

- Title
- Description
- Category
- Image
- Ingredients
- Cooking time
- Difficulty
- Instructions

The recipe image can come from:

1. External URL
2. Uploaded file

---

## 14. Recipe CRUD

### Create

Admin enters recipe information and submits the form.

### Read

Admin can view all recipes.

Users can view basic recipe information.

Authenticated users can view complete recipe information.

### Update

Admin can edit existing recipes.

### Delete

Admin can permanently delete recipes.

No recycle bin is required.

---

## 15. Category CRUD

The administrator can:

```text
Create
Read
Update
Delete
```

categories.

Category deletion must respect existing recipe relationships.

If recipes are still associated with a category, the system must prevent unsafe deletion.

---

## 16. Image Management

The recipe form should allow the administrator to select:

```text
Image Source

○ External URL
○ Upload Image
```

### External URL

The administrator enters an image URL.

The URL is stored with the recipe.

#### Upload

The administrator selects an image.

The backend stores the file and the database stores the corresponding image path.

The implementation should avoid storing image binary data directly inside MySQL.

---

## 17. User Authentication

The application uses a single login page.

The same authentication process supports:

- User accounts
- Admin accounts

After authentication:

```text
role = user
    ↓
User application

role = admin
    ↓
Admin dashboard
```

Laravel should enforce authorization on protected API endpoints.

---

## 18. User Registration

Registration requires:

- Name
- Email
- Password
- Password confirmation

Email addresses must be unique.

Passwords must be securely hashed.

No email verification or OTP is required.

---

## 19. User Profile

The profile is intentionally simple.

It should contain:

- Name
- Email
- Logout

Users can update basic profile information.

No:

- Subscription status
- Billing information
- Notification preferences
- Phone verification
- Advanced privacy settings

are required.

---

## 20. User Recipe Interactions

Authenticated users can perform the selected recipe interaction feature.

The interaction must be stored with:

```text
user_id
recipe_id
interaction_type
```

This ensures that the database identifies the user responsible for each interaction.

Users cannot create an interaction without authentication.

Users cannot manipulate another user's interaction records.

---

## 21. Admin Dashboard

The admin dashboard should be simple.

Required statistics:

```text
Total Users
Total Recipes
Total Categories
```

Optional information:

```text
Recent Recipes
Recipes by Category
```

No advanced analytics are required.

---

## 22. Admin Navigation

Recommended structure:

```text
Admin Dashboard
│
├── Dashboard
│
├── Recipes
│   ├── All Recipes
│   ├── Add Recipe
│   └── Edit Recipe
│
├── Categories
│   ├── All Categories
│   ├── Add Category
│   └── Edit Category
│
└── Logout
```

---

## 23. User Navigation

```text
Home
│
├── Recipes
│   ├── Search
│   ├── Categories
│   └── Recipe Details
│
├── Profile
│
└── Logout
```

---

## 24. Guest Navigation

```text
Home
│
├── Recipes
├── Categories
├── Login
└── Register
```

The navigation should adapt based on authentication state.

---

## 25. Page Requirements

### Page 1: Home

Purpose:

Introduce Rosui Ghor and guide visitors toward recipes.

Required:

- Navigation
- Hero
- Recipe discovery CTA
- Featured/latest recipes
- Category section
- Footer

---

### Page 2: Login

Required:

- Email
- Password
- Login button
- Registration link
- Validation/error feedback

---

### Page 3: Register

Required:

- Name
- Email
- Password
- Password confirmation
- Register button
- Login link

---

### Page 4: Recipes

Required:

- Search
- Category filter
- Recipe cards
- Loading state
- Empty state
- Error state
- Pagination if required

---

### Page 5: Recipe Details

Required:

- Recipe image
- Title
- Category
- Description
- Cooking time
- Difficulty
- Ingredients
- Instructions

Authentication is required.

---

### Page 6: Profile

Required:

- Name
- Email
- Edit functionality
- Logout

---

### Page 7: Admin Dashboard

Required:

- Statistics
- Navigation
- Admin content-management links

---

### Page 8: Admin Recipes

Required:

- Recipe table/list
- Search if useful
- Add button
- Edit button
- Delete button

---

### Page 9: Add Recipe

Required:

- Recipe form
- Category selector
- Image source selector
- Image URL or upload field
- Validation
- Submit action

---

### Page 10: Edit Recipe

Required:

- Existing recipe data
- Editable fields
- Image management
- Save action
- Delete access where appropriate

---

### Page 11: Admin Categories

Required:

- Category list
- Add category
- Edit category
- Delete category
- Dependency-aware deletion

---

## 26. User Journey

### New Visitor

```text
Homepage
   ↓
Browse Recipes
   ↓
Search / Filter
   ↓
Select Recipe
   ↓
Login Required
   ↓
Register
   ↓
Login
   ↓
Recipe Details
```

---

### Returning User

```text
Login
   ↓
Recipes
   ↓
Search / Filter
   ↓
Recipe
   ↓
Complete Details
   ↓
Recipe Interaction
```

---

### Administrator

```text
Login
   ↓
Admin Dashboard
   ↓
View Statistics
   ↓
Manage Categories
   ↓
Manage Recipes
   ↓
Create / Edit / Delete
```

---

## 27. Success Criteria

The product succeeds when a complete end-to-end workflow can be demonstrated.

### Authentication

- User can register.
- User can log in.
- User can log out.
- Admin can log in through the same login page.
- Role-based redirection works.

#### Recipes

- Recipes display correctly.
- Guests can browse previews.
- Guests cannot access protected recipe details.
- Authenticated users can view complete details.
- Search works.
- Category filtering works.

#### Administration

- Admin can create recipes.
- Admin can edit recipes.
- Admin can delete recipes.
- Admin can create categories.
- Admin can edit categories.
- Admin can delete categories safely.

#### User Data

- User profile works.
- Recipe interactions are associated with the correct user.

#### UI

- Website works on mobile.
- Website works on tablet.
- Website works on desktop.
- Layout remains usable under browser zoom.

---

## 28. Academic Demonstration Scenarios

The following scenarios should be sufficient for a course presentation.

### Scenario 1: Guest Browsing

1. Open Rosui Ghor.
2. Browse recipe cards.
3. Search for a recipe.
4. Select a category.
5. Open a recipe.
6. System requests login.

### Scenario 2: User Authentication

1. Register.
2. Login.
3. Browse recipes.
4. Open a recipe.
5. View complete ingredients and instructions.
6. Perform a recipe interaction.
7. Open profile.
8. Logout.

### Scenario 3: Admin Management

1. Login using admin account.
2. Open dashboard.
3. View statistics.
4. Create category.
5. Create recipe.
6. Upload recipe image.
7. Edit recipe.
8. Delete recipe.
9. Manage categories.

---

## 29. Product Requirements Priority

| Feature                  | Priority  |
| ------------------------ | --------- |
| Registration             | Must Have |
| Login                    | Must Have |
| Logout                   | Must Have |
| Role-based access        | Must Have |
| Recipe listing           | Must Have |
| Recipe details           | Must Have |
| Protected recipe details | Must Have |
| Recipe search            | Must Have |
| Category filtering       | Must Have |
| Recipe CRUD              | Must Have |
| Category CRUD            | Must Have |
| Image upload             | Must Have |
| External image URL       | Must Have |
| User profile             | Must Have |
| User recipe interaction  | Must Have |
| Admin statistics         | Must Have |
| Responsive design        | Must Have |
| Advanced analytics       | Excluded  |
| Subscription             | Excluded  |
| Payment                  | Excluded  |
| AI                       | Excluded  |
| Notifications            | Excluded  |

---

## 30. Responsive Product Requirements

The interface must support:

- 320px-class mobile layouts
- Larger mobile devices
- Tablets
- Laptops
- Standard desktop monitors
- Large monitors

The design must also remain usable when browser zoom changes.

Important implementation expectations:

- Flexible widths
- Responsive grids
- Responsive navigation
- Text wrapping
- Responsive forms
- Responsive admin tables
- No accidental horizontal overflow
- Touch-friendly controls
- Proper image scaling

---

## 31. Basic Security Requirements

The product must implement reasonable application-level security.

Required:

- Password hashing
- Authentication
- Authorization
- Backend validation
- Protected API endpoints
- Admin authorization
- Upload validation
- Secure environment configuration

Not required:

- Enterprise security infrastructure
- SIEM
- Advanced intrusion detection
- Complex compliance controls
- Dedicated security monitoring

---

## 32. Performance Requirements

The expected scale is fewer than 50 users.

The application should therefore focus on straightforward performance practices:

- Paginated recipe lists where useful
- Optimized image dimensions
- Lazy loading where appropriate
- Avoid unnecessary API requests
- Efficient MySQL queries
- Responsive frontend rendering

No distributed performance architecture is required.

---

## 33. Technical Product Boundary

The application architecture is:

```text
┌───────────────────────────┐
│ React + TypeScript        │
│ Tailwind CSS              │
│                           │
│ User Interface            │
│ Authentication State      │
│ Recipe Pages              │
│ Admin Pages               │
└─────────────┬─────────────┘
              │
              │ REST API
              ↓
┌───────────────────────────┐
│ Laravel                   │
│                           │
│ Authentication            │
│ Authorization             │
│ Validation                │
│ Recipe APIs               │
│ Category APIs             │
│ User APIs                 │
└─────────────┬─────────────┘
              │
              ↓
┌───────────────────────────┐
│ MySQL                     │
│                           │
│ users                     │
│ categories                │
│ recipes                   │
│ recipe_interactions       │
└───────────────────────────┘
```

---

## 34. Data Model Alignment

The product requirements directly map to the database:

```text
Authentication
    ↓
users

Recipe Management
    ↓
recipes

Category Management
    ↓
categories

User Recipe Interactions
    ↓
recipe_interactions
```

This keeps the product model and database model aligned.

---

## 35. API Boundary

The React frontend must communicate with Laravel through defined API endpoints.

The frontend must not:

- Access MySQL directly
- Contain database credentials
- Implement server-side authorization
- Trust client-side role information for security decisions

Laravel remains responsible for:

- Authentication
- Authorization
- Validation
- Database access
- File handling
- Business rules

---

## 36. Error Handling Requirements

The product must provide understandable responses for:

- Invalid login
- Invalid registration
- Duplicate email
- Unauthorized access
- Missing recipe
- Missing category
- Invalid recipe form
- Invalid image
- Network failure
- Empty search result
- Failed CRUD operation

The interface should display clear feedback without exposing sensitive backend information.

---

## 37. Out-of-Scope Confirmation

Rosui Ghor does not inherit the full technical scope of the original Shaad application.

The original application includes a subscription flow involving bdapps/AppsPro and Robi/Airtel users, along with subscription state and billing-related information.

Rosui Ghor intentionally excludes these features.

The original application also documents future AI cooking assistance. That feature is excluded because Rosui Ghor does not use AI.

The uploaded AI website-building guide identifies the PRD as the document responsible for defining what the website does, who it serves, its pages, features, user journey, and success metrics. Rosui Ghor's requirements follow that structure while keeping the scope appropriate for the university project.

---

## 38. Final Product Definition

Rosui Ghor is:

> A responsive, single-vendor recipe management and browsing website where guests can discover recipes, registered users can access protected recipe details and interact with recipes, and an administrator can manage recipes, categories, images, and basic system statistics.

The final product should remain intentionally simple.

The project is complete when the required user, recipe, category, authentication, interaction, administration, and responsive UI workflows operate correctly from React through Laravel to MySQL.
