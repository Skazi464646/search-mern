import { PrismaClient } from '@prisma/client';
import { SearchQueryDto } from '../dto/search-query.dto';
import { ExperienceDto } from '../dto/search-response.dto';

export class SearchRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByQuery(query: SearchQueryDto): Promise<ExperienceDto[]> {
    const searchTerms = query.q.toLowerCase().split(' ').filter(term => term.length > 0);
    
    const whereClause: any = {
      OR: searchTerms.map(term => ({
        OR: [
          { title: { contains: term, mode: 'insensitive' } },
          { description: { contains: term, mode: 'insensitive' } },
          { destination: { contains: term, mode: 'insensitive' } },
          { category: { contains: term, mode: 'insensitive' } }
        ]
      }))
    };

    if (query.category) {
      whereClause.category = { contains: query.category, mode: 'insensitive' };
    }

    if (query.featured !== undefined) {
      whereClause.featured = query.featured;
    }

    return this.prisma.experience.findMany({
      where: whereClause,
      skip: query.offset,
      take: query.limit,
      orderBy: [
        { featured: 'desc' },
        { createdAt: 'desc' }
      ]
    });
  }

  async countByQuery(query: SearchQueryDto): Promise<number> {
    const searchTerms = query.q.toLowerCase().split(' ').filter(term => term.length > 0);
    
    const whereClause: any = {
      OR: searchTerms.map(term => ({
        OR: [
          { title: { contains: term, mode: 'insensitive' } },
          { description: { contains: term, mode: 'insensitive' } },
          { destination: { contains: term, mode: 'insensitive' } },
          { category: { contains: term, mode: 'insensitive' } }
        ]
      }))
    };

    if (query.category) {
      whereClause.category = { contains: query.category, mode: 'insensitive' };
    }

    if (query.featured !== undefined) {
      whereClause.featured = query.featured;
    }

    return this.prisma.experience.count({
      where: whereClause
    });
  }

  async getSuggestions(query: string, limit: number): Promise<string[]> {
    const searchTerm = query.toLowerCase();
    
    const experiences = await this.prisma.experience.findMany({
      where: {
        OR: [
          { title: { contains: searchTerm, mode: 'insensitive' } },
          { destination: { contains: searchTerm, mode: 'insensitive' } },
          { category: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      select: {
        title: true,
        destination: true,
        category: true
      },
      take: limit * 2
    });

    const suggestions = new Set<string>();
    
    experiences.forEach((exp:any) => {
      if (exp.title.toLowerCase().includes(searchTerm)) {
        suggestions.add(exp.title);
      }
      if (exp.destination.toLowerCase().includes(searchTerm)) {
        suggestions.add(exp.destination);
      }
      if (exp.category.toLowerCase().includes(searchTerm)) {
        suggestions.add(exp.category);
      }
    });

    return Array.from(suggestions).slice(0, limit);
  }
}