/**
 * TEMPORARY MOCK DATA
 * 
 * This file provides TypeScript interfaces and mock data for development.
 * It will be replaced with actual Sanity CMS data once schemas are approved.
 * 
 * TODO: Replace with GROQ queries from src/lib/sanity/queries.ts
 */

// ========================================
// TYPESCRIPT INTERFACES
// ========================================

export interface CourseSummary {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  thumbnailUrl: string;
  price: number;
  originalPrice?: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  lessonCount: number;
  studentCount: number;
  rating: number;
  instructor: {
    name: string;
    avatar: string;
  };
  features: string[];
}

export interface CourseDetail extends CourseSummary {
  description: string;
  prerequisites: string[];
  whatYouWillLearn: string[];
  modules: CourseModule[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: LessonPreview[];
}

export interface LessonPreview {
  id: string;
  title: string;
  runtime: number; // seconds
  isLocked: boolean;
  isPreview: boolean; // free preview lesson
}

export interface LivestreamPreview {
  id: string;
  title: string;
  description: string;
  scheduledAt: string; // ISO date string
  duration: number; // minutes
  status: 'upcoming' | 'live' | 'ended';
  instructor: {
    name: string;
    avatar: string;
  };
  viewerCount?: number;
  accessLevel: 'free' | 'paid' | 'premium';
}

export interface Instructor {
  id: string;
  name: string;
  slug: string;
  bio: string;
  avatar: string;
  role: string;
  specializations: string[];
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
}

export interface Testimonial {
  id: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  rating: number;
  courseId?: string;
}

// ========================================
// MOCK DATA
// ========================================

export const mockCourses: CourseSummary[] = [
  {
    id: '1',
    title: 'Market Mastery Foundations',
    slug: 'market-mastery-foundations',
    shortDescription: 'Complete beginner\'s guide to profitable trading. Risk management, psychology, and proven strategies.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=1600&q=80',
    price: 297,
    originalPrice: 497,
    difficulty: 'beginner',
    duration: '6 weeks',
    lessonCount: 24,
    studentCount: 3247,
    rating: 4.9,
    instructor: {
      name: 'John Martinez',
      avatar: '/api/placeholder/64/64?text=JM'
    },
    features: [
      'Live Q&A sessions',
      'Trading simulator access',
      'Community access',
      'Certificate of completion',
      'Lifetime updates'
    ]
  },
  {
    id: '2',
    title: 'Advanced Options Strategies',
    slug: 'advanced-options-strategies',
    shortDescription: 'Master complex options plays. Income generation, hedging, and advanced Greeks analysis.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1561414927-6d86591d0c4f?auto=format&fit=crop&w=1600&q=80',
    price: 597,
    originalPrice: 897,
    difficulty: 'advanced',
    duration: '8 weeks',
    lessonCount: 32,
    studentCount: 1893,
    rating: 4.8,
    instructor: {
      name: 'Sarah Chen',
      avatar: '/api/placeholder/64/64?text=SC'
    },
    features: [
      'Live trading sessions',
      '1-on-1 mentorship',
      'Strategy backtesting',
      'Lifetime updates',
      'Private Discord channel'
    ]
  },
  {
    id: '3',
    title: 'Day Trading Intensive',
    slug: 'day-trading-intensive',
    shortDescription: 'High-frequency strategies for active traders. Scalping, momentum, and intraday techniques.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?auto=format&fit=crop&w=1600&q=80',
    price: 497,
    originalPrice: 697,
    difficulty: 'intermediate',
    duration: '10 weeks',
    lessonCount: 40,
    studentCount: 2156,
    rating: 4.9,
    instructor: {
      name: 'Michael Torres',
      avatar: '/api/placeholder/64/64?text=MT'
    },
    features: [
      'Daily market analysis',
      'Live trading room',
      'Discord community',
      'Mobile app access',
      'Real-time alerts'
    ]
  }
];

export const mockCourseDetails: Record<string, CourseDetail> = {
  'market-mastery-foundations': {
    ...mockCourses[0],
    description: 'This comprehensive course is designed for aspiring traders who want to build a solid foundation in the financial markets. You\'ll learn essential concepts, risk management strategies, and develop the psychological discipline needed for successful trading.',
    prerequisites: [
      'Basic understanding of financial markets',
      'Computer with internet connection',
      'Willingness to learn and practice'
    ],
    whatYouWillLearn: [
      'Fundamental and technical analysis',
      'Risk management and position sizing',
      'Trading psychology and emotional control',
      'Chart patterns and indicators',
      'Market structure and timing',
      'Creating a personal trading plan'
    ],
    modules: [
      {
        id: 'module-1',
        title: 'Market Fundamentals',
        description: 'Understanding market basics, terminology, and key concepts',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'Introduction to Financial Markets',
            runtime: 1200, // 20 minutes
            isLocked: false,
            isPreview: true
          },
          {
            id: 'lesson-1-2',
            title: 'Market Participants and Structure',
            runtime: 1800,
            isLocked: true,
            isPreview: false
          },
          {
            id: 'lesson-1-3',
            title: 'Order Types and Execution',
            runtime: 1500,
            isLocked: true,
            isPreview: false
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Technical Analysis',
        description: 'Chart reading, patterns, and indicators',
        lessons: [
          {
            id: 'lesson-2-1',
            title: 'Chart Types and Timeframes',
            runtime: 1400,
            isLocked: true,
            isPreview: false
          },
          {
            id: 'lesson-2-2',
            title: 'Support and Resistance',
            runtime: 1600,
            isLocked: true,
            isPreview: false
          }
        ]
      }
    ]
  }
};

export const mockLivestreams: LivestreamPreview[] = [
  {
    id: '1',
    title: 'Market Analysis & Options Trading Strategy',
    description: 'Deep dive into current market conditions and advanced options strategies for the upcoming week.',
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // Tomorrow
    duration: 120, // 2 hours
    status: 'upcoming',
    instructor: {
      name: 'Michael Torres',
      avatar: '/api/placeholder/64/64?text=MT'
    },
    accessLevel: 'premium'
  },
  {
    id: '2',
    title: 'Crypto Market Breakdown',
    description: 'Analysis of major cryptocurrency movements and DeFi opportunities.',
    scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // Day after tomorrow
    duration: 90,
    status: 'upcoming',
    instructor: {
      name: 'Sarah Chen',
      avatar: '/api/placeholder/64/64?text=SC'
    },
    accessLevel: 'paid'
  },
  {
    id: '3',
    title: 'Live Trading Session - LIVE NOW',
    description: 'Real-time market analysis and trade execution.',
    scheduledAt: new Date().toISOString(), // Now
    duration: 60,
    status: 'live',
    instructor: {
      name: 'John Martinez',
      avatar: '/api/placeholder/64/64?text=JM'
    },
    viewerCount: 247,
    accessLevel: 'free'
  }
];

export const mockInstructors: Instructor[] = [
  {
    id: '1',
    name: 'John Martinez',
    slug: 'john-martinez',
    bio: 'Senior Trading Educator with over 15 years of experience in equity and options markets. Former institutional trader at Goldman Sachs.',
    avatar: '/api/placeholder/128/128?text=John+Martinez',
    role: 'Senior Trading Educator',
    specializations: ['Options Trading', 'Risk Management', 'Market Psychology'],
    socialLinks: {
      twitter: 'https://twitter.com/johnmartinez',
      linkedin: 'https://linkedin.com/in/johnmartinez'
    }
  },
  {
    id: '2',
    name: 'Sarah Chen',
    slug: 'sarah-chen',
    bio: 'Technical Analysis Expert and quantitative trader. PhD in Financial Engineering from Stanford University.',
    avatar: '/api/placeholder/128/128?text=Sarah+Chen',
    role: 'Technical Analysis Expert',
    specializations: ['Technical Analysis', 'Quantitative Strategies', 'Algorithm Development'],
    socialLinks: {
      twitter: 'https://twitter.com/sarahchen',
      youtube: 'https://youtube.com/@sarahchen'
    }
  }
];

export const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    content: 'The Trading Desk transformed my approach to trading. The live sessions are incredibly valuable and the community support is amazing.',
    author: {
      name: 'David Rodriguez',
      role: 'Day Trader',
      avatar: '/api/placeholder/64/64?text=DR'
    },
    rating: 5,
    courseId: '1'
  },
  {
    id: '2',
    content: 'The advanced course gave me the confidence to trade complex strategies profitably. My portfolio has grown 300% this year.',
    author: {
      name: 'Emily Johnson',
      role: 'Options Trader',
      avatar: '/api/placeholder/64/64?text=EJ'
    },
    rating: 5,
    courseId: '2'
  },
  {
    id: '3',
    content: 'Amazing community and expert instructors. The structured approach to learning trading is exactly what I needed.',
    author: {
      name: 'Marcus Thompson',
      role: 'Swing Trader',
      avatar: '/api/placeholder/64/64?text=MT'
    },
    rating: 5
  }
];

// ========================================
// HELPER FUNCTIONS
// ========================================

export const getCourseBySlug = (slug: string): CourseDetail | undefined => {
  return mockCourseDetails[slug];
};

export const getLivestreamsByStatus = (status: LivestreamPreview['status']): LivestreamPreview[] => {
  return mockLivestreams.filter(stream => stream.status === status);
};

export const getInstructorBySlug = (slug: string): Instructor | undefined => {
  return mockInstructors.find(instructor => instructor.slug === slug);
};
