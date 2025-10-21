import type { Experience, Pagination } from './api';

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