# GEMINI.md - Instructional Context for Evalio

This document provides architectural context, development conventions, and operational guidelines for the **Evalio** project. Use this as the foundational truth for understanding and extending the codebase.

## 1. Project Overview
Evalio is a high-performance, monolithic Next.js application designed to help developers train their code output prediction accuracy. It features a refined, "Editorial Brutalist" aesthetic and focuses on a fast, distraction-free user experience.

### Main Technologies
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI/UX**: React 19, Tailwind CSS 4, `motion` (Framer Motion), `shadcn/ui` components
- **Database**: Prisma ORM with SQLite
- **Authentication**: NextAuth.js (Credentials Provider)
- **Validation**: Zod

## 2. Architecture & Directory Structure
The project follows a standard Next.js App Router structure with logical separation of concerns:

- `app/`: Contains all routes, layouts, and API endpoints.
  - `(dashboard)/`: Grouped routes for authenticated user features (Dashboard, Quiz, Profile).
  - `(marketing)/`: Grouped routes for public-facing pages (Landing, Signin, Signup).
  - `api/`: Backend Route Handlers for auth, quiz attempts, and profile management.
- `components/`: Reusable React components.
  - `ui/`: Atom-level shadcn/ui components.
  - `auth/`: Specialized authentication forms.
- `lib/`: Shared utility functions, Prisma client, and authentication configuration.
- `data/`: Static or seed data, including the central `questions.ts` repository.
- `prisma/`: Database schema (`schema.prisma`) and migrations.
- `proxy.ts`: Next.js 16 middleware for edge-side authentication and routing control.

## 3. Building and Running
### Commands
- **Start Development**: `npm run dev`
- **Build Production**: `npm run build`
- **Start Production**: `npm run start`
- **Linting**: `npm run lint`

### Database Operations
- **Run Migrations**: `npx prisma migrate dev`
- **Generate Client**: `npx prisma generate`
- **Open Studio**: `npx prisma studio`

### Environment Variables
Required in `.env.local`:
```bash
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret"
```

## 4. Development Conventions
### Architectural Mandates
- **Client/Server Boundaries**: Prefer React Server Components (RSC) for data fetching. Use Client Components only for interactivity (e.g., the quiz engine).
- **Type Safety**: Strictly define types for all API payloads and database models. Use Zod for runtime validation.
- **Styling**: Adhere to Tailwind CSS 4 patterns. Use semantic tokens (e.g., `bg-primary`, `text-muted-foreground`) rather than raw hex codes. **NEVER override preset styles or global theme variables without explicit user consent.**
- **Consistency**: Maintain the "Editorial Brutalist" aesthetic—high contrast, refined typography (`Playfair Display` for headings), and purposeful motion.

### API & Data Patterns
- **Route Handlers**: Use standard HTTP methods in `route.ts` files for client-side mutations.
- **Server Actions**: Preferred for simple form submissions (Signup, Profile) to reduce boilerplate.
- **Prisma**: Always use the singleton pattern for the Prisma client located in `lib/prisma.ts`.

## 5. Security & Safety
- **Authentication**: All protected routes are managed via `proxy.ts`. Ensure any new sensitive routes are added to the `protectedRoutes` array.
- **Sensitive Data**: Never log or expose `passwordHash` or other PII in API responses.
- **Credentials**: Ensure `.env` files are never committed to source control.

## 6. Key Files
- `app/globals.css`: Central styling and theme overrides.
- `lib/auth.ts`: Core NextAuth configuration.
- `data/questions.ts`: The source of truth for all quiz content.
- `prisma/schema.prisma`: The definitive data model for the application.
- `proxy.ts`: The primary gatekeeper for authentication and route protection.
