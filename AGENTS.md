<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Evalio Project Mandates

## 1. Design System: Bauhaus Play
- **Aesthetic**: Bold 4px black borders, high-contrast primary colors (#ffde59, #ff4d4d, #4d79ff), and large geometric shapes.
- **Responsiveness**: All UI must be mobile-first. Sidebars collapse to a top-header on small screens.
- **Interactivity**: Use signature "shadow offsets" (`shadow-[x_x_0px_#000]`) and physical translation on hover/active states.

## 2. Technical Stack
- **Framework**: Next.js 16 (App Router).
- **Middleware**: Use `proxy.ts` (default export) for edge-side auth.
- **Data Persistence**: Prisma ORM with SQLite.
- **Auth**: NextAuth.js (Credentials Provider).
- **Mutations**: Use **Server Actions** (`lib/actions/*.ts`) instead of API routes whenever possible. Use React 19 `useActionState` for form handling.
- **Security**: Centralize auth logic in the Data Access Layer (`lib/dal.ts`).

## 3. Data Architecture
- **Quiz System**: Many-to-Many relationship between Questions and Topics.
- **Hierarchies**: Skill -> Topic -> Question.
- **Ranking**: Automated hireability score and ranking logic located in `lib/ranking.ts`.

## 4. Git Protocol
- **NEVER** commit `prisma/dev.db` or `.env` files.
- **Migrations**: Always run `npx prisma migrate dev` after schema changes.
