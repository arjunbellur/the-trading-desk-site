/**
 * SANITY GROQ QUERIES
 * 
 * ⚠️  TODO: AWAITING CLIENT-APPROVED SCHEMA
 * 
 * All queries below are commented out and serve as placeholders.
 * Once the client approves the schema design (see docs/client-discovery-checklist.md),
 * we will implement the actual schemas and uncomment/update these queries.
 * 
 * Current status: Using mock data in src/mock/content.ts
 * Next step: Schema approval → Implementation → Replace mock data
 */

import { sanityClient } from './client';

// ========================================
// COURSES QUERIES (TODO: Implement after schema approval)
// ========================================

/*
export const getAllCourses = async () => {
  return sanityClient.fetch(`
    *[_type == "course"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      shortDescription,
      thumbnailImage,
      price,
      difficulty,
      duration,
      lessonCount,
      instructor->{
        name,
        avatar
      }
    }
  `);
};

export const getCourseBySlug = async (slug: string) => {
  return sanityClient.fetch(`
    *[_type == "course" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      thumbnailImage,
      price,
      difficulty,
      duration,
      prerequisites,
      whatYouWillLearn[],
      instructor->{
        name,
        bio,
        avatar,
        socialLinks
      },
      modules[]->{
        _id,
        title,
        description,
        lessons[]->{
          _id,
          title,
          runtime,
          isPreview,
          videoId
        }
      }
    }
  `, { slug });
};
*/

// ========================================
// LIVESTREAM QUERIES (TODO: Implement after schema approval)
// ========================================

/*
export const getUpcomingLivestreams = async () => {
  return sanityClient.fetch(`
    *[_type == "livestream" && scheduledAt > now()] | order(scheduledAt asc) {
      _id,
      title,
      description,
      scheduledAt,
      duration,
      instructor->{
        name,
        avatar
      },
      status
    }
  `);
};

export const getLivestreamBySlug = async (slug: string) => {
  return sanityClient.fetch(`
    *[_type == "livestream" && slug.current == $slug][0] {
      _id,
      title,
      description,
      scheduledAt,
      duration,
      liveStreamKey,
      playbackId,
      replayPolicy,
      instructor->{
        name,
        bio,
        avatar
      }
    }
  `, { slug });
};
*/

// ========================================
// INSTRUCTOR QUERIES (TODO: Implement after schema approval)
// ========================================

/*
export const getAllInstructors = async () => {
  return sanityClient.fetch(`
    *[_type == "instructor"] | order(name asc) {
      _id,
      name,
      bio,
      avatar,
      role,
      socialLinks,
      coursesCount
    }
  `);
};
*/

// ========================================
// BLOG QUERIES (TODO: Implement after schema approval)
// ========================================

/*
export const getBlogPosts = async (limit = 10) => {
  return sanityClient.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) [0...$limit] {
      _id,
      title,
      slug,
      excerpt,
      featuredImage,
      publishedAt,
      author->{
        name,
        avatar
      }
    }
  `, { limit });
};
*/

// ========================================
// TEMPORARY EXPORT (for build compatibility)
// ========================================

// Export empty object to prevent import errors until queries are implemented
export const queries = {
  // TODO: Add actual query exports after schema implementation
};
