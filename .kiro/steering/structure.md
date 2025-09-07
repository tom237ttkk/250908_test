# Project Structure

## Root Directory Organization

```
├── frontend/                 # React + Vite frontend application
├── backend/                  # Hono + Bun backend API
├── database/                 # Database migrations and seeds
├── .kiro/                    # Kiro configuration and specs
└── docs/                     # Project documentation
```

## Frontend Structure (`frontend/`)

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
├── utils/                   # Utility functions
│   ├── api.ts               # API communication helpers
│   └── videoUtils.ts        # Video URL processing and platform detection
└── styles/                  # Global styles and Tailwind config
```

## Backend Structure (`backend/`)

```
src/
├── routes/                  # API route handlers
│   ├── videos.ts           # Video-related endpoints
│   └── teams.ts            # Team data endpoints
├── services/               # Business logic layer
├── middleware/             # Custom middleware functions
├── types/                  # Backend-specific types
└── utils/                  # Server utilities
```

## Database Structure (`database/`)

```
├── migrations/             # Prisma migration files
├── seeds/                  # Database seed scripts
└── schema.prisma          # Prisma schema definition
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
