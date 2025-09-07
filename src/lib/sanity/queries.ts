/**
 * GROQ queries for Sanity CMS
 * These queries fetch course and lesson data with proper access control
 */

// Get all published courses with basic info
export const allCourses = `
  *[_type == "course" && isPublished == true] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    level,
    accessTag,
    duration,
    lessonsCount,
    price,
    "thumbnailUrl": thumbnail.asset->url,
    "instructor": instructor->{
      name,
      "avatarUrl": avatar.asset->url,
      title
    },
    publishedAt
  }
`;

// Get course detail with modules and lessons
export const courseDetail = `
  *[_type == "course" && slug.current == $slug && isPublished == true][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    level,
    accessTag,
    duration,
    lessonsCount,
    price,
    "thumbnailUrl": thumbnail.asset->url,
    "instructor": instructor->{
      name,
      "avatarUrl": avatar.asset->url,
      title,
      bio,
      company,
      experience,
      specialties
    },
    "modules": *[_type == "module" && references(^._id) && isPublished == true] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      description,
      order,
      duration,
      lessonsCount,
      "lessons": *[_type == "lesson" && references(^._id) && isPublished == true] | order(order asc) {
        _id,
        title,
        "slug": slug.current,
        description,
        order,
        duration,
        muxPlaybackId,
        "thumbnailUrl": thumbnail.asset->url,
        accessOverride,
        publishedAt
      }
    },
    publishedAt
  }
`;

// Get lesson detail
export const lessonDetail = `
  *[_type == "lesson" && slug.current == $slug && isPublished == true][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    order,
    duration,
    muxPlaybackId,
    muxAssetId,
    "thumbnailUrl": thumbnail.asset->url,
    accessOverride,
    content,
    resources,
    "course": course->{
      _id,
      title,
      "slug": slug.current,
      accessTag,
      "thumbnailUrl": thumbnail.asset->url
    },
    "module": module->{
      _id,
      title,
      "slug": slug.current,
      order
    },
    publishedAt
  }
`;

// Get lessons for a specific course
export const courseLessons = `
  *[_type == "lesson" && references(*[_type == "course" && slug.current == $slug]._id) && isPublished == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    order,
    duration,
    muxPlaybackId,
    "thumbnailUrl": thumbnail.asset->url,
    accessOverride,
    "module": module->{
      _id,
      title,
      "slug": slug.current,
      order
    }
  }
`;

// Get instructor detail
export const instructorDetail = `
  *[_type == "instructor" && slug.current == $slug && isPublished == true][0] {
    _id,
    name,
    "slug": slug.current,
    bio,
    "avatarUrl": avatar.asset->url,
    title,
    company,
    experience,
    specialties,
    socialLinks,
    "courses": *[_type == "course" && references(^._id) && isPublished == true] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      level,
      "thumbnailUrl": thumbnail.asset->url,
      publishedAt
    }
  }
`;

// Get all instructors
export const allInstructors = `
  *[_type == "instructor" && isPublished == true] | order(name asc) {
    _id,
    name,
    "slug": slug.current,
    bio,
    "avatarUrl": avatar.asset->url,
    title,
    company,
    experience,
    specialties
  }
`;

// Search courses
export const searchCourses = `
  *[_type == "course" && isPublished == true && (
    title match $query + "*" ||
    description match $query + "*" ||
    level match $query + "*"
  )] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    level,
    accessTag,
    duration,
    lessonsCount,
    price,
    "thumbnailUrl": thumbnail.asset->url,
    "instructor": instructor->{
      name,
      "avatarUrl": avatar.asset->url,
      title
    }
  }
`;

// Get courses by level
export const coursesByLevel = `
  *[_type == "course" && isPublished == true && level == $level] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    level,
    accessTag,
    duration,
    lessonsCount,
    price,
    "thumbnailUrl": thumbnail.asset->url,
    "instructor": instructor->{
      name,
      "avatarUrl": avatar.asset->url,
      title
    }
  }
`;

// Get related courses (same instructor or similar level)
export const relatedCourses = `
  *[_type == "course" && isPublished == true && _id != $excludeId && (
    instructor._ref == $instructorId ||
    level == $level
  )] | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    description,
    level,
    accessTag,
    duration,
    lessonsCount,
    price,
    "thumbnailUrl": thumbnail.asset->url,
    "instructor": instructor->{
      name,
      "avatarUrl": avatar.asset->url,
      title
    }
  }
`;