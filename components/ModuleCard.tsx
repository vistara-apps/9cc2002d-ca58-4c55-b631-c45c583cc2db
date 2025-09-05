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
    <div 
      className={`module-card ${isLocked ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-dark-text mb-2">{module.title}</h3>
          <p className="text-sm text-gray-400 mb-3">{module.content.introduction}</p>
        </div>
        {isLocked && <Lock className="w-5 h-5 text-gray-500 ml-2" />}
        {isCompleted && <Star className="w-5 h-5 text-yellow-400 ml-2 fill-current" />}
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            {formatDuration(module.duration)}
          </div>
          <div className={`badge badge-${module.difficulty === 'beginner' ? 'success' : module.difficulty === 'intermediate' ? 'warning' : 'info'}`}>
            {module.difficulty}
          </div>
        </div>
        <div className="text-accent font-medium">
          +{module.points} pts
        </div>
      </div>
      
      {!isLocked && (
        <div className="mt-4">
          <div className="text-xs text-gray-500 mb-2">
            {module.content.sections.length} sections • {module.content.quiz.length} quiz questions
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-accent to-primary h-1 rounded-full transition-all duration-300"
              style={{ width: isCompleted ? '100%' : '0%' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
