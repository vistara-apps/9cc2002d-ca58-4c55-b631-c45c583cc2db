import { Module, Badge, DisputeGuide } from './types';

export const MODULES: Module[] = [
  {
    id: 'onboarding-basics',
    title: 'Onboarding Legal Basics',
    type: 'basics',
    points: 100,
    unlocks: ['dispute-resolution'],
    duration: 15,
    difficulty: 'beginner',
    content: {
      introduction: 'Learn the fundamental workplace rights every employee should know.',
      sections: [
        {
          title: 'Working Hours & Overtime',
          content: 'Understanding your rights regarding work schedules, breaks, and overtime compensation.',
          examples: [
            'Standard 40-hour work week',
            'Overtime pay at 1.5x rate after 40 hours',
            'Required break periods'
          ],
          tips: [
            'Keep track of your hours worked',
            'Know your state\'s specific overtime laws',
            'Understand exempt vs non-exempt status'
          ]
        },
        {
          title: 'Workplace Safety',
          content: 'Your right to a safe working environment and how to report safety concerns.',
          examples: [
            'OSHA safety standards',
            'Right to refuse unsafe work',
            'Reporting workplace injuries'
          ],
          tips: [
            'Report safety hazards immediately',
            'Know your company\'s safety procedures',
            'Document any safety incidents'
          ]
        },
        {
          title: 'Anti-Discrimination Laws',
          content: 'Protection from discrimination based on protected characteristics.',
          examples: [
            'Title VII protections',
            'ADA accommodations',
            'Age discrimination laws'
          ],
          tips: [
            'Document discriminatory incidents',
            'Know your company\'s reporting procedures',
            'Understand what constitutes discrimination'
          ]
        }
      ],
      quiz: [
        {
          id: 'q1',
          question: 'After how many hours of work in a week are you typically entitled to overtime pay?',
          options: ['35 hours', '40 hours', '45 hours', '50 hours'],
          correctAnswer: 1,
          explanation: 'Under the Fair Labor Standards Act, non-exempt employees are entitled to overtime pay after working 40 hours in a workweek.',
          points: 25
        },
        {
          id: 'q2',
          question: 'Which of the following is NOT a protected characteristic under federal anti-discrimination laws?',
          options: ['Race', 'Religion', 'Political affiliation', 'Disability'],
          correctAnswer: 2,
          explanation: 'Political affiliation is not a federally protected characteristic, though some states may provide additional protections.',
          points: 25
        },
        {
          id: 'q3',
          question: 'What should you do if you notice a safety hazard at work?',
          options: ['Ignore it if it doesn\'t affect you', 'Report it to your supervisor immediately', 'Wait until someone gets hurt', 'Fix it yourself'],
          correctAnswer: 1,
          explanation: 'Safety hazards should be reported immediately to prevent accidents and injuries.',
          points: 25
        },
        {
          id: 'q4',
          question: 'Can your employer retaliate against you for filing a discrimination complaint?',
          options: ['Yes, it\'s their right', 'No, retaliation is illegal', 'Only if you\'re wrong', 'It depends on the state'],
          correctAnswer: 1,
          explanation: 'Retaliation for filing discrimination complaints is illegal under federal law.',
          points: 25
        }
      ],
      summary: 'You\'ve learned the basics of workplace rights including overtime, safety, and anti-discrimination protections. Remember to document incidents and know your company\'s reporting procedures.'
    }
  },
  {
    id: 'dispute-resolution',
    title: 'Dispute Resolution Guide',
    type: 'dispute',
    points: 150,
    unlocks: ['advanced-rights'],
    duration: 20,
    difficulty: 'intermediate',
    content: {
      introduction: 'Learn how to effectively address and resolve workplace disputes.',
      sections: [
        {
          title: 'Internal Resolution Process',
          content: 'Steps to resolve disputes within your organization before seeking external help.',
          examples: [
            'Speaking with your supervisor',
            'HR complaint process',
            'Internal mediation programs'
          ],
          tips: [
            'Document everything in writing',
            'Follow company procedures',
            'Keep copies of all communications'
          ]
        },
        {
          title: 'External Resources',
          content: 'When and how to seek help from external agencies and organizations.',
          examples: [
            'EEOC complaints',
            'Department of Labor',
            'State labor boards'
          ],
          tips: [
            'Know the filing deadlines',
            'Gather supporting documentation',
            'Consider legal consultation'
          ]
        },
        {
          title: 'Legal Protections',
          content: 'Understanding your legal protections during dispute resolution.',
          examples: [
            'Anti-retaliation laws',
            'Whistleblower protections',
            'Right to representation'
          ],
          tips: [
            'Know your rights',
            'Document any retaliation',
            'Seek legal advice when needed'
          ]
        }
      ],
      quiz: [
        {
          id: 'q1',
          question: 'What should be your first step when facing a workplace dispute?',
          options: ['File a lawsuit', 'Contact the media', 'Follow internal company procedures', 'Quit your job'],
          correctAnswer: 2,
          explanation: 'Most disputes should first be addressed through internal company procedures before seeking external remedies.',
          points: 30
        },
        {
          id: 'q2',
          question: 'How long do you typically have to file an EEOC complaint?',
          options: ['30 days', '90 days', '180 days', '1 year'],
          correctAnswer: 2,
          explanation: 'You generally have 180 days to file an EEOC complaint, though this may be extended to 300 days in some states.',
          points: 40
        },
        {
          id: 'q3',
          question: 'What is the most important thing to do when documenting a workplace dispute?',
          options: ['Write everything down immediately', 'Wait to see if it happens again', 'Only document major incidents', 'Let HR handle the documentation'],
          correctAnswer: 0,
          explanation: 'Immediate documentation while details are fresh is crucial for building a strong case.',
          points: 40
        },
        {
          id: 'q4',
          question: 'Can your employer fire you for filing a complaint about workplace violations?',
          options: ['Yes, at-will employment allows this', 'No, this would be illegal retaliation', 'Only if the complaint is false', 'It depends on your contract'],
          correctAnswer: 1,
          explanation: 'Firing someone for filing legitimate workplace complaints constitutes illegal retaliation.',
          points: 40
        }
      ],
      summary: 'You now understand the dispute resolution process, from internal procedures to external resources. Remember to document everything and follow proper procedures.'
    }
  }
];

export const BADGES: Badge[] = [
  {
    id: 'first-module',
    name: 'First Steps',
    type: 'completion',
    level: 'bronze',
    description: 'Completed your first learning module',
    icon: '🎯'
  },
  {
    id: 'basics-master',
    name: 'Basics Master',
    type: 'completion',
    level: 'silver',
    description: 'Mastered the onboarding basics module',
    icon: '📚'
  },
  {
    id: 'dispute-expert',
    name: 'Dispute Expert',
    type: 'completion',
    level: 'gold',
    description: 'Completed the dispute resolution guide',
    icon: '⚖️'
  },
  {
    id: 'perfect-score',
    name: 'Perfect Score',
    type: 'score',
    level: 'gold',
    description: 'Achieved 100% on a module quiz',
    icon: '🏆'
  },
  {
    id: 'streak-7',
    name: 'Week Warrior',
    type: 'streak',
    level: 'silver',
    description: 'Maintained a 7-day learning streak',
    icon: '🔥'
  },
  {
    id: 'knowledge-seeker',
    name: 'Knowledge Seeker',
    type: 'special',
    level: 'platinum',
    description: 'Completed all available modules',
    icon: '🌟'
  }
];

export const DISPUTE_GUIDES: DisputeGuide[] = [
  {
    id: 'harassment-guide',
    title: 'Workplace Harassment',
    category: 'harassment',
    severity: 'high',
    steps: [
      {
        step: 1,
        title: 'Document the Incident',
        description: 'Record details of the harassment immediately',
        actions: [
          'Write down date, time, location, and witnesses',
          'Save any relevant emails, texts, or documents',
          'Take photos if applicable'
        ],
        timeframe: 'Immediately after incident',
        documentation: ['Incident report', 'Evidence photos', 'Witness statements']
      },
      {
        step: 2,
        title: 'Report to Supervisor or HR',
        description: 'Follow your company\'s reporting procedures',
        actions: [
          'Check employee handbook for procedures',
          'Submit written complaint to HR',
          'Request acknowledgment of receipt'
        ],
        timeframe: 'Within 24-48 hours',
        documentation: ['Written complaint', 'Receipt confirmation']
      },
      {
        step: 3,
        title: 'Follow Up',
        description: 'Ensure your complaint is being addressed',
        actions: [
          'Request updates on investigation',
          'Continue documenting any incidents',
          'Report any retaliation'
        ],
        timeframe: 'Weekly follow-ups',
        documentation: ['Follow-up emails', 'Investigation updates']
      }
    ],
    resources: [
      {
        title: 'EEOC Harassment Information',
        type: 'link',
        url: 'https://www.eeoc.gov/harassment',
        description: 'Federal guidelines on workplace harassment'
      },
      {
        title: 'State Labor Board',
        type: 'contact',
        description: 'Contact your state labor board for additional support'
      }
    ]
  },
  {
    id: 'wage-dispute',
    title: 'Wage and Hour Disputes',
    category: 'wage',
    severity: 'medium',
    steps: [
      {
        step: 1,
        title: 'Gather Documentation',
        description: 'Collect all records related to your wages and hours',
        actions: [
          'Gather pay stubs and timesheets',
          'Document actual hours worked',
          'Calculate unpaid wages or overtime'
        ],
        timeframe: 'Before filing complaint',
        documentation: ['Pay stubs', 'Time records', 'Wage calculations']
      },
      {
        step: 2,
        title: 'Speak with Payroll/HR',
        description: 'Address the issue internally first',
        actions: [
          'Present documentation to payroll',
          'Request correction in writing',
          'Set deadline for resolution'
        ],
        timeframe: '1-2 weeks',
        documentation: ['Written request', 'Response from employer']
      },
      {
        step: 3,
        title: 'File External Complaint',
        description: 'Contact Department of Labor if internal resolution fails',
        actions: [
          'File complaint with DOL Wage and Hour Division',
          'Provide all documentation',
          'Cooperate with investigation'
        ],
        timeframe: 'If no internal resolution',
        documentation: ['DOL complaint form', 'Supporting evidence']
      }
    ],
    resources: [
      {
        title: 'DOL Wage and Hour Division',
        type: 'link',
        url: 'https://www.dol.gov/agencies/whd',
        description: 'File wage and hour complaints'
      },
      {
        title: 'Wage Calculator',
        type: 'link',
        url: 'https://www.dol.gov/agencies/whd/overtime-calculator',
        description: 'Calculate overtime pay'
      }
    ]
  }
];

export const GAME_LEVELS = [
  { level: 1, minPoints: 0, title: 'Newcomer', color: 'text-gray-400' },
  { level: 2, minPoints: 100, title: 'Learner', color: 'text-blue-400' },
  { level: 3, minPoints: 300, title: 'Informed', color: 'text-green-400' },
  { level: 4, minPoints: 600, title: 'Knowledgeable', color: 'text-yellow-400' },
  { level: 5, minPoints: 1000, title: 'Expert', color: 'text-purple-400' },
  { level: 6, minPoints: 1500, title: 'Rights Champion', color: 'text-pink-400' },
];

export const PRICING = {
  MODULE: 0.99,
  PREMIUM: 4.99,
  ENTERPRISE: 'Custom'
};
