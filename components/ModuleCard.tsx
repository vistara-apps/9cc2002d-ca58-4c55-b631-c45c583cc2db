'use client';

import { Module } from '@/lib/types';
import { Clock, Star, Lock } from 'lucide-react';
import { formatDuration } from '@/lib/utils';

interface ModuleCardProps {
  module: Module;
  isCompleted: boolean;
  isLocked: boolean;
  onStart: (moduleId: string) => void;
  className?: string;
}

export function ModuleCard({ 
  module, 
  isCompleted, 
  isLocked, 
  onStart, 
  className = '' 
}: ModuleCardProps) {
  const handleClick = () => {
    if (!isLocked) {
      onStart(module.id);
    }
  };

  return (
    <article 
      className={`module-card ${isLocked ? 'locked' : ''} ${className} animate-fade-in`}
      onClick={handleClick}
      role={isLocked ? undefined : "button"}
      tabIndex={isLocked ? -1 : 0}
      onKeyDown={(e) => {
        if (!isLocked && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${module.title} - ${isCompleted ? 'Completed' : isLocked ? 'Locked' : 'Available'}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-dark-text group-hover:text-primary transition-colors">
              {module.title}
            </h3>
            {isLocked && (
              <Lock className="w-4 h-4 text-gray-500 flex-shrink-0" aria-label="Module locked" />
            )}
            {isCompleted && (
              <Star className="w-4 h-4 text-yellow-400 fill-current flex-shrink-0" aria-label="Module completed" />
            )}
          </div>
          <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
            {module.content.introduction}
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center text-gray-400">
            <Clock className="w-4 h-4 mr-1" aria-hidden="true" />
            <span>{formatDuration(module.duration)}</span>
          </div>
          <div className={`badge ${
            module.difficulty === 'beginner' ? 'badge-success' : 
            module.difficulty === 'intermediate' ? 'badge-warning' : 
            'badge-info'
          }`}>
            {module.difficulty}
          </div>
        </div>
        <div className="text-accent font-semibold text-base">
          +{module.points} pts
        </div>
      </div>
      
      {!isLocked && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{module.content.sections.length} sections</span>
            <span>{module.content.quiz.length} quiz questions</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">Progress</span>
              <span className="text-gray-400">{isCompleted ? '100%' : '0%'}</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: isCompleted ? '100%' : '0%' }}
                role="progressbar"
                aria-valuenow={isCompleted ? 100 : 0}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Module progress: ${isCompleted ? '100' : '0'}%`}
              />
            </div>
          </div>
          
          {!isCompleted && (
            <div className="pt-2">
              <div className="text-xs text-primary font-medium group-hover:text-primary-400 transition-colors">
                Click to start learning →
              </div>
            </div>
          )}
        </div>
      )}
      
      {isLocked && (
        <div className="mt-4 p-3 bg-gray-800 bg-opacity-50 rounded-lg">
          <p className="text-xs text-gray-500 text-center">
            Complete previous modules to unlock
          </p>
        </div>
      )}
    </article>
  );
}
