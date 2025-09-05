export interface User {
  farcasterId: string;
  ethAddress: string;
  completedModules: string[];
  score: number;
  badges: Badge[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Module {
  id: string;
  title: string;
  content: ModuleContent;
  type: 'basics' | 'dispute' | 'advanced';
  points: number;
  unlocks: string[];
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ModuleContent {
  introduction: string;
  sections: ModuleSection[];
  quiz: QuizQuestion[];
  summary: string;
}

export interface ModuleSection {
  title: string;
  content: string;
  examples?: string[];
  tips?: string[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
}

export interface Badge {
  id: string;
  name: string;
  type: 'completion' | 'streak' | 'score' | 'special';
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  description: string;
  icon: string;
  earnedAt?: Date;
}

export interface Reward {
  id: string;
  name: string;
  type: 'badge' | 'points' | 'nft' | 'unlock';
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
  value: number;
  description: string;
}

export interface UserProgress {
  moduleId: string;
  progress: number; // 0-100
  currentSection: number;
  quizScore?: number;
  timeSpent: number; // in minutes
  completed: boolean;
  completedAt?: Date;
}

export interface DisputeGuide {
  id: string;
  title: string;
  category: 'harassment' | 'discrimination' | 'wage' | 'safety' | 'termination';
  steps: DisputeStep[];
  resources: Resource[];
  severity: 'low' | 'medium' | 'high' | 'urgent';
}

export interface DisputeStep {
  step: number;
  title: string;
  description: string;
  actions: string[];
  timeframe?: string;
  documentation?: string[];
}

export interface Resource {
  title: string;
  type: 'link' | 'document' | 'contact' | 'form';
  url?: string;
  description: string;
}

export interface GameStats {
  totalScore: number;
  streak: number;
  modulesCompleted: number;
  badgesEarned: number;
  rank: string;
  level: number;
  nextLevelPoints: number;
}
