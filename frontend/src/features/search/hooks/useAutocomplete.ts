import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { useSearchStore } from '@/shared/store';

/**
 * Custom hook for autocomplete functionality
 * Handles debounced autocomplete with keyboard navigation
 */
export const useAutocomplete = (debounceMs: number = 300) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const timeoutRef = useRef<number | null>(null);
  
  const {
    suggestions,
    isLoadingSuggestions,
    autocomplete,
  } = useSearchStore();

  // Debounced autocomplete function
  const debouncedAutocomplete = useMemo(
    () => {
      return (query: string) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        
        timeoutRef.current = setTimeout(() => {
          if (query.length >= 2) {
            autocomplete(query);
          }
        }, debounceMs);
      };
    },
    [autocomplete, debounceMs]
  );

  // Handle input value changes
  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    setHighlightedIndex(-1);
    
    if (value.length >= 2) {
      debouncedAutocomplete(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [debouncedAutocomplete]);

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback((suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
    return suggestion;
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback((key: string) => {
    if (!showSuggestions || suggestions.length === 0) {
      return { action: 'none' as const };
    }

    switch (key) {
      case 'ArrowDown':
        setHighlightedIndex(prev =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        return { action: 'navigate' as const };
        
      case 'ArrowUp':
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        return { action: 'navigate' as const };
        
      case 'Enter':
        if (highlightedIndex >= 0) {
          const selectedSuggestion = suggestions[highlightedIndex];
          handleSuggestionSelect(selectedSuggestion);
          return { action: 'select' as const, value: selectedSuggestion };
        }
        return { action: 'search' as const, value: inputValue };
        
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        return { action: 'close' as const };
        
      default:
        return { action: 'none' as const };
    }
  }, [showSuggestions, suggestions, highlightedIndex, inputValue, handleSuggestionSelect]);

  // Close suggestions
  const closeSuggestions = useCallback(() => {
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  }, []);

  // Clear input
  const clearInput = useCallback(() => {
    setInputValue('');
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    // State
    inputValue,
    suggestions,
    showSuggestions,
    highlightedIndex,
    isLoadingSuggestions,
    
    // Actions
    handleInputChange,
    handleSuggestionSelect,
    handleKeyDown,
    closeSuggestions,
    clearInput,
  };
};