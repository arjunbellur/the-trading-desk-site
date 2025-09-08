export interface CourseFeature {
  id: string;
  text: string;
}

export interface CourseData {
  id: string;
  courseNumber: string;
  subtitle: string;
  title: string;
  description: string;
  price: string;
  features: CourseFeature[];
  level: 'beginner' | 'intermediate' | 'advanced';
}

export const coursesData: CourseData[] = [
  {
    id: 'beginner',
    courseNumber: 'COURSE 01',
    subtitle: '',
    title: 'BEGINNER',
    description: 'A step-by-step guide to profitable trading. From market basics to building your first winning strategy.',
    price: '$297',
    features: [
      { id: 'videos', text: '24+ VIDEOS' },
      { id: 'calls', text: 'MONTHLY MARKET CALLS' },
      { id: 'simulator', text: 'TRADING SIMULATOR ACCESS' },
      { id: 'discord', text: 'EXCLUSIVE DISCORD GROUP' },
      { id: 'qa', text: 'LIVE Q&A SESSIONS' },
    ],
    level: 'beginner',
  },
  {
    id: 'intermediate',
    courseNumber: 'COURSE 02',
    subtitle: '',
    title: 'INTERMEDIATE',
    description: 'Master high-frequency strategies for active traders. Scalping, momentum, and intraday techniques.',
    price: '$497',
    features: [
      { id: 'videos', text: '40+ VIDEOS' },
      { id: 'analysis', text: 'DAILY MARKET ANALYSIS' },
      { id: 'room', text: 'LIVE TRADING ROOM' },
      { id: 'community', text: 'DISCORD COMMUNITY' },
      { id: 'mobile', text: 'MOBILE APP ACCESS' },
    ],
    level: 'intermediate',
  },
  {
    id: 'advanced',
    courseNumber: 'COURSE 03',
    subtitle: '',
    title: 'ADVANCED',
    description: 'Master complex options strategies. Income generation, hedging, and advanced Greeks analysis.',
    price: '$697',
    features: [
      { id: 'videos', text: '32+ VIDEOS' },
      { id: 'sessions', text: 'LIVE TRADING SESSIONS' },
      { id: 'mentorship', text: '1-ON-1 MENTORSHIP' },
      { id: 'backtesting', text: 'STRATEGY BACKTESTING' },
      { id: 'updates', text: 'LIFETIME UPDATES' },
    ],
    level: 'advanced',
  },
];
