import { z } from 'zod';

export const searchQuerySchema = z.object({
  q: z.string().min(1, 'Search query is required').max(100, 'Search query too long'),
  limit: z.coerce.number().min(1).max(50).default(10),
  offset: z.coerce.number().min(0).default(0),
  category: z.string().optional(),
  featured: z.coerce.boolean().optional(),
});

export type SearchQueryDto = z.infer<typeof searchQuerySchema>;

export const autocompleteQuerySchema = z.object({
  q: z.string().min(1, 'Search query is required').max(100, 'Search query too long'),
  limit: z.coerce.number().min(1).max(10).default(5),
});

export type AutocompleteQueryDto = z.infer<typeof autocompleteQuerySchema>;