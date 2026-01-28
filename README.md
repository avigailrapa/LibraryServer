# Library API Documentation

## Base URL
```
http://localhost:5000
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | כתובת החיבור ל-MongoDB (MongoDB connection string) |
| `JWT_SECRET` | סוד ליצירת JWT token (Secret for JWT token generation) |
| `PORT` | הפורט של השרת (Server port, default: 5000) |

---

## Books Resource

### 1. Get All Books

**URL:** `/books`  
**Method:** `GET`  
**Description:** Get all books  
**Permissions:** All users

**Parameters:**
- `page` (optional) - Page number for pagination
- `limit` (optional) - Number of items per page

**Body:** None  
**Headers:** Optional

**Returns:** Array of books

**Status Codes:**
- `200 OK`

---

### 2. Get Book by ID

**URL:** `/books/:id`  
**Method:** `GET`  
**Description:** Get book by its ID  
**Permissions:** All users

**Parameters:**
- `id` (required) - Book ID

**Body:** None  
**Headers:** Optional

**Returns:** Book object

**Status Codes:**
- `200 OK`
- `404 Not Found`

---

### 3. Get Books by Name

**URL:** `/books/name/:name`  
**Method:** `GET`  
**Description:** Search books by name (partial match, case-insensitive)  
**Permissions:** All users

**Parameters:**
- `name` (required) - Book name to search

**Body:** None  
**Headers:** Optional

**Returns:** Array of books

**Status Codes:**
- `200 OK`
- `400 Bad Request`

---

### 4. Add New Book

**URL:** `/books`  
**Method:** `POST`  
**Description:** Add a new book  
**Permissions:** Admin

**Parameters:** None

**Body:**
```json
{
  "name": "Book Name",
  "author": "Author Name"
}
```

**Headers:**
```
Authorization: Bearer <token>
```

**Returns:** Newly created book

**Status Codes:**
- `201 Created`
- `400 Bad Request`

---

### 5. Update Book

**URL:** `/books/:id`  
**Method:** `PUT`  
**Description:** Update details of a book  
**Permissions:** Admin

**Parameters:**
- `id` (required) - Book ID

**Body:** Fields to update (e.g., name, author)
```json
{
  "name": "Updated Book Name",
  "author": "Updated Author Name"
}
```

**Headers:**
```
Authorization: Bearer <token>
```

**Returns:** Updated book

**Status Codes:**
- `200 OK`
- `404 Not Found`

---

### 6. Borrow Book

**URL:** `/books/borrow/:id/:idCustomer`  
**Method:** `PUT`  
**Description:** Borrow a book  
**Permissions:** Registered user

**Parameters:**
- `id` (required) - Book ID
- `idCustomer` (required) - User ID

**Body:** None

**Headers:**
```
Authorization: Bearer <token>
```

**Returns:** Updated book (isborrow: true, lendingArr updated)

**Status Codes:**
- `200 OK`
- `400 Bad Request`
- `404 Not Found`

---

### 7. Return Book

**URL:** `/books/return/:id`  
**Method:** `PUT`  
**Description:** Return a borrowed book  
**Permissions:** Registered user

**Parameters:**
- `id` (required) - Book ID

**Body:** None

**Headers:**
```
Authorization: Bearer <token>
```

**Returns:** Updated book (isborrow: false)

**Status Codes:**
- `200 OK`
- `400 Bad Request`
- `404 Not Found`

---

### 8. Delete Book

**URL:** `/books/:id`  
**Method:** `DELETE`  
**Description:** Delete a book  
**Permissions:** Admin

**Parameters:**
- `id` (required) - Book ID

**Body:** None

**Headers:**
```
Authorization: Bearer <token>
```

**Returns:** Deleted book object

**Status Codes:**
- `200 OK`
- `404 Not Found`

---

## Users Resource

### 1. User Login

**URL:** `/users/login`  
**Method:** `POST`  
**Description:** User login  
**Permissions:** All users

**Parameters:** None

**Body:**
```json
{
  "email": "user@example.com",
  "password": "user_password"
}
```

**Headers:** None

**Returns:** JWT token
```json
{
  "token": "jwt_token_here"
}
```

**Status Codes:**
- `200 OK`
- `403 Forbidden`

---

### 2. User Registration

**URL:** `/users/register`  
**Method:** `POST`  
**Description:** Register a new user  
**Permissions:** Admin / Public

**Parameters:** None

**Body:**
```json
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "user_password",
  "role": "user_role"
}
```

**Headers:** None

**Returns:** Newly created user object

**Status Codes:**
- `201 Created`
- `409 Conflict`

---

### 3. Get All Users

**URL:** `/users`  
**Method:** `GET`  
**Description:** Get all users  
**Permissions:** Admin

**Parameters:**
- `page` (optional) - Page number for pagination
- `limit` (optional) - Number of items per page

**Body:** None

**Headers:**
```
Authorization: Bearer <token>
```

**Returns:** Array of users

**Status Codes:**
- `200 OK`

