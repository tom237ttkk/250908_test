# Technology Stack

## Frontend

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Testing**: Vitest (unit tests) + Playwright (E2E tests)

## Backend

- **Framework**: Hono (web framework)
- **Runtime**: Bun
- **ORM**: Prisma
- **Database**: PostgreSQL

## Development Tools

- **Code Quality**: Biome (formatter/linter)
- **Package Manager**: npm (frontend), Bun (backend)

## Common Commands

### Development

```bash
# Frontend development server
cd apps/web
npm run dev

# Backend development server
cd apps/api
bun run dev

# Database setup (from apps/api)
cd apps/api
bun run setup
```

### Database

```bash
# All commands run from apps/api directory
cd apps/api

# Generate Prisma client
bun run prisma:generate

# Run database migrations
bun run prisma:migrate

# Seed database with sample data
bun run prisma:seed

# Start database container
bun run db:up

# Stop database container
bun run db:down
```

### Testing

```bash
# Frontend tests
cd apps/web
npm test

# Backend tests
cd apps/api
bun test

# Run tests in watch mode
npm test -- --watch  # or bun test --watch
```

### Build & Deploy

```bash
# Build frontend for production
cd apps/web
npm run build

# Preview production build
npm run preview

# Type checking
npm run build  # includes type checking
```

## Architecture Patterns

- **Component-based architecture** with React functional components
- **Custom hooks** for data fetching and state management
- **API-first design** with clear separation between frontend and backend
- **Type-safe development** with TypeScript throughout the stack
