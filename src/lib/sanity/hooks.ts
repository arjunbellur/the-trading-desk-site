/**
 * React Hooks for Sanity Content
 * 
 * Custom hooks for fetching and managing Sanity content with proper
 * loading states, error handling, and TypeScript support.
 */

import { useState, useEffect } from 'react';
import { sanityFetch, SanityError } from './client';
import type {
  SanityCourse,
  SanityCourseListItem,
  SanityLivestream,
  SanityLivestreamListItem,
  SanityBlogPost,
  SanityBlogPostListItem,
  SanitySiteSettings,
} from './types';

// Hook state interface
interface SanityHookState<T> {
  data: T | null;
  loading: boolean;
  error: SanityError | null;
}

/**
 * Base hook for Sanity queries
 */
function useSanityQuery<T>(
  query: string,
  params: Record<string, any> = {},
  dependencies: any[] = []
): SanityHookState<T> {
  const [state, setState] = useState<SanityHookState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));
        const data = await sanityFetch<T>(query, params);
        
        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            data: null,
            loading: false,
            error: error instanceof SanityError ? error : new SanityError('Unknown error'),
          });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return state;
}

/**
 * Hook for fetching all courses
 */
export function useAllCourses() {
  const query = `
    *[_type == "course" && isPublished == true] | order(order asc, _createdAt desc) {
      _id,
      title,
      slug,
      excerpt,
      thumbnail,
      instructor,
      price,
      difficulty,
      duration,
      rating,
      category->,
      skills,
      isFeatured,
      enrollmentCount
    }
  `;

  return useSanityQuery<SanityCourseListItem[]>(query);
}

/**
 * Hook for fetching featured courses
 */
export function useFeaturedCourses(limit = 6) {
  const query = `
    *[_type == "course" && isPublished == true && isFeatured == true] | order(order asc, _createdAt desc) [0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      thumbnail,
      instructor,
      price,
      difficulty,
      duration,
      rating,
      category->
    }
  `;

  return useSanityQuery<SanityCourseListItem[]>(query, {}, [limit]);
}

/**
 * Hook for fetching a single course by slug
 */
export function useCourse(slug: string) {
  const query = `
    *[_type == "course" && slug.current == $slug && isPublished == true][0] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      description,
      excerpt,
      thumbnail,
      gallery,
      videoPreview,
      instructor,
      price,
      difficulty,
      duration,
      rating,
      category->,
      modules,
      skills,
      requirements,
      enrollmentCount,
      seo
    }
  `;

  return useSanityQuery<SanityCourse>(query, { slug }, [slug]);
}

/**
 * Hook for fetching upcoming livestreams
 */
export function useUpcomingLivestreams() {
  const query = `
    *[_type == "livestream" && scheduledDate > now()] | order(scheduledDate asc) {
      _id,
      title,
      slug,
      excerpt,
      thumbnail,
      host,
      scheduledDate,
      duration,
      timezone,
      topics,
      isLive,
      isUpcoming,
      currentAttendees,
      maxAttendees,
      registrationRequired,
      price,
      category->
    }
  `;

  return useSanityQuery<SanityLivestreamListItem[]>(query);
}

/**
 * Hook for fetching live streams
 */
export function useLiveStreams() {
  const query = `
    *[_type == "livestream" && isLive == true] | order(scheduledDate asc) {
      _id,
      title,
      slug,
      excerpt,
      thumbnail,
      host,
      scheduledDate,
      duration,
      timezone,
      streamUrl,
      chatUrl,
      currentAttendees,
      maxAttendees
    }
  `;

  return useSanityQuery<SanityLivestreamListItem[]>(query);
}

/**
 * Hook for fetching a single livestream by slug
 */
export function useLivestream(slug: string) {
  const query = `
    *[_type == "livestream" && slug.current == $slug][0] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      description,
      excerpt,
      thumbnail,
      host,
      scheduledDate,
      duration,
      timezone,
      streamUrl,
      chatUrl,
      recordingUrl,
      topics,
      isLive,
      isUpcoming,
      isRecorded,
      currentAttendees,
      maxAttendees,
      registrationRequired,
      price,
      category->,
      seo
    }
  `;

  return useSanityQuery<SanityLivestream>(query, { slug }, [slug]);
}

/**
 * Hook for fetching blog posts
 */
export function useBlogPosts() {
  const query = `
    *[_type == "blogPost" && isPublished == true] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      author,
      publishedAt,
      readTime,
      category->,
      tags,
      isFeatured
    }
  `;

  return useSanityQuery<SanityBlogPostListItem[]>(query);
}

/**
 * Hook for fetching featured blog posts
 */
export function useFeaturedBlogPosts(limit = 3) {
  const query = `
    *[_type == "blogPost" && isPublished == true && isFeatured == true] | order(publishedAt desc) [0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      author,
      publishedAt,
      readTime,
      category->
    }
  `;

  return useSanityQuery<SanityBlogPostListItem[]>(query, {}, [limit]);
}

/**
 * Hook for fetching a single blog post by slug
 */
export function useBlogPost(slug: string) {
  const query = `
    *[_type == "blogPost" && slug.current == $slug && isPublished == true][0] {
      _id,
      _createdAt,
      _updatedAt,
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      author,
      publishedAt,
      readTime,
      category->,
      tags,
      seo
    }
  `;

  return useSanityQuery<SanityBlogPost>(query, { slug }, [slug]);
}

/**
 * Hook for fetching site settings
 */
export function useSiteSettings() {
  const query = `
    *[_type == "siteSettings"][0] {
      _id,
      siteName,
      siteDescription,
      logo,
      favicon,
      socialMedia,
      contactInfo,
      seo
    }
  `;

  return useSanityQuery<SanitySiteSettings>(query);
}

/**
 * Hook for searching content
 */
export function useSearchContent(searchTerm: string) {
  const query = `
    {
      "courses": *[_type == "course" && isPublished == true && (title match $searchTerm || description match $searchTerm)] | order(_score desc) [0...5] {
        _id,
        _type,
        title,
        slug,
        excerpt,
        thumbnail
      },
      "livestreams": *[_type == "livestream" && (title match $searchTerm || topics match $searchTerm)] | order(_score desc) [0...5] {
        _id,
        _type,
        title,
        slug,
        excerpt,
        thumbnail,
        scheduledDate
      },
      "blogPosts": *[_type == "blogPost" && isPublished == true && (title match $searchTerm || excerpt match $searchTerm)] | order(_score desc) [0...5] {
        _id,
        _type,
        title,
        slug,
        excerpt,
        featuredImage,
        publishedAt
      }
    }
  `;

  return useSanityQuery<{
    courses: SanityCourseListItem[];
    livestreams: SanityLivestreamListItem[];
    blogPosts: SanityBlogPostListItem[];
  }>(query, { searchTerm: `*${searchTerm}*` }, [searchTerm]);
}

/**
 * Hook for content statistics
 */
export function useContentStats() {
  const query = `
    {
      "totalCourses": count(*[_type == "course" && isPublished == true]),
      "totalLivestreams": count(*[_type == "livestream"]),
      "totalBlogPosts": count(*[_type == "blogPost" && isPublished == true]),
      "upcomingLivestreams": count(*[_type == "livestream" && scheduledDate > now()]),
      "liveLivestreams": count(*[_type == "livestream" && isLive == true])
    }
  `;

  return useSanityQuery<{
    totalCourses: number;
    totalLivestreams: number;
    totalBlogPosts: number;
    upcomingLivestreams: number;
    liveLivestreams: number;
  }>(query);
}

/**
 * Hook for navigation data
 */
export function useNavigationData() {
  const query = `
    {
      "courseCategories": *[_type == "courseCategory"] | order(order asc, title asc) {
        _id,
        title,
        slug,
        color
      },
      "featuredCourses": *[_type == "course" && isPublished == true && isFeatured == true] | order(order asc) [0...5] {
        _id,
        title,
        slug,
        thumbnail
      }
    }
  `;

  return useSanityQuery<{
    courseCategories: Array<{
      _id: string;
      title: string;
      slug: { current: string };
      color?: string;
    }>;
    featuredCourses: SanityCourseListItem[];
  }>(query);
}
