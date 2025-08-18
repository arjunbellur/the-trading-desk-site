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
export function convertMockCourseToSanity(mockCourse: Record<string, unknown>): Partial<SanityCourse> {
  return {
    _type: 'course',
    title: String(mockCourse.title || ''),
    slug: { current: generateSlug(String(mockCourse.title || '')) },
    description: String(mockCourse.description || ''),
    excerpt: String(mockCourse.excerpt || ''),
    instructor: {
      name: String(mockCourse.instructor || ''),
      bio: [],
    },
    price: {
      amount: Number(mockCourse.price || 0),
      currency: 'USD',
    },
    difficulty: (String(mockCourse.level || 'beginner')).toLowerCase() as 'beginner' | 'intermediate' | 'advanced',
    duration: {
      hours: Math.floor(Number(mockCourse.duration || 0) / 60),
      minutes: Number(mockCourse.duration || 0) % 60,
    },
    skills: Array.isArray(mockCourse.skills) ? mockCourse.skills as string[] : [],
    isPublished: true,
    isFeatured: Boolean(mockCourse.featured),
  };
}

/**
 * Convert mock livestream data to Sanity format
 * @param mockLivestream - Mock livestream object
 * @returns Sanity-compatible livestream data
 */
export function convertMockLivestreamToSanity(mockLivestream: Record<string, unknown>): Partial<SanityLivestream> {
  return {
    _type: 'livestream',
    title: String(mockLivestream.title || ''),
    slug: { current: generateSlug(String(mockLivestream.title || '')) },
    description: mockLivestream.description ? [{ _type: 'block', children: [{ _type: 'span', text: String(mockLivestream.description) }] }] as SanityRichText[] : [],
    host: {
      name: String(mockLivestream.host || ''),
    },
    scheduledDate: String(mockLivestream.date || new Date().toISOString()),
    duration: {
      hours: Math.floor(Number(mockLivestream.duration || 0) / 60),
      minutes: Number(mockLivestream.duration || 0) % 60,
    },
    timezone: 'UTC',
    topics: Array.isArray(mockLivestream.topics) ? mockLivestream.topics as string[] : [],
    isUpcoming: new Date(String(mockLivestream.date || new Date().toISOString())) > new Date(),
    isLive: Boolean(mockLivestream.isLive),
  };
}

/**
 * Convert mock blog post data to Sanity format
 * @param mockPost - Mock blog post object
 * @returns Sanity-compatible blog post data
 */
export function convertMockBlogPostToSanity(mockPost: Record<string, unknown>): Partial<SanityBlogPost> {
  const contentBlocks: SanityRichText[] = mockPost.content ? [{ _type: 'block', children: [{ _type: 'span', text: String(mockPost.content) }] }] as SanityRichText[] : [];
  
  return {
    _type: 'blogPost',
    title: String(mockPost.title || ''),
    slug: { current: generateSlug(String(mockPost.title || '')) },
    excerpt: String(mockPost.excerpt || ''),
    content: contentBlocks,
    author: {
      name: String(mockPost.author || ''),
    },
    publishedAt: String(mockPost.publishedAt || new Date().toISOString()),
    readTime: Number(mockPost.readTime) || calculateReadingTime(contentBlocks),
    isPublished: true,
    isFeatured: Boolean(mockPost.featured),
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
  SanityRichText,
} from './types';

export type { SanityCourse, SanityLivestream, SanityBlogPost };
