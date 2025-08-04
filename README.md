# MovieVault 🎬

A full-stack movie platform built with modern technologies, featuring a React frontend, Node.js backend, and MySQL database. This project demonstrates a type-safe monorepo architecture with shared DTOs ensuring consistency between frontend and backend.

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

## Table of Contents
- [Architecture Overview](#architecture-overview)
- [Project Structure](#project-structure)
- [Type Safety & Shared DTOs](#type-safety--shared-dtos)
- [Getting Started](#getting-started)
- [Development](#development)
- [API Documentation](#api-documentation)

## Architecture Overview

This project is built using a modern monorepo architecture that emphasizes type safety and code reusability:

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for fast development and builds
- TailwindCSS v4 for styling
- Shadcn/ui component library
- TanStack Query for server state management
- Infinite scrolling with pagination

**Backend:**
- Node.js with Express
- TypeScript for type safety
- Prisma ORM with MySQL database
- Helmet for security

**Shared Packages:**
- DTOs with Zod validation for runtime type checking
- Centralized type definitions ensuring frontend-backend consistency

**DevOps:**
- Docker with multi-stage builds
- Turborepo for monorepo management
- ESLint and Prettier for code quality

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     Frontend    │    │     Backend     │    │    Database     │
│   (React/Vite)  │◄──►│ (Express/Node)  │◄──►│     (MySQL)     │
│     Port 5173   │    │    Port 3000    │    │    Port 3306    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         └───────────────────────┘
                     │
            ┌─────────────────┐
            │   Shared DTOs   │
            │ (@movievault)   │
            │  Zod Schemas    │
            └─────────────────┘
```

## Project Structure

```
MovieVault/
├── apps/
│   ├── backend/                 # Express.js API server
│   │   ├── src/
│   │   │   ├── controllers/     # Route handlers
│   │   │   ├── models/          # Prisma models
│   │   │   ├── routes/          # API routes
│   │   │   ├── services/        # Business logic
│   │   │   └── middlewares/     # Express middlewares
│   │   ├── prisma/
│   │   │   ├── schema.prisma    # Database schema
│   │   │   └── seed.ts          # Database seeding
│   │   └── package.json
│   │
│   └── frontend/                # React application
│       ├── src/
│       │   ├── components/      # React components
│       │   ├── hooks/           # Custom React hooks
│       │   ├── lib/             # Utilities and API calls
│       │   └── assets/          # Static assets
│       └── package.json
│
├── packages/
│   └── dtos/                    # Shared type definitions
│       ├── src/
│       │   ├── movies.dto.ts    # Movie-related DTOs
│       │   └── index.ts         # Package exports
│       └── package.json
│
├── docker-compose.yml           # Development environment
├── Dockerfile                   # Multi-stage Docker build
├── turbo.json                   # Turborepo configuration
└── package.json                 # Root package configuration
```

### Key Components

- **Monorepo Management**: Turborepo handles build orchestration and caching
- **Multi-stage Docker**: Separate development stages for frontend and backend
- **Shared DTOs**: Type-safe communication contracts between services
- **Database**: MySQL with Prisma ORM for type-safe database operations

## Type Safety & Shared DTOs

The heart of this architecture is the shared DTOs (Data Transfer Objects) package that ensures perfect type consistency between frontend and backend.

### Why Shared DTOs?

- **Single Source of Truth**: All data structures are defined once in the DTOs package
- **Runtime Validation**: Zod schemas provide both TypeScript types and runtime validation
- **API Contract**: Guarantees that frontend and backend always agree on data shapes
- **Refactoring Safety**: Changes to data structures are automatically reflected across the entire application

### DTOs Package Structure

```typescript
// packages/dtos/src/movies.dto.ts
import { z } from "zod";

const BaseMovieSchema = z.object({
    id: z.number().int(),
    title: z.string(),
    type: z.string(),
    director: z.string(),
    year: z.number().int(),
    duration: z.number().int().min(1),
    budget: z.string(),
    location: z.string(),
    genre: z.string(),
    rating: z.number().min(0).max(10)
})

export const GetMoviesDTOSchema = z.object({
    movies: z.array(BaseMovieSchema),
    totalCount: z.number().int().min(0),
    page: z.number().int().min(1),
    pageSize: z.number().int().min(1)
})

export const CreateMovieDTOSchema = BaseMovieSchema.omit({ id: true });
export const UpdateMovieDTOSchema = CreateMovieDTOSchema;

// Export TypeScript types
export type GetMoviesDTO = z.infer<typeof GetMoviesDTOSchema>;
export type CreateMovieDTO = z.infer<typeof CreateMovieDTOSchema>;
export type UpdateMovieDTO = z.infer<typeof UpdateMovieDTOSchema>;
```

### How DTOs Are Used

**In the Backend:**
```typescript
// Schemas used in validation middlewares
moviesRouter.post('/', Validators.validateBody(CreateMovieDTOSchema), MoviesController.createMovie);

moviesRouter.put('/:id', Validators.validateBody(UpdateMovieDTOSchema), MoviesController.updateMovie);

```

**In the Frontend:**
```typescript
// apps/frontend/src/lib/api.ts
import type { CreateMovieDTO, GetMoviesDTO, UpdateMovieDTO } from "@movievault/dtos";

export async function createMovie(movieData: CreateMovieDTO) {
    const response = await fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
    });
    return await response.json();
}
```

**Package Configuration:**
- Published as `@movievault/dtos` in the monorepo
- Built with TypeScript compilation
- Imported by both frontend and backend applications
- Automatic rebuilding in Docker development environment

## Getting Started

### Prerequisites

- **Node.js** 18+ (Unless you are using Docker)
- **Docker** and **Docker Compose**
- **Git**

### Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MovieVault
   ```

2. **Start the development environment**
   ```bash
   docker-compose up
   ```

   This will:
   - Start MySQL database on port 3306
   - Start backend API on port 3000
   - Start frontend dev server on port 5173
   - Automatically build shared DTOs package
   - Set up database schema with Prisma
   - Seed the database with sample data

3. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - Database: localhost:3306 (mysql/mysql)

### Manual Setup (Alternative)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up the database using Docker**
   ```bash
   docker compose up -d database
   ```

3. **Configure environment**
   ```bash
   echo "DATABASE_URL=mysql://root:mysql@localhost:3306/movies_platform" > apps/backend/.env
   ```
   Or just manually create a `.env` file in `apps/backend/` with the following content:
   ```env
    DATABASE_URL=mysql://root:mysql@localhost:3306/movies_platform
    ```

4. **Initialize database**
   ```bash
   npm run prisma:push -w backend
   npm run seed -w backend
   ```

5. **Start development servers**
   ```bash
   npm run dev
   ```

## Development

### Available Scripts

- **`npm run dev`** - Start both frontend and backend in development mode

### Development Workflow

1. **Database Changes**: Modify `apps/backend/prisma/schema.prisma`
2. **API Changes**: Update controllers, models, and routes in `apps/backend/src/`
3. **Frontend Changes**: Modify components and logic in `apps/frontend/src/`
4. **Shared Types**: Update DTOs in `packages/dtos/src/`

### Environment Configuration

**Backend Environment Variables:**
```env
DATABASE_URL=mysql://root:mysql@database:3306/movies_platform
NODE_ENV=development
PORT=3000
```

**Database Seeding:**
The application includes sample movie data that gets automatically seeded when using Docker setup.

## API Documentation

### Base URL
`http://localhost:3000`

### Movies Endpoints

#### GET `/movies`
Retrieve paginated list of movies with optional search.

**Query Parameters:**
- `page` (number, optional): Page number (default: 1)
- `size` (number, optional): Items per page (default: 10)
- `query` (string, optional): Search term for movie titles

**Response:**
```typescript
{
  movies: Array<{
    id: number,
    title: string,
    type: string,
    director: string,
    year: number,
    duration: number,
    budget: string,
    location: string,
    genre: string,
    rating: number
  }>,
  totalCount: number,
  page: number,
  pageSize: number
}
```

#### POST `/movies`
Create a new movie entry.

**Request Body:**
```typescript
{
  title: string,
  type: string,
  director: string,
  year: number,
  duration: number,
  budget: string,
  location: string,
  genre: string,
  rating: number // 0-10
}
```

**Response:** Created movie object with generated `id`

#### PUT `/movies/:id`
Update an existing movie.

**Parameters:**
- `id` (number): Movie ID

**Request Body:** Same as POST `/movies`

**Response:** Updated movie object

#### DELETE `/movies/:id`
Delete a movie entry.

**Parameters:**
- `id` (number): Movie ID

**Response:** 204 No Content on success

### Type Definitions

All API endpoints use the shared DTOs from `@movievault/dtos`:

```typescript
import { 
  GetMoviesDTO, 
  CreateMovieDTO, 
  UpdateMovieDTO 
} from '@movievault/dtos';
```

---

