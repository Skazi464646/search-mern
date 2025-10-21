import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../ResultsPage.module.css';

export const EmptyState: React.FC = React.memo(() => {
  return (
    <div className={styles.emptyState}>
      <h2 className={styles.emptyStateTitle}>No experiences found</h2>
      <p className={styles.emptyStateDescription}>
        Try adjusting your search terms or filters to find what you're looking for.
      </p>
      <Link to="/" className={styles.backButton}>
        ← Back to Search
      </Link>
    </div>
  );
});

EmptyState.displayName = 'EmptyState';