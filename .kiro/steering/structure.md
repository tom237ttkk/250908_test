# Project Structure

## Root Directory Organization

```
├── apps/
│   ├── web/                  # React + Vite frontend application
│   └── api/                  # Hono + Bun backend API
├── .kiro/                    # Kiro configuration and specs
└── AGENTS.md                 # Repository guidelines
```

## Frontend Structure (`apps/web/`)

```
src/
├── components/               # Reusable UI components
│   ├── VideoCard.tsx        # Spoiler-free video display card
│   ├── VideoPlayer.tsx      # Multi-platform video player wrapper
│   ├── YouTubePlayer.tsx    # YouTube-specific player component
│   ├── FilterBar.tsx        # Team and date filtering controls
│   └── VideoGrid.tsx        # Grid layout for video cards
├── pages/                   # Page-level components
│   ├── HomePage.tsx         # Main video listing page
│   └── VideoPage.tsx        # Individual video viewing page
├── hooks/                   # Custom React hooks
│   └── useVideos.tsx        # Video data fetching and management
├── types/                   # TypeScript type definitions
│   └── index.ts             # Shared interfaces and types
├── lib/                     # Utility functions and helpers
└── styles/                  # Global styles and Tailwind config
```

## Backend Structure (`apps/api/`)

```
src/
├── index.ts                 # Server entry point and route setup
└── api.ts                   # API route handlers (videos, teams)

prisma/
├── migrations/              # Prisma migration files
├── seed.ts                  # Database seed script
└── schema.prisma           # Prisma schema definition
```

## Naming Conventions

- **Components**: PascalCase (e.g., `VideoCard.tsx`)
- **Hooks**: camelCase starting with "use" (e.g., `useVideos.tsx`)
- **Utilities**: camelCase (e.g., `videoUtils.ts`)
- **Types/Interfaces**: PascalCase (e.g., `Video`, `VideoFilters`)
- **API endpoints**: kebab-case (e.g., `/api/videos`, `/api/teams`)
- **Database tables**: snake_case (e.g., `videos`, `teams`)

## File Organization Principles

- **Feature-based grouping**: Related components, hooks, and utilities are co-located
- **Separation of concerns**: Clear distinction between UI components, business logic, and data access
- **Reusability**: Common components and utilities are easily discoverable and importable
- **Type safety**: TypeScript definitions are centralized and shared across the application
