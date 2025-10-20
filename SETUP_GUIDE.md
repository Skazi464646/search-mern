# 🚀 Complete Setup Guide - Travel Search Platform

## 📋 Overview
This guide provides step-by-step instructions to set up and run the FlyDubai-style travel search platform locally and in production.

---

## 🔧 Prerequisites

### Required Software
- **Node.js 18+** ([Download](https://nodejs.org/))
- **Docker & Docker Compose** ([Download](https://www.docker.com/get-started))
- **Git** ([Download](https://git-scm.com/))
- **PostgreSQL** (optional for manual setup)

### Verify Installation
```bash
node --version    # Should be 18+ 
npm --version     # Should be 9+
docker --version  # Should be 20+
docker-compose --version
```

---

## 🐳 Method 1: Docker Setup (Recommended)

### Step 1: Clone Repository
```bash
git clone <your-repository-url>
cd search-mern
```

### Step 2: Environment Configuration
```bash
# Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Edit backend/.env if needed
cat backend/.env
```

**Backend Environment Variables:**
```bash
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@database:5432/travel_search
CORS_ORIGIN=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend Environment Variables:**
```bash
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_APP_NAME="Travel Search"
```

### Step 3: Start Services
```bash
# Start all services (database, backend, frontend)
docker-compose up -d

# View real-time logs
docker-compose logs -f

# Check service status
docker-compose ps
```

### Step 4: Database Setup
```bash
# Wait for database to be ready (30 seconds), then:
docker-compose exec backend npm run db:migrate
docker-compose exec backend npm run db:seed
```

### Step 5: Access Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api/v1
- **Health Check**: http://localhost:3000/api/v1/health

### Step 6: Verify Setup
```bash
# Test backend API
curl http://localhost:3000/api/v1/health

# Test search endpoint
curl "http://localhost:3000/api/v1/search?q=festival&limit=5"

# Test autocomplete
curl "http://localhost:3000/api/v1/search/autocomplete?q=win&limit=5"
```

---

## 💻 Method 2: Manual Local Setup

### Step 1: Clone & Install Dependencies
```bash
git clone <your-repository-url>
cd search-mern

# Install all dependencies
npm install
```

### Step 2: Database Setup
```bash
# Start PostgreSQL (using Homebrew on macOS)
brew services start postgresql

# Or using Docker for database only
docker run --name travel-search-db \
  -e POSTGRES_DB=travel_search \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -p 5432:5432 \
  -d postgres:15-alpine
```

### Step 3: Backend Setup
```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit DATABASE_URL if needed
# DATABASE_URL=postgresql://user:password@localhost:5432/travel_search

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed database
npm run db:seed

# Start backend server
npm run dev
```

### Step 4: Frontend Setup (in new terminal)
```bash
cd frontend

# Copy environment file
cp .env.example .env

# Start frontend server
npm run dev
```

### Step 5: Access Application
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

---

## 🔍 Development Workflow

### Common Commands

#### Root Level Commands
```bash
# Start both services
npm run dev

# Build all packages
npm run build

# Run linting
npm run lint

# Format code
npm run format

# Type checking
npm run typecheck
```

#### Backend Commands
```bash
cd backend

# Development
npm run dev              # Start with hot reload
npm run build           # Build for production
npm run start           # Start production build

# Database
npm run db:migrate      # Apply schema changes
npm run db:seed         # Add sample data
npm run db:reset        # Reset database
npm run db:generate     # Generate Prisma client

# Testing & Quality
npm run test            # Run tests
npm run lint            # ESLint
npm run typecheck       # TypeScript checking
```

#### Frontend Commands
```bash
cd frontend

# Development
npm run dev             # Start Vite dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Testing & Quality
npm run test            # Run tests
npm run lint            # ESLint
npm run typecheck       # TypeScript checking
```

### Docker Commands
```bash
# View logs
docker-compose logs -f                    # All services
docker-compose logs -f backend           # Backend only
docker-compose logs -f frontend          # Frontend only

# Restart services
docker-compose restart                    # All services
docker-compose restart backend           # Backend only

# Stop services
docker-compose down                       # Stop all
docker-compose down -v                    # Stop and remove volumes

# Rebuild and restart
docker-compose up --build -d
```

---

## 🧪 Testing the Application

### 1. Search Functionality
1. Open http://localhost:5173
2. Type in search bar: "festival" or "wine"
3. Verify autocomplete suggestions appear
4. Press Enter or click search
5. Verify results page displays with cards

### 2. API Testing
```bash
# Health check
curl http://localhost:3000/api/v1/health

# Search experiences
curl "http://localhost:3000/api/v1/search?q=wine&limit=3"

# Autocomplete
curl "http://localhost:3000/api/v1/search/autocomplete?q=pun&limit=5"

# Category filter
curl "http://localhost:3000/api/v1/search?q=festival&category=Cultural"
```

### 3. Database Verification
```bash
# Connect to database
docker-compose exec database psql -U user -d travel_search

# Check data
\dt                                       # List tables
SELECT COUNT(*) FROM experiences;         # Count records
SELECT title, category FROM experiences LIMIT 5;
\q                                       # Exit
```

---

## 🚀 Production Deployment

### Environment Preparation
```bash
# Production environment variables
# backend/.env.production
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://prod_user:secure_password@prod_db:5432/travel_search
CORS_ORIGIN=https://your-domain.com

# frontend/.env.production
VITE_API_BASE_URL=https://api.your-domain.com/api/v1
```

### Docker Production Build
```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Start production services
docker-compose -f docker-compose.prod.yml up -d

# Apply migrations
docker-compose -f docker-compose.prod.yml exec backend npm run db:migrate

# Seed production data
docker-compose -f docker-compose.prod.yml exec backend npm run db:seed
```

---

## 🛠️ Troubleshooting

### Common Issues & Solutions

#### 1. Port Already in Use
```bash
# Find process using port
lsof -i :3000
lsof -i :5173

# Kill process
kill -9 <PID>

# Or use different ports in docker-compose.yml
```

#### 2. Database Connection Issues
```bash
# Check if PostgreSQL is running
docker-compose ps database

# Check logs
docker-compose logs database

# Restart database
docker-compose restart database
```

#### 3. Frontend Build Issues
```bash
# Clear node_modules and reinstall
cd frontend
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run typecheck
```

#### 4. Backend API Not Responding
```bash
# Check backend logs
docker-compose logs backend

# Restart backend
docker-compose restart backend

# Check if database is ready
curl http://localhost:3000/api/v1/health
```

#### 5. CORS Issues
```bash
# Verify CORS_ORIGIN in backend/.env
CORS_ORIGIN=http://localhost:5173

# Restart backend after changes
docker-compose restart backend
```

### Debug Mode
```bash
# Enable debug mode in backend
cd backend
NODE_ENV=development DEBUG=* npm run dev

# Frontend debug in browser
# Open browser DevTools → Console
# Zustand DevTools extension recommended
```

---

## 📊 Performance Monitoring

### Application Metrics
```bash
# Backend performance
curl http://localhost:3000/api/v1/health
# Response time should be < 100ms

# Database query performance
docker-compose logs backend | grep "prisma:query"

# Frontend bundle analysis
cd frontend
npm run build
npm run analyze  # If configured
```

### Resource Usage
```bash
# Docker container stats
docker stats

# Database size
docker-compose exec database psql -U user -d travel_search -c "\l+"

# Disk usage
docker system df
```

---

## 🔐 Security Checklist

### Development Security
- [ ] Environment variables not committed to Git
- [ ] Default passwords changed in production
- [ ] HTTPS enabled in production
- [ ] Rate limiting configured
- [ ] CORS origins restricted
- [ ] Input validation in place

### Production Security
- [ ] Secure database credentials
- [ ] SSL certificates configured
- [ ] Regular security updates
- [ ] Backup strategy implemented
- [ ] Monitoring and alerting setup

---

## 📚 Additional Resources

### Documentation
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Detailed architecture overview
- [README.md](./README.md) - Project overview
- [Prisma Documentation](https://www.prisma.io/docs/)
- [React Documentation](https://react.dev/)

### Useful Links
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api/v1
- **Health Check**: http://localhost:3000/api/v1/health
- **Database**: postgresql://user:password@localhost:5432/travel_search

### Support
- Check logs: `docker-compose logs -f`
- Database issues: Verify connection string and migrations
- API issues: Check backend health endpoint
- Frontend issues: Check browser console and network tab

---

**🎉 You're all set! Your travel search platform should now be running successfully.**