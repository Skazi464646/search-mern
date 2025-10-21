import { SearchBar } from './components/SearchBar';
import { SuggestionList } from './components/SuggestionList';

// Main search feature exports for lazy loading
export const SearchFeature = {
  SearchBar,
  SuggestionList,
};

// Export feature-specific components for dynamic imports
export { SearchBar, SuggestionList };
export * from './hooks';