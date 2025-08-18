/**
 * GROQ Query Templates for Trading Desk
 * 
 * This file contains all GROQ queries for fetching content from Sanity.
 * Following the guidelines with verb-based naming and Query suffix.
 */

// Common field fragments
const _image = `{
  _type,
  asset,
  alt,
  caption
}`;

const _richText = `{
  _type,
  children,
  markDefs,
  style,
  listItem,
  level
}`;

const _button = `{
  _type,
  text,
  href,
  isExternal,
  variant,
  size
}`;

const _seo = `{
  _type,
  title,
  description,
  keywords,
  ogImage ${_image},
  noIndex
}`;

const _courseCategory = `{
  _id,
  title,
  slug,
  description,
  color,
  order
}`;

const _instructor = `{
  name,
  bio[] ${_richText},
  avatar ${_image}
}`;

const _host = `{
  name,
  bio,
  avatar ${_image}
}`;

const _author = `{
  name,
  bio,
  avatar ${_image}
}`;

const _price = `{
  amount,
  currency,
  discountAmount
}`;

const _duration = `{
  hours,
  minutes
}`;

const _rating = `{
  average,
  count
}`;

// Course Queries

/**
 * Get all published courses with essential information
 */
export const getAllCoursesQuery = `
  *[_type == "course" && isPublished == true] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    thumbnail ${_image},
    instructor ${_instructor},
    price ${_price},
    difficulty,
    duration ${_duration},
    rating ${_rating},
    category-> ${_courseCategory},
    skills,
    isFeatured,
    enrollmentCount
  }
`;

/**
 * Get featured courses for homepage
 */
export const getFeaturedCoursesQuery = `
  *[_type == "course" && isPublished == true && isFeatured == true] | order(order asc, _createdAt desc) [0...6] {
    _id,
    title,
    slug,
    excerpt,
    thumbnail ${_image},
    instructor ${_instructor},
    price ${_price},
    difficulty,
    duration ${_duration},
    rating ${_rating},
    category-> ${_courseCategory}
  }
`;

/**
 * Get single course by slug with full details
 */
export const getCourseBySlugQuery = `
  *[_type == "course" && slug.current == $slug && isPublished == true][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description,
    excerpt,
    thumbnail ${_image},
    gallery[] ${_image},
    videoPreview,
    instructor ${_instructor},
    price ${_price},
    difficulty,
    duration ${_duration},
    rating ${_rating},
    category-> ${_courseCategory},
    modules[] {
      _type,
      _key,
      title,
      description,
      duration ${_duration},
      order,
      lessons[] {
        _type,
        _key,
        title,
        description,
        video,
        content[] ${_richText},
        resources[] {
          title,
          file
        },
        isPreview,
        order
      }
    },
    skills,
    requirements,
    enrollmentCount,
    seo ${_seo}
  }
`;

/**
 * Get courses by category
 */
export const getCoursesByCategoryQuery = `
  *[_type == "course" && isPublished == true && category._ref == $categoryId] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    excerpt,
    thumbnail ${_image},
    instructor ${_instructor},
    price ${_price},
    difficulty,
    duration ${_duration},
    rating ${_rating},
    skills
  }
`;

/**
 * Get all course categories
 */
export const getAllCourseCategoriesQuery = `
  *[_type == "courseCategory"] | order(order asc, title asc) ${_courseCategory}
`;

// Livestream Queries

/**
 * Get all upcoming livestreams
 */
export const getUpcomingLivestreamsQuery = `
  *[_type == "livestream" && scheduledDate > now()] | order(scheduledDate asc) {
    _id,
    title,
    slug,
    excerpt,
    thumbnail ${_image},
    host ${_host},
    scheduledDate,
    duration ${_duration},
    timezone,
    topics,
    isLive,
    isUpcoming,
    currentAttendees,
    maxAttendees,
    registrationRequired,
    price ${_price},
    category-> ${_courseCategory}
  }
`;

/**
 * Get currently live streams
 */
export const getLiveLivestreamsQuery = `
  *[_type == "livestream" && isLive == true] | order(scheduledDate asc) {
    _id,
    title,
    slug,
    excerpt,
    thumbnail ${_image},
    host ${_host},
    scheduledDate,
    duration ${_duration},
    timezone,
    streamUrl,
    chatUrl,
    currentAttendees,
    maxAttendees
  }
`;

/**
 * Get recorded livestreams
 */
export const getRecordedLivestreamsQuery = `
  *[_type == "livestream" && isRecorded == true] | order(scheduledDate desc) {
    _id,
    title,
    slug,
    excerpt,
    thumbnail ${_image},
    host ${_host},
    scheduledDate,
    duration ${_duration},
    recordingUrl,
    topics,
    category-> ${_courseCategory}
  }
`;

/**
 * Get single livestream by slug
 */
export const getLivestreamBySlugQuery = `
  *[_type == "livestream" && slug.current == $slug][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    description[] ${_richText},
    excerpt,
    thumbnail ${_image},
    host ${_host},
    scheduledDate,
    duration ${_duration},
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
    price ${_price},
    category-> ${_courseCategory},
    seo ${_seo}
  }
`;

// Blog Queries

/**
 * Get all published blog posts
 */
export const getAllBlogPostsQuery = `
  *[_type == "blogPost" && isPublished == true] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage ${_image},
    author ${_author},
    publishedAt,
    readTime,
    category-> {
      _id,
      title,
      color
    },
    tags,
    isFeatured
  }
`;

/**
 * Get featured blog posts
 */
export const getFeaturedBlogPostsQuery = `
  *[_type == "blogPost" && isPublished == true && isFeatured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage ${_image},
    author ${_author},
    publishedAt,
    readTime,
    category-> {
      _id,
      title,
      color
    }
  }
`;

/**
 * Get single blog post by slug
 */
export const getBlogPostBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug && isPublished == true][0] {
    _id,
    _createdAt,
    _updatedAt,
    title,
    slug,
    excerpt,
    content[] ${_richText},
    featuredImage ${_image},
    author ${_author},
    publishedAt,
    readTime,
    category-> {
      _id,
      title,
      color
    },
    tags,
    seo ${_seo}
  }
`;

// Site Settings Query

/**
 * Get site settings
 */
export const getSiteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    _id,
    siteName,
    siteDescription,
    logo ${_image},
    favicon ${_image},
    socialMedia,
    contactInfo,
    seo ${_seo}
  }
`;

// Page Builder Queries

/**
 * Get page content by slug (for pages with page builder)
 */
export const getPageBySlugQuery = `
  *[_type == "page" && slug.current == $slug && isPublished == true][0] {
    _id,
    title,
    slug,
    content[] {
      _type,
      _key,
      _type == "hero" => {
        eyebrow,
        title,
        isHeadingOne,
        description[] ${_richText},
        buttons[] ${_button},
        backgroundImage ${_image},
        backgroundVideo
      },
      _type == "cta" => {
        title,
        description[] ${_richText},
        buttons[] ${_button},
        backgroundImage ${_image},
        variant
      },
      _type == "faqAccordion" => {
        title,
        faqs[] {
          _key,
          question,
          answer[] ${_richText}
        }
      }
    },
    seo ${_seo}
  }
`;

// Search Queries

/**
 * Search across courses, livestreams, and blog posts
 */
export const searchContentQuery = `
  {
    "courses": *[_type == "course" && isPublished == true && (title match $searchTerm || description match $searchTerm)] | order(_score desc) [0...5] {
      _id,
      _type,
      title,
      slug,
      excerpt,
      thumbnail ${_image}
    },
    "livestreams": *[_type == "livestream" && (title match $searchTerm || topics match $searchTerm)] | order(_score desc) [0...5] {
      _id,
      _type,
      title,
      slug,
      excerpt,
      thumbnail ${_image},
      scheduledDate
    },
    "blogPosts": *[_type == "blogPost" && isPublished == true && (title match $searchTerm || excerpt match $searchTerm)] | order(_score desc) [0...5] {
      _id,
      _type,
      title,
      slug,
      excerpt,
      featuredImage ${_image},
      publishedAt
    }
  }
`;

// Analytics/Stats Queries

/**
 * Get content statistics for dashboard
 */
export const getContentStatsQuery = `
  {
    "totalCourses": count(*[_type == "course" && isPublished == true]),
    "totalLivestreams": count(*[_type == "livestream"]),
    "totalBlogPosts": count(*[_type == "blogPost" && isPublished == true]),
    "upcomingLivestreams": count(*[_type == "livestream" && scheduledDate > now()]),
    "liveLivestreams": count(*[_type == "livestream" && isLive == true])
  }
`;

// Navigation Queries

/**
 * Get navigation data (courses and categories for menus)
 */
export const getNavigationDataQuery = `
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
      thumbnail ${_image}
    }
  }
`;

// Draft/Preview Queries (for authenticated users)

/**
 * Get draft courses (preview mode)
 */
export const getDraftCoursesQuery = `
  *[_type == "course" && isPublished != true] | order(_updatedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    thumbnail ${_image},
    instructor ${_instructor},
    difficulty,
    _updatedAt
  }
`;

/**
 * Get draft blog posts (preview mode)
 */
export const getDraftBlogPostsQuery = `
  *[_type == "blogPost" && isPublished != true] | order(_updatedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage ${_image},
    author ${_author},
    _updatedAt
  }
`;