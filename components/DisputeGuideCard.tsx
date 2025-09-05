'use client';

import { DisputeGuide } from '@/lib/types';
import { AlertTriangle, Clock, FileText } from 'lucide-react';

interface DisputeGuideCardProps {
  guide: DisputeGuide;
  onSelect: (guideId: string) => void;
  className?: string;
}

export function DisputeGuideCard({ guide, onSelect, className = '' }: DisputeGuideCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'urgent': return 'text-red-400 bg-red-500 bg-opacity-20';
      case 'high': return 'text-orange-400 bg-orange-500 bg-opacity-20';
      case 'medium': return 'text-yellow-400 bg-yellow-500 bg-opacity-20';
      case 'low': return 'text-green-400 bg-green-500 bg-opacity-20';
      default: return 'text-gray-400 bg-gray-500 bg-opacity-20';
    }
  };

  const getSeverityIcon = (severity: string) => {
    if (severity === 'urgent' || severity === 'high') {
      return <AlertTriangle className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  return (
    <div 
      className={`module-card ${className}`}
      onClick={() => onSelect(guide.id)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-dark-text mb-2">{guide.title}</h3>
          <div className="flex items-center space-x-3 mb-3">
            <div className={`badge ${getSeverityColor(guide.severity)} flex items-center`}>
              {getSeverityIcon(guide.severity)}
              <span className="ml-1 capitalize">{guide.severity}</span>
            </div>
            <div className="text-sm text-gray-400 capitalize">{guide.category}</div>
          </div>
        </div>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-400">
          <Clock className="w-4 h-4 mr-2" />
          {guide.steps.length} steps to resolution
        </div>
        <div className="flex items-center text-sm text-gray-400">
          <FileText className="w-4 h-4 mr-2" />
          {guide.resources.length} helpful resources
        </div>
      </div>
      
      <div className="text-sm text-gray-300">
        Step-by-step guidance for resolving {guide.category} issues in the workplace.
      </div>
    </div>
  );
}
