# Rosui Ghor — Backend & Frontend Integration Audit

- **Project**: Rosui Ghor (Single-Vendor Recipe Web Application)
- **Role**: Senior Laravel Backend Engineer & Database Architect
- **Audit Date**: 2026-08-18
- **Backend Stack**: Laravel (v11/12/13), PHP 8.5.1, MySQL (port 3306), Laravel Sanctum
- **Frontend Stack**: React 19, TypeScript, Vite, Tailwind CSS (v4), Axios, TanStack Router
- **Status**: Audit Completed — Ready for Backend Implementation & API Integration

---

## 1. Frontend API Expectations

The frontend currently utilizes a mock service layer in `src/services/` (`authService.ts`, `recipeService.ts`, `categoryService.ts`, `userService.ts`, `interactionService.ts`, and `mockDb.ts`) backed by an Axios HTTP client configured in `src/services/apiClient.ts`.

Key expectations from the frontend:

- **Base URL**: Configured via `import.meta.env.VITE_API_URL` (defaults to `/api` or `http://localhost:8000/api`).
- **Headers**: `Accept: application/json`, and automatic injection of `Authorization: Bearer <token>` when a token exists in `localStorage` under `rosui_ghor_token`.
- **Response Envelopes**:
  - Single entity endpoints return `{ data: Resource }` or the direct `Resource` object.
  - Paginated collections return `{ data: Resource[], meta: Pagination }` where `meta` includes `current_page`, `last_page`, `per_page`, and `total`.
  - Non-paginated simple collections (e.g. categories, latest/featured) return `{ data: Resource[] }` or `Resource[]`.
- **Latency & Error Handling**: The frontend expects standard HTTP status codes (`200`, `201`, `204`, `401`, `403`, `404`, `409`, `422`, `500`) with JSON `{ message: string, errors?: Record<string, string[]> }`.

---

## 2. Required Backend Endpoints

| HTTP Method | Route URI | Access Level | Controller & Action | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/register` | Public | `AuthController@register` | Register a new user account |
| `POST` | `/api/login` | Public | `AuthController@login` | Authenticate user & return Sanctum token |
| `POST` | `/api/logout` | Authenticated | `AuthController@logout` | Invalidate current user Sanctum token |
| `GET` | `/api/user` | Authenticated | `UserController@show` | Return current authenticated user profile |
| `PUT` | `/api/user` | Authenticated | `UserController@update` | Update current user name / email |
| `GET` | `/api/recipes` | Public | `RecipeController@index` | List recipe previews (search, filter, pagination) |
| `GET` | `/api/recipes/{id}` | Authenticated | `RecipeController@show` | Return full recipe details (ingredients, steps) |
| `POST` | `/api/recipes` | Admin Only | `RecipeController@store` | Create new recipe (support URL & file upload) |
| `PUT` / `POST` | `/api/recipes/{id}` | Admin Only | `RecipeController@update` | Update recipe details and image |
| `DELETE` | `/api/recipes/{id}` | Admin Only | `RecipeController@destroy` | Permanently delete recipe |
| `GET` | `/api/categories` | Public | `CategoryController@index` | List all categories with recipe counts |
| `GET` | `/api/categories/{id}` | Public | `CategoryController@show` | Retrieve a single category |
| `POST` | `/api/categories` | Admin Only | `CategoryController@store` | Create a new category |
| `PUT` | `/api/categories/{id}` | Admin Only | `CategoryController@update` | Update category name & description |
| `DELETE` | `/api/categories/{id}` | Admin Only | `CategoryController@destroy` | Delete category with relational guard (409 if has recipes) |
| `GET` | `/api/recipes/{recipe}/interactions` | Authenticated | `RecipeInteractionController@show` | Get current user's interaction state |
| `POST` | `/api/recipes/{recipe}/interactions` | Authenticated | `RecipeInteractionController@toggle` | Toggle favorite state for current user |
| `GET` | `/api/admin/statistics` | Admin Only | `AdminStatisticsController@index` | Get total users, total recipes, total categories |

---

## 3. Authentication Contract

- **Mechanism**: Laravel Sanctum Bearer token authentication.
- **Login Request**:

  ```json
  {
    "email": "user@rosuighor.test",
    "password": "password"
  }
  ```

- **Login Response (200 OK)**:

  ```json
  {
    "token": "1|sanctum_plain_text_token_string...",
    "user": {
      "id": 1,
      "name": "Demo User",
      "email": "user@rosuighor.test",
      "role": "user",
      "created_at": "2026-08-18T00:00:00.000000Z"
    }
  }
  ```

- **Register Request**:

  ```json
  {
    "name": "Fatima Rahman",
    "email": "fatima@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }
  ```

- **Register Response (201 Created)**: Same structure as login response (`token` + `user`).
- **Current User (`GET /api/user`)**: Returns authenticated `User` resource (`id`, `name`, `email`, `role`, `created_at`).

---

## 4. Recipe Contract

### Recipe Preview Shape (Public List — `GET /api/recipes`)

```json
{
  "id": 1,
  "category_id": 1,
  "category": {
    "id": 1,
    "name": "Breakfast",
    "description": "Morning meals and quick breakfast ideas"
  },
  "title": "Fluffy Buttermilk Pancakes",
  "description": "Golden-brown, light and airy pancakes served with warm maple syrup.",
  "image_url": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
  "image_path": null,
  "cooking_time": 25,
  "difficulty": "Easy",
  "created_at": "2026-08-18T00:00:00.000000Z",
  "updated_at": "2026-08-18T00:00:00.000000Z"
}
```

*Note: Public listing excludes complete `ingredients` and `instructions` to satisfy course security requirements.*

### Protected Recipe Detail Shape (`GET /api/recipes/{id}`)

Requires valid Bearer token. Includes full `ingredients` and `instructions`.

```json
{
  "data": {
    "id": 1,
    "category_id": 1,
    "category": {
      "id": 1,
      "name": "Breakfast",
      "description": "Morning meals and quick breakfast ideas"
    },
    "title": "Fluffy Buttermilk Pancakes",
    "description": "Golden-brown, light and airy pancakes served with warm maple syrup.",
    "image_url": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
    "image_path": null,
    "cooking_time": 25,
    "difficulty": "Easy",
    "ingredients": "2 cups all-purpose flour\n2 tbsp sugar\n2 tsp baking powder\n1 tsp baking soda\n1/2 tsp salt\n2 cups buttermilk\n2 large eggs\n1/4 cup melted butter",
    "instructions": "1. In a large bowl, whisk flour, sugar, baking powder, baking soda, and salt.\n2. In a separate bowl, whisk buttermilk, eggs, and melted butter.\n3. Pour wet ingredients into dry ingredients and stir gently until just combined (lumps are fine).\n4. Heat a lightly greased griddle over medium heat.\n5. Pour 1/4 cup batter for each pancake.\n6. Cook until bubbles appear on the surface (2-3 minutes), then flip and cook until golden brown.",
    "created_at": "2026-08-18T00:00:00.000000Z",
    "updated_at": "2026-08-18T00:00:00.000000Z"
  }
}
```

---

## 5. Category Contract

### Category Resource Shape

```json
{
  "id": 1,
  "name": "Breakfast",
  "description": "Morning meals and quick breakfast ideas",
  "recipes_count": 3,
  "created_at": "2026-08-18T00:00:00.000000Z",
  "updated_at": "2026-08-18T00:00:00.000000Z"
}
```

### Relational Integrity Guard

When attempting to delete a category that has associated recipes (`DELETE /api/categories/{id}`), the backend must reject the request with HTTP `409 Conflict`:

```json
{
  "message": "This category contains recipes and cannot be deleted until the related recipes are handled."
}
```

---

## 6. User Contract

- **Profile Retrieval (`GET /api/user`)**: Returns current user object.
- **Profile Update (`PUT /api/user`)**:
  - Request body: `{ "name": "Updated Name", "email": "updated@example.com" }`
  - Validates `name` (required), `email` (required, valid email, unique except current user).
  - Returns updated user resource.

---

## 7. Interaction Contract

- **Endpoint**: `POST /api/recipes/{recipe}/interactions`
- **Supported Type**: `"favorite"`
- **Behavior**: Toggles favorite status for the authenticated user.
- **Response**:

  ```json
  {
    "favorited": true,
    "message": "Recipe added to favorites"
  }
  ```

- **State Check (`GET /api/recipes/{recipe}/interactions`)**:

  ```json
  {
    "favorited": true
  }
  ```

---

## 8. Image Upload Contract

The application supports two mutually compatible image sources:

1. **External Image URL**: `image_url` containing an HTTPS link (e.g. Unsplash or external CDN). `image_path` is `null`.
2. **Uploaded Image File**: `image` file uploaded via `multipart/form-data`. Stored in `storage/app/public/recipes` and exposed via `/storage/recipes/...`. `image_path` stores the relative storage path, and `image_url` stores the asset URL or null.

Validation Rules:

- MIME types: `image/jpeg,image/png,image/webp,image/avif`.
- Max size: `2048 KB` (2 MB).
- File replacement: On recipe update, if a new image file is uploaded, the prior local file is removed from storage.

---

## 9. Pagination Contract

- **Query Parameters**:
  - `page`: 1-based page index (e.g., `?page=1`).
  - `per_page`: Number of items per page (default: `12` or frontend requested `8`).
  - `search`: Filter matching title case-insensitively.
  - `category_id`: Filter matching category foreign key.
- **Envelope Structure**:

  ```json
  {
    "data": [ ... ],
    "meta": {
      "current_page": 1,
      "last_page": 2,
      "per_page": 8,
      "total": 12
    }
  }
  ```

---

## 10. Error Response Contract

All errors return JSON structure:

- **Validation Errors (422 Unprocessable Entity)**:

  ```json
  {
    "message": "The given data was invalid.",
    "errors": {
      "email": ["The email has already been taken."],
      "title": ["The title field is required."]
    }
  }
  ```

- **Unauthenticated (401)**:

  ```json
  {
    "message": "Unauthenticated."
  }
  ```

- **Forbidden / Unauthorized Role (403)**:

  ```json
  {
    "message": "Unauthorized. Administrator access required."
  }
  ```

- **Not Found (404)**:

  ```json
  {
    "message": "Resource not found."
  }
  ```

- **Conflict (409)**:

  ```json
  {
    "message": "This category contains recipes and cannot be deleted until the related recipes are handled."
  }
  ```

---

## 11. Frontend/Backend Mismatches & Resolutions

| Item | Frontend Current Implementation | Laravel Backend Specification | Resolution |
| :--- | :--- | :--- | :--- |
| **API Base URL** | `apiClient.ts` has mock fallback | `http://localhost:8000/api` | Configure `.env` `VITE_API_URL=http://localhost:8000/api` and update services to use Axios. |
| **Recipe Ingredients/Steps** | Stored as text strings with newline delimiters (`\n`) | Stored as `text` columns in MySQL | Frontend already parses newlines for ingredients (`\n`) and instructions. Backend preserves text columns. |
| **Category Recipe Counts** | Frontend dynamically counted in mock | Eloquent `withCount('recipes')` | Controller uses `Category::withCount('recipes')->get()`, matching `recipes_count` property seamlessly. |
| **Protected Recipe Details** | Client-side mock allowed fetching | Protected Sanctum route `auth:sanctum` | Endpoint strictly enforces authentication on backend before returning ingredients/instructions. |
| **Admin Authorization** | Client-side role flag in `User` state | Middleware `EnsureAdmin` / `role === 'admin'` check | Add custom middleware `admin` in Laravel protecting `/api/recipes` mutations, `/api/categories` mutations, and `/api/admin/statistics`. |

---

## 12. Required Backend Work

1. **Backend Foundation**:
   - Install Laravel API routes and Sanctum configuration.
   - Configure CORS in `config/cors.php` for `http://localhost:5173`, `http://localhost:8080`, `http://127.0.0.1:8080`.
   - Create symbolic link `php artisan storage:link` for public recipe image uploads.
2. **Database Migrations & Models**:
   - `users`: add `role` column (`enum('user', 'admin')`, default `'user'`).
   - `categories`: `id`, `name` (unique), `description` (nullable text), timestamps.
   - `recipes`: `id`, `category_id` (foreign key to `categories.id` with `onDelete('restrict')`), `title`, `description`, `image_url` (nullable), `image_path` (nullable), `ingredients` (text), `cooking_time` (unsigned integer), `difficulty` (`enum('Easy', 'Medium', 'Hard')`), `instructions` (text), timestamps.
   - `recipe_interactions`: `id`, `user_id` (foreign key `cascade`), `recipe_id` (foreign key `cascade`), `interaction_type` (default `'favorite'`), `unique(['user_id', 'recipe_id', 'interaction_type'])`, timestamps.
   - Eloquent Models: `User`, `Category`, `Recipe`, `RecipeInteraction` with fillable attributes, casts, and relationship definitions.
3. **Seeders**:
   - `CategorySeeder`: Seeds "Breakfast", "Lunch", "Dinner", "Snacks".
   - `UserSeeder`: Seeds Admin (`admin@rosuighor.test` / `password`) and Regular User (`user@rosuighor.test` / `password`).
   - `RecipeSeeder`: Seeds all 12 initial recipes with realistic cooking times, difficulties, ingredients, instructions, and high-quality image URLs.
4. **Controllers & Form Requests**:
   - `AuthController` (`register`, `login`, `logout`).
   - `UserController` (`show`, `update`).
   - `RecipeController` (`index`, `show`, `store`, `update`, `destroy`).
   - `CategoryController` (`index`, `show`, `store`, `update`, `destroy`).
   - `RecipeInteractionController` (`show`, `toggle`).
   - `AdminStatisticsController` (`index`).
   - Form Requests: `RegisterRequest`, `LoginRequest`, `UpdateProfileRequest`, `StoreRecipeRequest`, `UpdateRecipeRequest`, `StoreCategoryRequest`, `UpdateCategoryRequest`.
   - Middleware: `EnsureAdmin` for role-based authorization.
5. **Frontend Services Integration**:
   - Update `src/services/authService.ts`, `recipeService.ts`, `categoryService.ts`, `userService.ts`, `interactionService.ts` to call the live Laravel REST API via `apiClient`.
   - Update `src/context/AuthContext.tsx` to utilize Sanctum tokens.
   - Test end-to-end and document in `docs/api-documentation.md` and `docs/backend-validation-report.md`.
