import React, { useRef, useEffect, useCallback, useMemo } from 'react';
import { useAutocomplete, useSearch } from '../../hooks';
import { SuggestionList } from '../SuggestionList';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

// Memoize search icon SVG to avoid recreation
const SearchIcon = React.memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="m19.6 21l-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-3.35 0-5.675-2.325Q1.5 11.35 1.5 8q0-3.35 2.325-5.675Q6.15 0 9.5 0q3.35 0 5.675 2.325Q17.5 4.65 17.5 8q0 1.1-.35 2.075q-.35.975-.95 1.725l6.3 6.3zM9.5 14q2.5 0 4.25-1.75T15.5 8q0-2.5-1.75-4.25T9.5 2Q7 2 5.25 3.75T3.5 8q0 2.5 1.75 4.25T9.5 14z" />
  </svg>
));

SearchIcon.displayName = 'SearchIcon';

// Memoize filter icon SVG to avoid recreation
const FilterIcon = React.memo(() => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 6h10l-5.01 6.3L7 6z" />
  </svg>
));

FilterIcon.displayName = 'FilterIcon';

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search for experiences..."
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Use our custom hooks for search and autocomplete logic
  const { performSearch } = useSearch();
  const {
    inputValue,
    suggestions,
    showSuggestions,
    highlightedIndex,
    isLoadingSuggestions,
    handleInputChange,
    handleSuggestionSelect,
    handleKeyDown,
    closeSuggestions,
  } = useAutocomplete();

  // Handle input change
  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e.target.value);
  }, [handleInputChange]);

  // Handle suggestion selection
  const onSuggestionSelect = useCallback(async (suggestion: string) => {
    const selectedValue = handleSuggestionSelect(suggestion);
    await performSearch({ q: selectedValue, limit: 10, offset: 0 });
    if (onSearch) {
      onSearch(selectedValue);
    }
  }, [handleSuggestionSelect, performSearch, onSearch]);

  // Handle keyboard events
  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const result = handleKeyDown(e.key);
    
    switch (result.action) {
      case 'navigate':
        e.preventDefault();
        break;
      case 'select':
        e.preventDefault();
        if (result.value) {
          onSuggestionSelect(result.value);
        }
        break;
      case 'search':
        e.preventDefault();
        if (result.value) {
          handleSearchAction(result.value);
        }
        break;
      case 'close':
        break;
    }
  }, [handleKeyDown, onSuggestionSelect]);

  // Handle search action
  const handleSearchAction = useCallback(async (query: string) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      await performSearch({ q: trimmedQuery, limit: 10, offset: 0 });
      if (onSearch) {
        onSearch(trimmedQuery);
      }
    }
  }, [performSearch, onSearch]);

  // Memoize search button click handler
  const handleSearchClick = useCallback(() => {
    handleSearchAction(inputValue);
  }, [handleSearchAction, inputValue]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        closeSuggestions();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeSuggestions]);

  // Memoize suggestions list to prevent recreation on every render
  const suggestionsList = useMemo(() => {
    if (!showSuggestions || suggestions.length === 0) return null;

    return (
      <div ref={suggestionsRef}>
        <SuggestionList
          suggestions={suggestions}
          highlightedIndex={highlightedIndex}
          onSuggestionSelect={onSuggestionSelect}
          isVisible={showSuggestions}
        />
      </div>
    );
  }, [showSuggestions, suggestions, highlightedIndex, onSuggestionSelect]);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchIcon}>
          <SearchIcon />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={styles.searchInput}
          autoComplete="off"
        />

        {isLoadingSuggestions && (
          <div className={styles.loadingSpinner}></div>
        )}

        <button
          className={styles.filterButton}
          onClick={handleSearchClick}
          type="button"
          aria-label="Search"
        >
          <FilterIcon />
        </button>
      </div>

      {suggestionsList}
    </div>
  );
};

// Memoize the SearchBar component to prevent unnecessary re-renders
// Only re-render if onSearch or placeholder props change
export default React.memo(SearchBar, (prevProps, nextProps) => {
  return (
    prevProps.onSearch === nextProps.onSearch &&
    prevProps.placeholder === nextProps.placeholder
  );
});