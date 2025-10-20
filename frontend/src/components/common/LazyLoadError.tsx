import React from 'react';
import styles from './LazyLoadError.module.css';

interface LazyLoadErrorProps {
  error?: Error;
  retry: () => void;
}

const LazyLoadError: React.FC<LazyLoadErrorProps> = ({ retry }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        
        <h3 className={styles.title}>Failed to Load Page</h3>
        
        <p className={styles.message}>
          There was a problem loading this page. This might be due to a network issue.
        </p>
        
        <div className={styles.actions}>
          <button className={styles.retryButton} onClick={retry}>
            Retry Loading
          </button>
          
          <button 
            className={styles.homeButton}
            onClick={() => window.location.href = '/'}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default LazyLoadError;