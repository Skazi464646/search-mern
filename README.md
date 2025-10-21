# Travel Search Platform

> A full-stack TypeScript application for searching and discovering travel experiences, built with modern web technologies and production-ready architecture.

## 📋 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

- **🔍 Real-time Search**: Instant search with autocomplete suggestions and debounced queries
- **📱 Responsive Design**: Mobile-first approach with seamless desktop experience
- **⚡ Fast Performance**: Optimized with lazy loading, memoization, and code splitting
- **🎯 Advanced Filtering**: Category-based filtering and pagination support
- **🔒 Type-Safe**: Full TypeScript implementation across frontend and backend
- **🛡️ Secure**: Rate limiting, CORS protection, input validation, and security headers
- **🏗️ Scalable Architecture**: Clean layered architecture with separation of concerns
- **📊 Production Ready**: Comprehensive error handling, logging, and monitoring

## 🚀 Demo
### Page 1: Search Page
![ Screenshot (Search Page)](./frontend/public/P1-search.png)

### Page 2: Results Page
![Screenshot (Results Page)](./frontend/public/P2-results.png)

- **API Documentation**: Available at `/api/v1/health` when running locally
- **Sample Data**: 200+ curated travel experiences across multiple categories

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js with layered architecture
- **Database**: PostgreSQL with Prisma ORM
- **Validation**: Zod schemas for type-safe validation
- **Security**: Helmet, CORS, express-rate-limit
- **Testing**: Jest with Supertest for integration testing

### Frontend
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: Zustand for lightweight global state
- **HTTP Client**: Axios with interceptors and error handling
- **Routing**: React Router v6 with lazy loading
- **Styling**: CSS Modules with component-scoped styles

### DevOps & Tools
- **Monorepo**: npm workspaces for unified dependency management
- **Linting**: ESLint + Prettier for consistent code quality
- **Type Checking**: TypeScript strict mode across all packages
- **Testing**: Jest for unit and integration tests
- **Build**: Production-optimized builds with bundle analysis

## 🏗️ Architecture

![Architecture Flow Diagram](./frontend/public/Archiecture-flow-diagram.png)
![Application User Flow Diagram](./frontend/public/%20Application-user-flow.png)

### System Overview
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │───▶│  Express API    │───▶│   PostgreSQL    │
│   (Frontend)    │    │   (Backend)     │    │   (Database)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Backend Architecture
```
Controllers ──▶ Services ──▶ Repositories ──▶ Database
     │              │              │              │
     │              │              │              │
   HTTP          Business        Data          Prisma
  Layer           Logic          Access          ORM
```

### Frontend Architecture
```
Pages ──▶ Features ──▶ Components ──▶ Hooks ──▶ Stores ──▶ API
  │           │            │           │         │         │
Route      Business     Reusable     Custom    Global    HTTP
Level      Features      UI Parts    Logic     State     Client
```



## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18.0.0
- npm ≥ 9.0.0
- PostgreSQL database

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd travel-search-platform

# Install dependencies for all workspaces
npm install

# Setup environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# Edit the .env files with your configuration
```

### Database Setup

```bash
# Navigate to backend
cd backend

# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed the database with sample data
npm run db:seed
```

### Development

```bash
# Start both frontend and backend (from root)
npm run dev

# Or start individually
npm run dev:backend    # API server on http://localhost:3000
npm run dev:frontend   # React app on http://localhost:5173
```

### Testing

```bash
# Run all tests
npm run test

# Backend tests only
cd backend && npm run test

# Frontend tests only
cd frontend && npm run test

# Coverage reports
npm run test:coverage
```

## 🔧 Environment Variables

### Backend (.env)
```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/travel_search"

# Server Configuration
PORT=3000
NODE_ENV=development

# Security
CORS_ORIGIN="http://localhost:5173"

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000  # 15 minutes
RATE_LIMIT_MAX_REQUESTS=100  # requests per window
```

### Frontend (.env)
```bash
# API Configuration
VITE_API_BASE_URL="http://localhost:3000/api/v1"

# Environment
VITE_NODE_ENV=development
```

## 📁 Project Structure

```
travel-search-platform/
├── backend/                     # Express.js API Server
│   ├── src/
│   │   ├── modules/            # Feature modules
│   │   │   ├── search/        # Search functionality
│   │   │   │   ├── controllers/
│   │   │   │   ├── services/
│   │   │   │   ├── repositories/
│   │   │   │   └── dto/
│   │   │   └── health/        # Health monitoring
│   │   ├── common/            # Shared utilities
│   │   │   └── middleware/
│   │   ├── config/            # Configuration
│   │   └── database/          # DB client and seeds
│   ├── prisma/               # Database schema
│   │   └── schema.prisma
│   ├── tests/                # Test files
│   └── package.json
│
├── frontend/                    # React Application
│   ├── src/
│   │   ├── lib/              # Core utilities
│   │   │   └── api.ts        # HTTP client
│   │   ├── types/            # TypeScript definitions
│   │   │   ├── api.ts
│   │   │   ├── components.ts
│   │   │   └── store.ts
│   │   ├── stores/           # Zustand state stores
│   │   │   └── search.ts
│   │   ├── features/         # Feature modules
│   │   │   ├── search/      # Search functionality
│   │   │   └── results/     # Results display
│   │   ├── components/       # Shared UI components
│   │   │   ├── ui/          # Base components
│   │   │   └── layout/      # Layout components
│   │   ├── pages/           # Route components
│   │   │   ├── SearchPage/
│   │   │   └── ResultsPage/
│   │   └── app/             # App configuration
│   ├── public/              # Static assets
│   └── package.json
│
├── shared/                     # Shared utilities (if needed)
├── package.json               # Monorepo configuration
└── README.md
```

## 🚀 Deployment

### Production Build

```bash
# Build all workspaces
npm run build

# Backend will be in backend/dist/
# Frontend will be in frontend/dist/
```

### Backend Deployment

```bash
# In backend directory
npm run build
npm start

# Or with PM2
pm2 start dist/index.js --name "travel-api"
```

### Frontend Deployment

```bash
# In frontend directory
npm run build

# Serve the dist/ directory with any static file server
# Examples: Nginx, Apache, Vercel, Netlify
```

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up -d

# Or build individual images
docker build -t travel-backend ./backend
docker build -t travel-frontend ./frontend
```

### Environment Setup for Production

#### Backend Production Environment
```bash
NODE_ENV=production
DATABASE_URL=postgresql://user:password@production-db:5432/travel_search
PORT=3000
CORS_ORIGIN=https://yourdomain.com
```

#### Frontend Production Environment
```bash
VITE_API_BASE_URL=https://api.yourdomain.com/api/v1
VITE_NODE_ENV=production
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Add tests** for new functionality
5. **Ensure all tests pass**: `npm run test`
6. **Commit your changes**: `git commit -m 'Add amazing feature'`
7. **Push to the branch**: `git push origin feature/amazing-feature`
8. **Open a Pull Request**

### Development Guidelines

- **Code Style**: Follow TypeScript strict mode and ESLint rules
- **Testing**: Maintain test coverage above 80%
- **Commits**: Use conventional commit messages
- **Documentation**: Update README for new features
- **Types**: Ensure full TypeScript coverage

### Code Review Process

- All PRs require at least one review
- All tests must pass
- Code coverage must not decrease
- Follow the established architecture patterns

### Quick Links

- **API Health Check**: [http://localhost:3000/api/v1/health](http://localhost:3000/api/v1/health)
- **Frontend Dev Server**: [http://localhost:5173](http://localhost:5173)
- **API Documentation**: Available in source code comments and DTOs
- **Database Schema**: `backend/prisma/schema.prisma`