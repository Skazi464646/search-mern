import React, { useMemo, useCallback } from 'react';
import styles from './SuggestionList.module.css';

interface SuggestionListProps {
  suggestions: string[];
  highlightedIndex: number;
  onSuggestionSelect: (suggestion: string) => void;
  isVisible?: boolean;
}

// Memoize individual suggestion items for better performance
interface SuggestionItemProps {
  suggestion: string;
  isHighlighted: boolean;
  onClick: (suggestion: string) => void;
}

const SuggestionItem = React.memo<SuggestionItemProps>(({ 
  suggestion, 
  isHighlighted, 
  onClick 
}) => {
  const handleClick = useCallback(() => {
    onClick(suggestion);
  }, [onClick, suggestion]);

  const className = useMemo(() => {
    return `${styles.suggestionItem} ${isHighlighted ? styles.highlighted : ''}`;
  }, [isHighlighted]);

  return (
    <div className={className} onClick={handleClick}>
      {suggestion}
    </div>
  );
});

SuggestionItem.displayName = 'SuggestionItem';

const SuggestionList: React.FC<SuggestionListProps> = ({ 
  suggestions, 
  highlightedIndex, 
  onSuggestionSelect,
  isVisible = true 
}) => {
  // Memoize suggestion list to prevent recreation on every render
  const suggestionsList = useMemo(() => {
    if (!isVisible || suggestions.length === 0) return null;

    return (
      <div className={styles.suggestionsDropdown}>
        {suggestions.map((suggestion, index) => (
          <SuggestionItem
            key={suggestion}
            suggestion={suggestion}
            isHighlighted={index === highlightedIndex}
            onClick={onSuggestionSelect}
          />
        ))}
      </div>
    );
  }, [isVisible, suggestions, highlightedIndex, onSuggestionSelect]);

  return suggestionsList;
};

export default React.memo(SuggestionList);