'use client';

import { GameStats } from '@/lib/types';
import { Trophy, Target, Award, TrendingUp } from 'lucide-react';
import { ProgressTracker } from './ProgressTracker';

interface UserStatsProps {
  stats: GameStats;
  className?: string;
}

export function UserStats({ stats, className = '' }: UserStatsProps) {
  return (
    <div className={`glass-card p-6 rounded-lg ${className}`}>
      <h2 className="text-xl font-bold text-dark-text mb-6">Your Progress</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-primary bg-opacity-20 rounded-full mb-2 mx-auto">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <div className="text-2xl font-bold text-gradient">{stats.totalScore}</div>
          <div className="text-sm text-gray-400">Total Points</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-accent bg-opacity-20 rounded-full mb-2 mx-auto">
            <Target className="w-6 h-6 text-accent" />
          </div>
          <div className="text-2xl font-bold text-accent">{stats.level}</div>
          <div className="text-sm text-gray-400">Level</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-400 bg-opacity-20 rounded-full mb-2 mx-auto">
            <Award className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-xl font-bold text-yellow-400">{stats.badgesEarned}</div>
          <div className="text-sm text-gray-400">Badges</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-400 bg-opacity-20 rounded-full mb-2 mx-auto">
            <TrendingUp className="w-6 h-6 text-purple-400" />
          </div>
          <div className="text-xl font-bold text-purple-400">{stats.modulesCompleted}</div>
          <div className="text-sm text-gray-400">Completed</div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-dark-text">{stats.rank}</span>
          {stats.nextLevelPoints > 0 && (
            <span className="text-sm text-gray-400">
              {stats.nextLevelPoints} pts to next level
            </span>
          )}
        </div>
        {stats.nextLevelPoints > 0 && (
          <ProgressTracker
            current={stats.totalScore}
            total={stats.totalScore + stats.nextLevelPoints}
            showPercentage={false}
          />
        )}
      </div>
      
      {stats.streak > 0 && (
        <div className="flex items-center justify-center p-3 bg-orange-500 bg-opacity-20 rounded-lg">
          <span className="text-orange-400 mr-2">🔥</span>
          <span className="text-sm font-medium text-dark-text">
            {stats.streak} day learning streak!
          </span>
        </div>
      )}
    </div>
  );
}
