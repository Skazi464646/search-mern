import React, { forwardRef } from 'react';
import styles from './Input.module.css';

export type InputVariant = 'default' | 'search' | 'outline';
export type InputSize = 'small' | 'medium' | 'large';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  error?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = 'default',
  size = 'medium',
  error = false,
  leftIcon,
  rightIcon,
  loading = false,
  className = '',
  ...props
}, ref) => {
  const containerClasses = [
    styles.container,
    styles[variant],
    styles[size],
    error && styles.error,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClasses}>
      {leftIcon && (
        <div className={styles.leftIcon}>
          {leftIcon}
        </div>
      )}
      
      <input
        ref={ref}
        className={styles.input}
        {...props}
      />
      
      {loading && (
        <div className={styles.loadingSpinner}>
          <div className={styles.spinner} />
        </div>
      )}
      
      {rightIcon && !loading && (
        <div className={styles.rightIcon}>
          {rightIcon}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default React.memo(Input);