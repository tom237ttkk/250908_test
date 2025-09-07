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
- **Package Manager**: Bun

## Common Commands

### Development

```bash
# Frontend development server
bun run dev

# Backend development server
bun run dev:server

# Run both frontend and backend
bun run dev:full
```

### Database

```bash
# Generate Prisma client
bunx prisma generate

# Run database migrations
bunx prisma migrate dev

# Seed database with sample data
bunx prisma db seed

# Open Prisma Studio
bunx prisma studio
```

### Testing

```bash
# Run unit tests
bun test

# Run E2E tests
bun run test:e2e

# Run tests in watch mode
bun test --watch
```

### Build & Deploy

```bash
# Build frontend for production
bun run build

# Preview production build
bun run preview

# Type checking
bun run type-check
```

## Architecture Patterns

- **Component-based architecture** with React functional components
- **Custom hooks** for data fetching and state management
- **API-first design** with clear separation between frontend and backend
- **Type-safe development** with TypeScript throughout the stack
