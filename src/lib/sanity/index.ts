/**
 * Sanity CMS Integration for Trading Desk
 * 
 * Main export file for all Sanity-related utilities, types, and hooks.
 * This serves as the single entry point for Sanity functionality.
 */

// Client and utilities
export {
  client,
  previewClient,
  getClient,
  urlFor,
  getImageUrl,
  getResponsiveImageUrls,
  formatSanityDate,
  formatLivestreamDate,
  calculateReadingTime,
  extractPlainText,
  generateSlug,
  sanityFetch,
  SanityError,
  isDevelopment,
  isProduction,
} from './client';

// TypeScript types
export type {
  SanityDocument,
  SanityImage,
  SanityRichText,
  SanityButton,
  SanitySEO,
  SanityCourseCategory,
  SanityCourse,
  SanityCourseModule,
  SanityLesson,
  SanityLivestream,
  SanityBlogPost,
  SanitySiteSettings,
  SanityHeroBlock,
  SanityCTABlock,
  SanityFAQBlock,
  SanityPageBlock,
  SanityCourseListItem,
  SanityLivestreamListItem,
  SanityBlogPostListItem,
} from './types';

// GROQ queries
export {
  getAllCoursesQuery,
  getFeaturedCoursesQuery,
  getCourseBySlugQuery,
  getCoursesByCategoryQuery,
  getAllCourseCategoriesQuery,
  getUpcomingLivestreamsQuery,
  getLiveLivestreamsQuery,
  getRecordedLivestreamsQuery,
  getLivestreamBySlugQuery,
  getAllBlogPostsQuery,
  getFeaturedBlogPostsQuery,
  getBlogPostBySlugQuery,
  getSiteSettingsQuery,
  getPageBySlugQuery,
  searchContentQuery,
  getContentStatsQuery,
  getNavigationDataQuery,
  getDraftCoursesQuery,
  getDraftBlogPostsQuery,
} from './queries';

// React hooks
export {
  useAllCourses,
  useFeaturedCourses,
  useCourse,
  useUpcomingLivestreams,
  useLiveStreams,
  useLivestream,
  useBlogPosts,
  useFeaturedBlogPosts,
  useBlogPost,
  useSiteSettings,
  useSearchContent,
  useContentStats,
  useNavigationData,
} from './hooks';

// Helper functions for migration from mock data

/**
 * Convert mock course data to Sanity format
 * @param mockCourse - Mock course object
 * @returns Sanity-compatible course data
 */
export function convertMockCourseToSanity(mockCourse: any): Partial<SanityCourse> {
  return {
    _type: 'course',
    title: mockCourse.title,
    slug: { current: generateSlug(mockCourse.title) },
    description: mockCourse.description,
    excerpt: mockCourse.excerpt,
    instructor: {
      name: mockCourse.instructor,
      bio: [],
    },
    price: {
      amount: mockCourse.price,
      currency: 'USD',
    },
    difficulty: mockCourse.level?.toLowerCase() || 'beginner',
    duration: {
      hours: Math.floor(mockCourse.duration / 60),
      minutes: mockCourse.duration % 60,
    },
    skills: mockCourse.skills || [],
    isPublished: true,
    isFeatured: mockCourse.featured || false,
  };
}

/**
 * Convert mock livestream data to Sanity format
 * @param mockLivestream - Mock livestream object
 * @returns Sanity-compatible livestream data
 */
export function convertMockLivestreamToSanity(mockLivestream: any): Partial<SanityLivestream> {
  return {
    _type: 'livestream',
    title: mockLivestream.title,
    slug: { current: generateSlug(mockLivestream.title) },
    description: mockLivestream.description ? [{ _type: 'block', children: [{ _type: 'span', text: mockLivestream.description }] }] : [],
    host: {
      name: mockLivestream.host,
    },
    scheduledDate: mockLivestream.date,
    duration: {
      hours: Math.floor(mockLivestream.duration / 60),
      minutes: mockLivestream.duration % 60,
    },
    timezone: 'UTC',
    topics: mockLivestream.topics || [],
    isUpcoming: new Date(mockLivestream.date) > new Date(),
    isLive: mockLivestream.isLive || false,
  };
}

/**
 * Convert mock blog post data to Sanity format
 * @param mockPost - Mock blog post object
 * @returns Sanity-compatible blog post data
 */
export function convertMockBlogPostToSanity(mockPost: any): Partial<SanityBlogPost> {
  return {
    _type: 'blogPost',
    title: mockPost.title,
    slug: { current: generateSlug(mockPost.title) },
    excerpt: mockPost.excerpt,
    content: mockPost.content ? [{ _type: 'block', children: [{ _type: 'span', text: mockPost.content }] }] : [],
    author: {
      name: mockPost.author,
    },
    publishedAt: mockPost.publishedAt || new Date().toISOString(),
    readTime: mockPost.readTime || calculateReadingTime(mockPost.content ? [{ _type: 'block', children: [{ _type: 'span', text: mockPost.content }] }] : []),
    isPublished: true,
    isFeatured: mockPost.featured || false,
  };
}

// Development utilities

/**
 * Check if Sanity is properly configured
 * @returns Boolean indicating if Sanity is ready
 */
export function isSanityConfigured(): boolean {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  
  return !!(projectId && projectId !== 'your-project-id' && dataset);
}

/**
 * Get Sanity configuration status
 * @returns Object with configuration details
 */
export function getSanityConfigStatus() {
  return {
    isConfigured: isSanityConfigured(),
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    hasReadToken: !!process.env.SANITY_API_READ_TOKEN,
    environment: process.env.NODE_ENV,
  };
}

// Re-export types for convenience
import type {
  SanityCourse,
  SanityLivestream,
  SanityBlogPost,
} from './types';

export type { SanityCourse, SanityLivestream, SanityBlogPost };
