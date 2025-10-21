import type { Experience, Pagination, SearchParams } from './api';

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