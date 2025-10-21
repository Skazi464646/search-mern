import { SearchRepository } from '../repositories/search.repository';
import { SearchQueryDto, AutocompleteQueryDto } from '../dto/search-query.dto';
import { SearchResponseDto, AutocompleteResponseDto, ExperienceDto } from '../dto/search-response.dto';
import { ApiError } from '@/common/middleware/error.middleware';

export class SearchService {
  constructor(private readonly searchRepository: SearchRepository) {}

  async search(query: SearchQueryDto): Promise<SearchResponseDto> {
    try {
      const [results, total] = await Promise.all([
        this.searchRepository.findByQuery(query),
        this.searchRepository.countByQuery(query)
      ]);

      const experiences: ExperienceDto[] = results.map(exp => ({
        id: exp.id,
        title: exp.title,
        description: exp.description,
        imageUrl: exp.imageUrl,
        destination: exp.destination,
        category: exp.category,
        price: exp.price,
        duration: exp.duration,
        featured: exp.featured,
        createdAt: exp.createdAt,
        updatedAt: exp.updatedAt
      }));

      return {
        success: true,
        data: {
          results: experiences,
          pagination: {
            total,
            limit: query.limit,
            offset: query.offset,
            hasNext: query.offset + query.limit < total,
            hasPrev: query.offset > 0
          }
        }
      };
    } catch (error) {
      console.error('Search service error:', error);
      throw new ApiError(500, 'SEARCH_ERROR', 'Failed to perform search');
    }
  }

  async autocomplete(query: AutocompleteQueryDto): Promise<AutocompleteResponseDto> {
    try {
      const suggestions = await this.searchRepository.getSuggestions(query.q, query.limit);

      return {
        success: true,
        data: {
          suggestions
        }
      };
    } catch (error) {
      console.error('Autocomplete service error:', error);
      throw new ApiError(500, 'AUTOCOMPLETE_ERROR', 'Failed to get autocomplete suggestions');
    }
  }
}