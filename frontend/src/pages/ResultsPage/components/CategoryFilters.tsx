import React from 'react';
import styles from '../ResultsPage.module.css';

interface CategoryFiltersProps {
  categories: readonly string[];
  selectedCategory: string;
  onCategoryFilter: (category: string) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = React.memo(({
  categories,
  selectedCategory,
  onCategoryFilter,
}) => {
  return (
    <div className={styles.filters}>
      {categories.map((category) => (
        <button
          key={category}
          className={`${styles.filterButton} ${
            selectedCategory === category ? styles.active : ''
          }`}
          onClick={() => onCategoryFilter(category)}
          aria-pressed={selectedCategory === category}
          type="button"
        >
          {category}
        </button>
      ))}
    </div>
  );
});

CategoryFilters.displayName = 'CategoryFilters';