# KSLab Test Project

A NestJS-based library management system API that allows searching books and managing book borrowings.

## Prerequisites

- Node.js (v18 or higher recommended)
- PostgreSQL (v13 or higher)
- Yarn package manager

## Setup Instructions

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

3. Configure PostgreSQL:

   - Create a new PostgreSQL database
   - Update both TypeORM configuration files with your database credentials:

   a. Update `src/entities/ormconfig.json`:

   ```json
   {
     "name": "default",
     "type": "postgres",
     "host": "localhost",
     "port": 5432,
     "username": "your_username",
     "database": "your_database_name",
     "synchronize": false,
     "entities": ["entities/*.js"]
   }
   ```

   b. Update database configuration in `src/app.module.ts`:

   ```typescript
   TypeOrmModule.forRoot({
     type: 'postgres',
     host: 'localhost',
     port: 5432,
     username: 'your_username',
     database: 'your_database_name',
     entities: [__dirname + '/entities/entities/*.js'],
     synchronize: false,
     logging: true,
   });
   ```

   Important: Make sure both configurations match exactly to avoid connection issues.

## Running the Application

### Development Mode

```bash
yarn start:dev
```

### Production Mode

```bash
yarn build
yarn start:prod
```
Then you can go to http://localhost:3000/api

## API Documentation
![Screenshot_4-2-2025_165431_localhost](https://github.com/user-attachments/assets/0ac9c511-8983-4a4c-855e-06b6b1e04c99)

### Search Books

Endpoint to search for books based on various criteria.

**GET** `/books/search`

Query Parameters:

- `title` (optional): Filter by book title
- `author` (optional): Filter by author name
- `genre` (optional): Filter by book genre
- `rating` (optional): Filter by minimum rating

Example Request:

```bash
GET /books/search?title=Harry&author=Rowling&genre=Fantasy&rating=4
```

Example Response:

```json
[
  {
    "id": 1,
    "title": "Harry Potter and the Philosopher's Stone",
    "author": "J.K. Rowling",
    "genre": "Fantasy",
    "rating": 4.8
  }
]
```

### Get User Borrows

Endpoint to retrieve all borrow records for a specific user.

**GET** `/users/{userId}/borrows`

Parameters:

- `userId` (required): ID of the user

Returns:

- 200: All borrow records for the user
- 404: User not found

Example Request:

```bash
GET /users/123/borrows
```

Example Response:

```json
[
  {
    "id": 1,
    "userId": 123,
    "bookId": 1,
    "borrowDate": "2024-02-01T00:00:00.000Z",
    "returnDate": "2024-02-15T00:00:00.000Z",
    "status": "borrowed"
  }
]
```

### Borrow Book

Endpoint to borrow a book for a user.

**POST** `/books/borrow`

Request Body:

```json
{
  "userId": 123,
  "bookId": 1
}
```

Response:

```json
{
  "id": 1,
  "userId": 123,
  "bookId": 1,
  "borrowDate": "2024-02-04T08:26:50.000Z",
  "returnDate": null
}
```

Error Responses:

- 404: User or book not found
- 400: Book is already borrowed

### Return Book

Endpoint to return a borrowed book.

**POST** `/books/return`

Request Body:

```json
{
  "bookId": 1
}
```

Response:

```json
{
  "id": 1,
  "userId": 123,
  "bookId": 1,
  "borrowDate": "2024-02-04T08:26:50.000Z",
  "returnDate": "2024-02-04T10:26:50.000Z",
  "status": "returned"
}
```

Error Responses:

- 404: Book not found
- 400: Book is not currently borrowed

## Testing

### Run Unit Tests

```bash
yarn test
```

### Run E2E Tests

```bash
yarn test:e2e
```
