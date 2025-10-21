import React from 'react';
import styles from '../ResultsPage.module.css';

interface ErrorMessageProps {
  error: string;
  onDismiss: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = React.memo(({
  error,
  onDismiss,
}) => {
  return (
    <div className={styles.error} role="alert">
      {error}
      <button 
        onClick={onDismiss} 
        style={{ marginLeft: '1rem' }}
        type="button"
        aria-label="Dismiss error"
      >
        Dismiss
      </button>
    </div>
  );
});

ErrorMessage.displayName = 'ErrorMessage';