# Rosui Ghor API Documentation

- **Base URL**: `http://localhost:8000/api`
- **Authentication**: Laravel Sanctum (`Authorization: Bearer <token>`)
- **Content-Type**: `application/json` (or `multipart/form-data` for file uploads)
- **Accept**: `application/json`

---

## 1. Authentication Endpoints

### 1.1 Register User

- **Method**: `POST`
- **URI**: `/register`
- **Access**: Public
- **Request Body**:

  ```json
  {
    "name": "Fatima Rahman",
    "email": "fatima@example.com",
    "password": "password123",
    "password_confirmation": "password123"
  }
  ```

- **Validation Rules**:
  - `name`: required | string | max:255
  - `email`: required | string | email | unique:users,email
  - `password`: required | string | min:6 | confirmed
- **Response (201 Created)**:

  ```json
  {
    "message": "User registered successfully.",
    "token": "1|plain_text_token_here...",
    "user": {
      "id": 3,
      "name": "Fatima Rahman",
      "email": "fatima@example.com",
      "role": "user",
      "created_at": "2026-08-18T00:00:00.000000Z"
    }
  }
  ```

---

### 1.2 Login

- **Method**: `POST`
- **URI**: `/login`
- **Access**: Public
- **Request Body**:

  ```json
  {
    "email": "user@rosuighor.test",
    "password": "password"
  }
  ```

- **Response (200 OK)**:

  ```json
  {
    "message": "Login successful.",
    "token": "2|plain_text_token_here...",
    "user": {
      "id": 2,
      "name": "Demo Cook",
      "email": "user@rosuighor.test",
      "role": "user",
      "created_at": "2026-08-18T00:00:00.000000Z"
    }
  }
  ```

- **Response (401 Unauthorized)**:

  ```json
  {
    "message": "These credentials do not match our records."
  }
  ```

---

### 1.3 Logout

- **Method**: `POST`
- **URI**: `/logout`
- **Access**: Authenticated (`auth:sanctum`)
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:

  ```json
  {
    "message": "Successfully logged out."
  }
  ```

---

## 2. User Profile Endpoints

### 2.1 Get Current User Profile

- **Method**: `GET`
- **URI**: `/user`
- **Access**: Authenticated (`auth:sanctum`)
- **Response (200 OK)**:

  ```json
  {
    "id": 2,
    "name": "Demo Cook",
    "email": "user@rosuighor.test",
    "role": "user",
    "created_at": "2026-08-18T00:00:00.000000Z"
  }
  ```

---

### 2.2 Update Profile

- **Method**: `PUT`
- **URI**: `/user`
- **Access**: Authenticated (`auth:sanctum`)
- **Request Body**:

  ```json
  {
    "name": "Aqib Jawwad (Head Chef)",
    "email": "user@rosuighor.test"
  }
  ```

- **Response (200 OK)**:

  ```json
  {
    "message": "Profile updated successfully.",
    "user": {
      "id": 2,
      "name": "Aqib Jawwad (Head Chef)",
      "email": "user@rosuighor.test",
      "role": "user",
      "created_at": "2026-08-18T00:00:00.000000Z"
    }
  }
  ```

---

## 3. Category Endpoints

### 3.1 List Categories

- **Method**: `GET`
- **URI**: `/categories`
- **Access**: Public
- **Response (200 OK)**:

  ```json
  [
    {
      "id": 1,
      "name": "Breakfast",
      "description": "Morning meals, quick bites, and breakfast favorites.",
      "recipes_count": 3,
      "created_at": "2026-08-18T00:00:00.000000Z",
      "updated_at": "2026-08-18T00:00:00.000000Z"
    }
  ]
  ```

---

### 3.2 Create Category

- **Method**: `POST`
- **URI**: `/categories`
- **Access**: Admin Only (`auth:sanctum` + `admin`)
- **Request Body**:

  ```json
  {
    "name": "Desserts & Sweets",
    "description": "Traditional sweet endings and puddings"
  }
  ```

- **Response (201 Created)**:

  ```json
  {
    "id": 5,
    "name": "Desserts & Sweets",
    "description": "Traditional sweet endings and puddings",
    "recipes_count": 0,
    "created_at": "2026-08-18T00:00:00.000000Z",
    "updated_at": "2026-08-18T00:00:00.000000Z"
  }
  ```

---

### 3.3 Update Category

- **Method**: `PUT`
- **URI**: `/categories/{id}`
- **Access**: Admin Only (`auth:sanctum` + `admin`)
- **Request Body**:

  ```json
  {
    "name": "Desserts & Pastries",
    "description": "Updated description"
  }
  ```

- **Response (200 OK)**:

  ```json
  {
    "id": 5,
    "name": "Desserts & Pastries",
    "description": "Updated description",
    "recipes_count": 0,
    "created_at": "2026-08-18T00:00:00.000000Z",
    "updated_at": "2026-08-18T00:00:00.000000Z"
  }
  ```

---

### 3.4 Delete Category

- **Method**: `DELETE`
- **URI**: `/categories/{id}`
- **Access**: Admin Only (`auth:sanctum` + `admin`)
- **Response (200 OK)**:

  ```json
  {
    "message": "Category deleted successfully."
  }
  ```

- **Response (409 Conflict)** (when recipes exist):

  ```json
  {
    "message": "This category contains recipes and cannot be deleted until the related recipes are handled."
  }
  ```

---

## 4. Recipe Endpoints

### 4.1 List Recipes

- **Method**: `GET`
- **URI**: `/recipes`
- **Access**: Public
- **Query Parameters**:
  - `search` (optional): search term matched against recipe `title`
  - `category_id` (optional): category foreign key filter
  - `page` (optional, default: 1): page number
  - `per_page` (optional, default: 8): number of recipes per page
  - `limit` (optional): returns unpaginated array (for featured/latest)
- **Response (200 OK)**:

  ```json
  {
    "data": [
      {
        "id": 1,
        "category_id": 1,
        "category": {
          "id": 1,
          "name": "Breakfast",
          "description": "Morning meals, quick bites, and breakfast favorites."
        },
        "title": "Fluffy Buttermilk Pancakes",
        "description": "Golden-brown, light and airy pancakes served with warm maple syrup and fresh berries.",
        "image_url": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
        "image_path": null,
        "cooking_time": 25,
        "difficulty": "Easy",
        "created_at": "2026-08-18T00:00:00.000000Z",
        "updated_at": "2026-08-18T00:00:00.000000Z"
      }
    ],
    "meta": {
      "current_page": 1,
      "last_page": 2,
      "per_page": 8,
      "total": 12
    }
  }
  ```

---

### 4.2 Get Recipe Details (Protected)

- **Method**: `GET`
- **URI**: `/recipes/{id}`
- **Access**: Authenticated (`auth:sanctum`)
- **Headers**: `Authorization: Bearer <token>`
- **Response (200 OK)**:

  ```json
  {
    "id": 1,
    "category_id": 1,
    "category": {
      "id": 1,
      "name": "Breakfast",
      "description": "Morning meals, quick bites, and breakfast favorites."
    },
    "title": "Fluffy Buttermilk Pancakes",
    "description": "Golden-brown, light and airy pancakes served with warm maple syrup and fresh berries.",
    "image_url": "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80",
    "image_path": null,
    "cooking_time": 25,
    "difficulty": "Easy",
    "ingredients": "2 cups all-purpose flour\n2 tbsp sugar\n2 tsp baking powder\n1 tsp baking soda\n1/2 tsp salt\n2 cups buttermilk\n2 large eggs\n1/4 cup melted butter",
    "instructions": "1. In a large bowl, whisk together flour, sugar, baking powder, baking soda, and salt.\n2. In a separate bowl, whisk buttermilk, eggs, and melted butter until combined.\n3. Pour wet ingredients into dry ingredients and stir gently until just combined.\n4. Heat a lightly greased skillet or griddle over medium heat.\n5. Pour 1/4 cup batter for each pancake.\n6. Cook until bubbles appear on the surface (2-3 minutes), flip and cook until golden brown.",
    "created_at": "2026-08-18T00:00:00.000000Z",
    "updated_at": "2026-08-18T00:00:00.000000Z"
  }
  ```

---

### 4.3 Create Recipe

- **Method**: `POST`
- **URI**: `/recipes`
- **Access**: Admin Only (`auth:sanctum` + `admin`)
- **Content-Type**: `application/json` or `multipart/form-data`
- **Request Parameters / Fields**:
  - `title` (required): string | max:255
  - `description` (required): string
  - `category_id` (required): integer | exists:categories,id
  - `cooking_time` (required): integer | min:1
  - `difficulty` (required): in:Easy,Medium,Hard
  - `ingredients` (required): string (newline separated)
  - `instructions` (required): string (numbered or newline separated)
  - `image_url` (optional): URL string
  - `image` (optional): uploaded file (image/jpeg, image/png, image/webp, max 2MB)
- **Response (201 Created)**: Returns created `Recipe` resource with `category`.

---

### 4.4 Update Recipe

- **Method**: `PUT` or `POST`
- **URI**: `/recipes/{id}`
- **Access**: Admin Only (`auth:sanctum` + `admin`)
- **Response (200 OK)**: Returns updated `Recipe` resource with `category`.

---

### 4.5 Delete Recipe

- **Method**: `DELETE`
- **URI**: `/recipes/{id}`
- **Access**: Admin Only (`auth:sanctum` + `admin`)
- **Response (200 OK)**:

  ```json
  {
    "message": "Recipe deleted successfully."
  }
  ```

---

## 5. Recipe Interaction Endpoints

### 5.1 Get Interaction Status

- **Method**: `GET`
- **URI**: `/recipes/{recipe}/interactions`
- **Access**: Authenticated (`auth:sanctum`)
- **Response (200 OK)**:

  ```json
  {
    "favorited": true
  }
  ```

---

### 5.2 Toggle Interaction (Favorite)

- **Method**: `POST`
- **URI**: `/recipes/{recipe}/interactions`
- **Access**: Authenticated (`auth:sanctum`)
- **Response (200 OK)**:

  ```json
  {
    "favorited": true,
    "message": "Recipe added to favorites."
  }
  ```

---

## 6. Admin Statistics Endpoint

### 6.1 Get Dashboard Statistics

- **Method**: `GET`
- **URI**: `/admin/statistics`
- **Access**: Admin Only (`auth:sanctum` + `admin`)
- **Response (200 OK)**:

  ```json
  {
    "total_users": 2,
    "total_recipes": 12,
    "total_categories": 4,
    "recent_recipes": [
      {
        "id": 12,
        "title": "Bengali Singara (Spiced Potato Samosa)",
        "cooking_time": 50,
        "difficulty": "Hard",
        "category": { "name": "Snacks" }
      }
    ]
  }
  ```
