// API Response Types
export interface Experience {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  destination: string;
  category: string;
  price?: number;
  duration?: string;
  featured: boolean;
}

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SearchResponse {
  success: boolean;
  data: {
    results: Experience[];
    pagination: Pagination;
  };
}

export interface AutocompleteResponse {
  success: boolean;
  data: {
    suggestions: string[];
  };
}

// Search Query Parameters
export interface SearchParams {
  q: string;
  limit?: number;
  offset?: number;
  category?: string;
  featured?: boolean;
}