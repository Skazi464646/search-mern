import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useSearchStore } from '../../store/searchStore';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

// Debounce utility function moved outside component to avoid recreation
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
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

// Memoize individual suggestion items for better performance
interface SuggestionItemProps {
  suggestion: string;
  isHighlighted: boolean;
  onClick: (suggestion: string) => void;
}

const SuggestionItem = React.memo<SuggestionItemProps>(({ suggestion, isHighlighted, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(suggestion);
  }, [onClick, suggestion]);

  const className = useMemo(() => {
    return `${styles.suggestionItem} ${isHighlighted ? styles.highlighted : ''}`;
  }, [isHighlighted]);

  return (
    <div
      className={className}
      onClick={handleClick}
    >
      {suggestion}
    </div>
  );
});

SuggestionItem.displayName = 'SuggestionItem';

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search for experiences..."
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const {
    suggestions,
    isLoadingSuggestions,
    autocomplete,
    search
  } = useSearchStore();

  // Memoize debounced autocomplete function to prevent recreation on every render
  const debouncedAutocomplete = useMemo(
    () => debounce((query: string) => {
      if (query.length >= 2) {
        autocomplete(query);
      }
    }, 300),
    [autocomplete]
  );

  useEffect(() => {
    if (inputValue.length >= 2) {
      debouncedAutocomplete(inputValue);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [inputValue, debouncedAutocomplete]);

  // Memoize input change handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setHighlightedIndex(-1);
  }, []);

  // Memoize suggestion selection handler
  const handleSuggestionSelect = useCallback((suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    setHighlightedIndex(-1);

    // Perform search immediately
    search({ q: suggestion.trim(), limit: 10, offset: 0 });
    if (onSearch) {
      onSearch(suggestion.trim());
    }
  }, [search, onSearch]);

  // Memoize search handler
  const handleSearch = useCallback(async (query: string) => {
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      await search({ q: trimmedQuery, limit: 10, offset: 0 });
      if (onSearch) {
        onSearch(trimmedQuery);
      }
    }
  }, [search, onSearch]);

  // Memoize keyboard handler
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSearch(inputValue);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSuggestionSelect(suggestions[highlightedIndex]);
        } else {
          handleSearch(inputValue);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  }, [showSuggestions, suggestions.length, inputValue, highlightedIndex, handleSearch, handleSuggestionSelect]);

  // Memoize search button click handler
  const handleSearchClick = useCallback(() => {
    handleSearch(inputValue);
  }, [handleSearch, inputValue]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Memoize suggestions list to prevent recreation on every render
  const suggestionsList = useMemo(() => {
    if (!showSuggestions || suggestions.length === 0) return null;

    return (
      <div ref={suggestionsRef} className={styles.suggestionsDropdown}>
        {suggestions.map((suggestion, index) => (
          <SuggestionItem
            key={suggestion}
            suggestion={suggestion}
            isHighlighted={index === highlightedIndex}
            onClick={handleSuggestionSelect}
          />
        ))}
      </div>
    );
  }, [showSuggestions, suggestions, highlightedIndex, handleSuggestionSelect]);

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
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
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