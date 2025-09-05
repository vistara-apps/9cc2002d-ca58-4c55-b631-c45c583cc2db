'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface FrameButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: ReactNode;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function FrameButton({ 
  variant = 'primary', 
  children, 
  loading = false,
  size = 'md',
  className = '',
  disabled,
  ...props 
}: FrameButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost'
  };

  return (
    <button
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${className} 
                  font-medium rounded-lg transition-all duration-200 
                  disabled:opacity-50 disabled:cursor-not-allowed
                  focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-bg
                  active:scale-95 touch-target`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <div className="loading-spinner h-4 w-4 mr-2" aria-hidden="true"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}
