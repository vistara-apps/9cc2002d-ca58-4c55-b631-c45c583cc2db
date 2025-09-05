'use client';

import { Badge, GameStats } from '@/lib/types';

interface GamificationCardProps {
  variant: 'badge' | 'score';
  data: Badge | GameStats;
  className?: string;
}

export function GamificationCard({ variant, data, className = '' }: GamificationCardProps) {
  if (variant === 'badge') {
    const badge = data as Badge;
    return (
      <div className={`gamification-card ${className}`}>
        <div className="text-2xl mb-2">{badge.icon}</div>
        <h3 className="font-semibold text-dark-text">{badge.name}</h3>
        <p className="text-sm text-gray-400 mt-1">{badge.description}</p>
        <div className={`badge badge-${badge.level === 'bronze' ? 'warning' : badge.level === 'silver' ? 'info' : 'success'} mt-2`}>
          {badge.level}
        </div>
      </div>
    );
  }

  const stats = data as GameStats;
  return (
    <div className={`gamification-card ${className}`}>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gradient">{stats.totalScore}</div>
          <div className="text-xs text-gray-400">Total Score</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">{stats.level}</div>
          <div className="text-xs text-gray-400">Level</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-primary">{stats.modulesCompleted}</div>
          <div className="text-xs text-gray-400">Modules</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-yellow-400">{stats.badgesEarned}</div>
          <div className="text-xs text-gray-400">Badges</div>
        </div>
      </div>
      <div className="mt-4 text-center">
        <div className="text-sm font-medium text-dark-text">{stats.rank}</div>
        {stats.nextLevelPoints > 0 && (
          <div className="text-xs text-gray-400 mt-1">
            {stats.nextLevelPoints} points to next level
          </div>
        )}
      </div>
    </div>
  );
}
