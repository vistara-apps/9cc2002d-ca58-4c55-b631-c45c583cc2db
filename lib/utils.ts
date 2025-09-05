import { GameStats, User, Badge, GAME_LEVELS } from './types';

export function calculateGameStats(user: User): GameStats {
  const level = GAME_LEVELS.find(l => user.score >= l.minPoints && 
    (GAME_LEVELS[GAME_LEVELS.indexOf(l) + 1]?.minPoints > user.score || 
     GAME_LEVELS.indexOf(l) === GAME_LEVELS.length - 1)) || GAME_LEVELS[0];
  
  const nextLevel = GAME_LEVELS[GAME_LEVELS.indexOf(level) + 1];
  
  return {
    totalScore: user.score,
    streak: 0, // Would be calculated from user activity
    modulesCompleted: user.completedModules.length,
    badgesEarned: user.badges.length,
    rank: level.title,
    level: level.level,
    nextLevelPoints: nextLevel ? nextLevel.minPoints - user.score : 0
  };
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function calculateProgress(completed: number, total: number): number {
  return Math.round((completed / total) * 100);
}

export function getBadgesByType(badges: Badge[], type: Badge['type']): Badge[] {
  return badges.filter(badge => badge.type === type);
}

export function canUnlockModule(moduleId: string, completedModules: string[]): boolean {
  // Simple unlock logic - can be expanded
  if (moduleId === 'onboarding-basics') return true;
  if (moduleId === 'dispute-resolution') return completedModules.includes('onboarding-basics');
  return false;
}

export function formatScore(score: number): string {
  if (score >= 1000) {
    return `${(score / 1000).toFixed(1)}k`;
  }
  return score.toString();
}

export function getScoreColor(score: number): string {
  if (score >= 1500) return 'text-pink-400';
  if (score >= 1000) return 'text-purple-400';
  if (score >= 600) return 'text-yellow-400';
  if (score >= 300) return 'text-green-400';
  if (score >= 100) return 'text-blue-400';
  return 'text-gray-400';
}

export function generateUserId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function validateQuizAnswer(questionId: string, selectedAnswer: number, correctAnswer: number): boolean {
  return selectedAnswer === correctAnswer;
}

export function calculateQuizScore(correctAnswers: number, totalQuestions: number): number {
  return Math.round((correctAnswers / totalQuestions) * 100);
}

export function shouldAwardBadge(badgeId: string, user: User): boolean {
  // Check if user already has this badge
  if (user.badges.some(badge => badge.id === badgeId)) {
    return false;
  }

  switch (badgeId) {
    case 'first-module':
      return user.completedModules.length >= 1;
    case 'basics-master':
      return user.completedModules.includes('onboarding-basics');
    case 'dispute-expert':
      return user.completedModules.includes('dispute-resolution');
    case 'knowledge-seeker':
      return user.completedModules.length >= 2; // All available modules
    default:
      return false;
  }
}

export function getNextBadgeToEarn(user: User): Badge | null {
  // Logic to determine next achievable badge
  if (user.completedModules.length === 0) {
    return { id: 'first-module', name: 'First Steps', type: 'completion', level: 'bronze', description: 'Complete your first module', icon: '🎯' };
  }
  if (!user.completedModules.includes('onboarding-basics')) {
    return { id: 'basics-master', name: 'Basics Master', type: 'completion', level: 'silver', description: 'Master the basics', icon: '📚' };
  }
  return null;
}

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}
