import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchStore } from '../../store/searchStore';
import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

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

  // Debounced autocomplete
  const debouncedAutocomplete = useCallback(
    debounce((query: string) => {
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    handleSearch(suggestion);
  };

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      await search({ q: query.trim(), limit: 10, offset: 0 });
      if (onSearch) {
        onSearch(query.trim());
      }
    }
  };

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

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="m19.6 21l-6.3-6.3q-.75.6-1.725.95Q10.6 16 9.5 16q-3.35 0-5.675-2.325Q1.5 11.35 1.5 8q0-3.35 2.325-5.675Q6.15 0 9.5 0q3.35 0 5.675 2.325Q17.5 4.65 17.5 8q0 1.1-.35 2.075q-.35.975-.95 1.725l6.3 6.3zM9.5 14q2.5 0 4.25-1.75T15.5 8q0-2.5-1.75-4.25T9.5 2Q7 2 5.25 3.75T3.5 8q0 2.5 1.75 4.25T9.5 14z" />
          </svg>
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
          onClick={() => handleSearch(inputValue)}
          type="button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 6h10l-5.01 6.3L7 6z" />
          </svg>
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div ref={suggestionsRef} className={styles.suggestionsDropdown}>
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion}
              className={`${styles.suggestionItem} ${index === highlightedIndex ? styles.highlighted : ''
                }`}
              onClick={() => handleSuggestionSelect(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Debounce utility function
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: any;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default SearchBar;