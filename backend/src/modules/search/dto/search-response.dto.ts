export interface ExperienceDto {
  id: string | number;
  title: string;
  description: string;
  imageUrl: string;
  destination: string;
  category: string;
  price?: number;
  duration?: string;
  featured: boolean;
}

export interface SearchResponseDto {
  success: boolean;
  data: {
    results: ExperienceDto[];
    pagination: {
      total: number;
      limit: number;
      offset: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export interface AutocompleteResponseDto {
  success: boolean;
  data: {
    suggestions: string[];
  };
}