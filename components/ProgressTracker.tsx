'use client';

interface ProgressTrackerProps {
  current: number;
  total: number;
  variant?: 'linear';
  showPercentage?: boolean;
  className?: string;
}

export function ProgressTracker({ 
  current, 
  total, 
  variant = 'linear',
  showPercentage = true,
  className = '' 
}: ProgressTrackerProps) {
  const percentage = Math.min((current / total) * 100, 100);

  return (
    <div className={`w-full ${className}`}>
      {showPercentage && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-400">Progress</span>
          <span className="text-sm font-medium text-dark-text">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="flex justify-between items-center mt-1">
        <span className="text-xs text-gray-500">{current} of {total}</span>
      </div>
    </div>
  );
}
