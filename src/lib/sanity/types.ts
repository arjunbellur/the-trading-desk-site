/**
 * Sanity CMS TypeScript Types for Trading Desk
 * 
 * This file contains all TypeScript interfaces for Sanity content types.
 * These will be auto-generated once Sanity studio is set up.
 * For now, these serve as the foundation for content structure.
 */

// Base Sanity document interface
export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

// Image with alt text and metadata
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
  caption?: string;
}

// Rich text (portable text)
export interface SanityRichText {
  _type: 'block';
  children: Array<{
    _type: 'span';
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'blockquote';
  listItem?: 'bullet' | 'number';
  level?: number;
}

// Button component
export interface SanityButton {
  _type: 'button';
  text: string;
  href?: string;
  isExternal?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

// SEO fields
export interface SanitySEO {
  _type: 'seo';
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: SanityImage;
  noIndex?: boolean;
}

// Course Category
export interface SanityCourseCategory extends SanityDocument {
  _type: 'courseCategory';
  title: string;
  slug: {
    current: string;
  };
  description?: string;
  color?: string;
  order?: number;
}

// Course Document
export interface SanityCourse extends SanityDocument {
  _type: 'course';
  title: string;
  slug: {
    current: string;
  };
  description: string;
  excerpt?: string;
  category: {
    _ref: string;
    _type: 'reference';
  };
  instructor: {
    name: string;
    bio?: SanityRichText[];
    avatar?: SanityImage;
  };
  price: {
    amount: number;
    currency: string;
    discountAmount?: number;
  };
  duration: {
    hours: number;
    minutes?: number;
  };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: SanityImage;
  gallery?: SanityImage[];
  videoPreview?: {
    url: string;
    duration?: number;
  };
  modules: SanityCourseModule[];
  skills: string[];
  requirements?: string[];
  isPublished: boolean;
  isFeatured?: boolean;
  enrollmentCount?: number;
  rating?: {
    average: number;
    count: number;
  };
  seo?: SanitySEO;
  order?: number;
}

// Course Module
export interface SanityCourseModule {
  _type: 'courseModule';
  _key: string;
  title: string;
  description?: string;
  lessons: SanityLesson[];
  duration?: {
    hours: number;
    minutes?: number;
  };
  order: number;
}

// Lesson
export interface SanityLesson {
  _type: 'lesson';
  _key: string;
  title: string;
  description?: string;
  video?: {
    url: string;
    duration?: number;
    thumbnail?: SanityImage;
  };
  content?: SanityRichText[];
  resources?: {
    title: string;
    file: {
      _type: 'file';
      asset: {
        _ref: string;
        _type: 'reference';
      };
    };
  }[];
  isPreview?: boolean;
  order: number;
}

// Livestream
export interface SanityLivestream extends SanityDocument {
  _type: 'livestream';
  title: string;
  slug: {
    current: string;
  };
  description: SanityRichText[];
  excerpt?: string;
  host: {
    name: string;
    bio?: string;
    avatar?: SanityImage;
  };
  scheduledDate: string;
  duration: {
    hours: number;
    minutes?: number;
  };
  timezone: string;
  streamUrl?: string;
  chatUrl?: string;
  thumbnail: SanityImage;
  category?: {
    _ref: string;
    _type: 'reference';
  };
  topics: string[];
  isLive?: boolean;
  isUpcoming?: boolean;
  isRecorded?: boolean;
  recordingUrl?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  registrationRequired?: boolean;
  price?: {
    amount: number;
    currency: string;
  };
  seo?: SanitySEO;
}

// Blog Post
export interface SanityBlogPost extends SanityDocument {
  _type: 'blogPost';
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  content: SanityRichText[];
  author: {
    name: string;
    bio?: string;
    avatar?: SanityImage;
  };
  publishedAt: string;
  featuredImage: SanityImage;
  category: {
    _ref: string;
    _type: 'reference';
  };
  tags?: string[];
  readTime?: number;
  isPublished: boolean;
  isFeatured?: boolean;
  seo?: SanitySEO;
}

// Site Settings
export interface SanitySiteSettings extends SanityDocument {
  _type: 'siteSettings';
  siteName: string;
  siteDescription: string;
  logo: SanityImage;
  favicon?: SanityImage;
  socialMedia?: {
    twitter?: string;
    discord?: string;
    youtube?: string;
    linkedin?: string;
  };
  contactInfo?: {
    email: string;
    phone?: string;
    address?: string;
  };
  seo?: SanitySEO;
}

// Hero Section Block
export interface SanityHeroBlock {
  _type: 'hero';
  _key: string;
  eyebrow?: string;
  title: string;
  isHeadingOne?: boolean;
  description?: SanityRichText[];
  buttons?: SanityButton[];
  backgroundImage?: SanityImage;
  backgroundVideo?: {
    url: string;
  };
}

// CTA Block
export interface SanityCTABlock {
  _type: 'cta';
  _key: string;
  title: string;
  description?: SanityRichText[];
  buttons?: SanityButton[];
  backgroundImage?: SanityImage;
  variant?: 'default' | 'centered' | 'split';
}

// FAQ Block
export interface SanityFAQBlock {
  _type: 'faqAccordion';
  _key: string;
  title?: string;
  faqs: Array<{
    _key: string;
    question: string;
    answer: SanityRichText[];
  }>;
}

// Page Builder Blocks Union
export type SanityPageBlock = 
  | SanityHeroBlock 
  | SanityCTABlock 
  | SanityFAQBlock;

// Query Result Types (for GROQ responses)
export interface SanityCourseListItem {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  thumbnail: SanityImage;
  instructor: { name: string };
  price: { amount: number; currency: string };
  difficulty: string;
  duration: { hours: number; minutes?: number };
  rating?: { average: number; count: number };
  category: { title: string; color?: string };
}

export interface SanityLivestreamListItem {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  thumbnail: SanityImage;
  host: { name: string };
  scheduledDate: string;
  duration: { hours: number; minutes?: number };
  isLive?: boolean;
  isUpcoming?: boolean;
  currentAttendees?: number;
  maxAttendees?: number;
}

export interface SanityBlogPostListItem {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  featuredImage: SanityImage;
  author: { name: string };
  publishedAt: string;
  readTime?: number;
  category: { title: string; color?: string };
}
