import { Router } from 'express';
import { SearchController } from './controllers/search.controller';
import { SearchService } from './services/search.service';
import { SearchRepository } from './repositories/search.repository';
import { prisma } from '@/database/client';

const router = Router();

// Dependency injection
const searchRepository = new SearchRepository(prisma); 
const searchService = new SearchService(searchRepository);
const searchController = new SearchController(searchService);

// Routes
router.get('/', (req, res, next) => searchController.search(req, res, next));
router.get('/autocomplete', (req, res, next) => searchController.autocomplete(req, res, next));

export { router as searchRouter };