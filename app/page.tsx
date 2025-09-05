'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name } from '@coinbase/onchainkit/identity';
import { User, Module, GameStats } from '@/lib/types';
import { MODULES, BADGES } from '@/lib/constants';
import { calculateGameStats, canUnlockModule, generateUserId } from '@/lib/utils';
import { ModuleCard } from '@/components/ModuleCard';
import { UserStats } from '@/components/UserStats';
import { GamificationCard } from '@/components/GamificationCard';
import { FrameButton } from '@/components/FrameButton';
import { BookOpen, Award, HelpCircle, Users } from 'lucide-react';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [user, setUser] = useState<User | null>(null);
  const [selectedView, setSelectedView] = useState<'modules' | 'badges' | 'disputes' | 'profile'>('modules');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setFrameReady();
    initializeUser();
  }, [setFrameReady]);

  const initializeUser = async () => {
    try {
      // In a real app, this would fetch from your backend
      const mockUser: User = {
        farcasterId: generateUserId(),
        ethAddress: '0x1234...5678',
        completedModules: [],
        score: 0,
        badges: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setUser(mockUser);
    } catch (error) {
      console.error('Failed to initialize user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartModule = (moduleId: string) => {
    if (!user) return;
    
    // In a real app, this would navigate to the module page
    console.log('Starting module:', moduleId);
    
    // For demo purposes, mark as completed and award points
    const module = MODULES.find(m => m.id === moduleId);
    if (module && !user.completedModules.includes(moduleId)) {
      const updatedUser = {
        ...user,
        completedModules: [...user.completedModules, moduleId],
        score: user.score + module.points,
        badges: [...user.badges, ...BADGES.filter(b => 
          (b.id === 'first-module' && user.completedModules.length === 0) ||
          (b.id === 'basics-master' && moduleId === 'onboarding-basics') ||
          (b.id === 'dispute-expert' && moduleId === 'dispute-resolution')
        )]
      };
      setUser(updatedUser);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="text-center animate-fade-in">
          <div className="loading-spinner h-12 w-12 mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm">Loading your learning journey...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-dark-bg">
        <div className="text-center max-w-md mx-auto animate-fade-in">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gradient mb-4">
              Welcome to Know Your Rights Bot
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-2">
              Empower yourself with workplace knowledge
            </p>
            <p className="text-gray-500 text-sm">
              Connect your wallet to start your learning journey and earn rewards
            </p>
          </div>
          
          <div className="glass-card p-6 rounded-xl">
            <Wallet>
              <ConnectWallet>
                <Name />
              </ConnectWallet>
            </Wallet>
          </div>
          
          <div className="mt-6 text-xs text-gray-500">
            <p>🔒 Secure • 🎓 Educational • 🏆 Rewarding</p>
          </div>
        </div>
      </div>
    );
  }

  const stats = calculateGameStats(user);

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="glass-card border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gradient">Know Your Rights Bot</h1>
              <p className="text-sm text-gray-400">Empower yourself with workplace knowledge</p>
            </div>
            <Wallet>
              <ConnectWallet>
                <Name />
              </ConnectWallet>
            </Wallet>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="glass-card border-b border-gray-700" role="navigation" aria-label="Main navigation">
        <div className="max-w-4xl mx-auto px-4">
          {/* Desktop Navigation */}
          <div className="hidden sm:flex space-x-1">
            {[
              { id: 'modules', label: 'Learn', icon: BookOpen, description: 'Browse learning modules' },
              { id: 'badges', label: 'Badges', icon: Award, description: 'View your achievements' },
              { id: 'disputes', label: 'Help', icon: HelpCircle, description: 'Get help with workplace issues' },
              { id: 'profile', label: 'Profile', icon: Users, description: 'View your profile and progress' }
            ].map(({ id, label, icon: Icon, description }) => (
              <button
                key={id}
                onClick={() => setSelectedView(id as any)}
                className={`nav-item ${selectedView === id ? 'active' : ''}`}
                aria-pressed={selectedView === id}
                aria-label={`${label} - ${description}`}
                title={description}
              >
                <Icon className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="sm:hidden">
            <div className="flex justify-between items-center py-2">
              <h2 className="text-lg font-semibold text-dark-text">
                {selectedView === 'modules' && 'Learn'}
                {selectedView === 'badges' && 'Badges'}
                {selectedView === 'disputes' && 'Help'}
                {selectedView === 'profile' && 'Profile'}
              </h2>
            </div>
            
            {/* Mobile Tab Bar - Fixed at bottom */}
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-dark-surface bg-opacity-95 backdrop-blur-md border-t border-gray-700">
              <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
                {[
                  { id: 'modules', label: 'Learn', icon: BookOpen },
                  { id: 'badges', label: 'Badges', icon: Award },
                  { id: 'disputes', label: 'Help', icon: HelpCircle },
                  { id: 'profile', label: 'Profile', icon: Users }
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedView(id as any)}
                    className={`touch-target flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 rounded-lg ${
                      selectedView === id
                        ? 'text-primary'
                        : 'text-gray-400 hover:text-dark-text'
                    }`}
                    aria-pressed={selectedView === id}
                    aria-label={label}
                  >
                    <Icon className={`w-5 h-5 mb-1 ${selectedView === id ? 'text-primary' : ''}`} aria-hidden="true" />
                    <span className={selectedView === id ? 'text-primary' : ''}>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6 pb-24 sm:pb-6" role="main">
        {selectedView === 'modules' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-bold text-dark-text mb-4">Learning Modules</h2>
                <div className="space-y-4">
                  {MODULES.map((module) => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      isCompleted={user.completedModules.includes(module.id)}
                      isLocked={!canUnlockModule(module.id, user.completedModules)}
                      onStart={handleStartModule}
                    />
                  ))}
                </div>
              </div>
              <div>
                <UserStats stats={stats} />
              </div>
            </div>
          </div>
        )}

        {selectedView === 'badges' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-dark-text mb-4">Your Achievements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {user.badges.map((badge) => (
                <GamificationCard
                  key={badge.id}
                  variant="badge"
                  data={badge}
                />
              ))}
              {user.badges.length === 0 && (
                <div className="col-span-full empty-state animate-fade-in">
                  <Award className="empty-state-icon" aria-hidden="true" />
                  <h3 className="empty-state-title">No badges yet</h3>
                  <p className="empty-state-description">
                    Complete learning modules to earn your first badge and show off your workplace knowledge!
                  </p>
                  <button
                    onClick={() => setSelectedView('modules')}
                    className="btn-primary mt-4 animate-bounce-subtle"
                  >
                    Start Learning
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedView === 'disputes' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-dark-text mb-4">Dispute Resolution</h2>
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-dark-text mb-4">Need Help with a Workplace Issue?</h3>
              <p className="text-gray-400 mb-6">
                Our step-by-step guides will help you understand your options and take appropriate action.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-lg">
                  <h4 className="font-semibold text-dark-text mb-2">Harassment Issues</h4>
                  <p className="text-sm text-gray-400 mb-3">Get guidance on addressing workplace harassment</p>
                  <FrameButton variant="secondary" className="w-full">
                    View Guide
                  </FrameButton>
                </div>
                <div className="glass-card p-4 rounded-lg">
                  <h4 className="font-semibold text-dark-text mb-2">Wage Disputes</h4>
                  <p className="text-sm text-gray-400 mb-3">Learn how to resolve pay and overtime issues</p>
                  <FrameButton variant="secondary" className="w-full">
                    View Guide
                  </FrameButton>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedView === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-dark-text mb-4">Your Profile</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <UserStats stats={stats} />
              <GamificationCard variant="score" data={stats} />
            </div>
            
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-dark-text mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {user.completedModules.length > 0 ? (
                  user.completedModules.map((moduleId) => {
                    const module = MODULES.find(m => m.id === moduleId);
                    return (
                      <div key={moduleId} className="flex items-center justify-between py-2 border-b border-gray-700 last:border-b-0">
                        <div>
                          <div className="font-medium text-dark-text">{module?.title}</div>
                          <div className="text-sm text-gray-400">Completed</div>
                        </div>
                        <div className="text-accent font-medium">+{module?.points} pts</div>
                      </div>
                    );
                  })
                ) : (
                  <div className="empty-state">
                    <BookOpen className="empty-state-icon" aria-hidden="true" />
                    <h4 className="empty-state-title">No activity yet</h4>
                    <p className="empty-state-description">
                      Start learning to see your progress and track your achievements!
                    </p>
                    <button
                      onClick={() => setSelectedView('modules')}
                      className="btn-secondary mt-4"
                    >
                      Browse Modules
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-gray-700 mt-12">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <p className="text-sm text-gray-400">
              Know Your Rights Bot - Empowering employees with workplace knowledge
            </p>
            <div className="flex justify-center space-x-4 mt-2">
              <span className="text-xs text-gray-500">Module: $0.99</span>
              <span className="text-xs text-gray-500">Premium: $4.99</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
