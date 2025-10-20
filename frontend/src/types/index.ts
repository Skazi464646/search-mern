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

// Component Props Types
export interface SearchBarProps {
  onSearch: (query: string) => void;
  onSuggestionSelect: (suggestion: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export interface ExperienceCardProps {
  experience: Experience;
  onClick?: (experience: Experience) => void;
}

export interface SearchResultsProps {
  experiences: Experience[];
  pagination: Pagination;
  onPageChange: (offset: number) => void;
  isLoading?: boolean;
}

// Store Types
export interface SearchStore {
  query: string;
  results: Experience[];
  suggestions: string[];
  pagination: Pagination;
  isLoading: boolean;
  isLoadingSuggestions: boolean;
  error: string | null;
  
  // Actions
  setQuery: (query: string) => void;
  search: (params: SearchParams) => Promise<void>;
  autocomplete: (query: string) => Promise<void>;
  clearResults: () => void;
  clearError: () => void;
}