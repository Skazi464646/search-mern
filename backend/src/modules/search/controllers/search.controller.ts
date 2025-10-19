import { Request, Response, NextFunction } from 'express';
import { SearchService } from '../services/search.service';
import { searchQuerySchema, autocompleteQuerySchema } from '../dto/search-query.dto';

export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  async search(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = searchQuerySchema.parse(req.query);
      const result = await this.searchService.search(query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  async autocomplete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const query = autocompleteQuerySchema.parse(req.query);
      const result = await this.searchService.autocomplete(query);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
}