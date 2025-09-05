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
    <section className={`glass-card p-6 rounded-lg ${className} animate-fade-in`} aria-labelledby="progress-heading">
      <h2 id="progress-heading" className="text-xl font-bold text-dark-text mb-6">Your Progress</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center group">
          <div className="flex items-center justify-center w-14 h-14 bg-primary bg-opacity-20 rounded-full mb-3 mx-auto 
                          group-hover:bg-opacity-30 transition-all duration-200 group-hover:scale-105">
            <Trophy className="w-7 h-7 text-primary" aria-hidden="true" />
          </div>
          <div className="text-2xl font-bold text-gradient animate-scale-in" aria-label={`${stats.totalScore} total points`}>
            {stats.totalScore}
          </div>
          <div className="text-sm text-gray-400 font-medium">Total Points</div>
        </div>
        
        <div className="text-center group">
          <div className="flex items-center justify-center w-14 h-14 bg-accent bg-opacity-20 rounded-full mb-3 mx-auto
                          group-hover:bg-opacity-30 transition-all duration-200 group-hover:scale-105">
            <Target className="w-7 h-7 text-accent" aria-hidden="true" />
          </div>
          <div className="text-2xl font-bold text-accent animate-scale-in" aria-label={`Level ${stats.level}`}>
            {stats.level}
          </div>
          <div className="text-sm text-gray-400 font-medium">Level</div>
        </div>
        
        <div className="text-center group">
          <div className="flex items-center justify-center w-14 h-14 bg-yellow-400 bg-opacity-20 rounded-full mb-3 mx-auto
                          group-hover:bg-opacity-30 transition-all duration-200 group-hover:scale-105">
            <Award className="w-7 h-7 text-yellow-400" aria-hidden="true" />
          </div>
          <div className="text-xl font-bold text-yellow-400 animate-scale-in" aria-label={`${stats.badgesEarned} badges earned`}>
            {stats.badgesEarned}
          </div>
          <div className="text-sm text-gray-400 font-medium">Badges</div>
        </div>
        
        <div className="text-center group">
          <div className="flex items-center justify-center w-14 h-14 bg-purple-400 bg-opacity-20 rounded-full mb-3 mx-auto
                          group-hover:bg-opacity-30 transition-all duration-200 group-hover:scale-105">
            <TrendingUp className="w-7 h-7 text-purple-400" aria-hidden="true" />
          </div>
          <div className="text-xl font-bold text-purple-400 animate-scale-in" aria-label={`${stats.modulesCompleted} modules completed`}>
            {stats.modulesCompleted}
          </div>
          <div className="text-sm text-gray-400 font-medium">Completed</div>
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
