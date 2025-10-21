import React from 'react';
import styles from './FilterButtons.module.css';

interface FilterButtonsProps {
  selectedCategory: string;
  categories: string[];
  onCategoryFilter: (category: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ 
  selectedCategory, 
  categories, 
  onCategoryFilter 
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
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default React.memo(FilterButtons);