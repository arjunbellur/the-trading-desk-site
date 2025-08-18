/**
 * Sanity Client Configuration for Trading Desk
 * 
 * This file sets up the Sanity client for fetching content.
 * Environment variables will be configured when Sanity studio is set up.
 */

import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImage } from './types';

// Client configuration
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
  stega: {
    enabled: process.env.NODE_ENV === 'development',
    studioUrl: '/studio',
  },
});

// Image URL builder
const builder = imageUrlBuilder(client);

/**
 * Generate optimized image URLs from Sanity images
 * @param source - Sanity image object
 * @returns Image URL builder
 */
export function urlFor(source: SanityImage) {
  return builder.image(source);
}

/**
 * Get optimized image URL with default settings
 * @param image - Sanity image object
 * @param width - Desired width
 * @param height - Desired height
 * @returns Optimized image URL
 */
export function getImageUrl(
  image: SanityImage,
  width?: number,
  height?: number
): string {
  let url = urlFor(image).auto('format').quality(85);
  
  if (width) url = url.width(width);
  if (height) url = url.height(height);
  
  return url.url();
}

/**
 * Get responsive image URLs for different breakpoints
 * @param image - Sanity image object
 * @returns Object with URLs for different sizes
 */
export function getResponsiveImageUrls(image: SanityImage) {
  return {
    mobile: getImageUrl(image, 640),
    tablet: getImageUrl(image, 1024),
    desktop: getImageUrl(image, 1920),
    thumbnail: getImageUrl(image, 400, 300),
    hero: getImageUrl(image, 1920, 1080),
  };
}

/**
 * Format Sanity date to readable string
 * @param dateString - ISO date string from Sanity
 * @returns Formatted date string
 */
export function formatSanityDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format Sanity datetime for livestreams
 * @param dateString - ISO datetime string from Sanity
 * @param timezone - Timezone string
 * @returns Formatted datetime string
 */
export function formatLivestreamDate(
  dateString: string,
  timezone?: string
): string {
  const date = new Date(dateString);
  
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: timezone || 'UTC',
    timeZoneName: 'short',
  });
}

/**
 * Calculate reading time from rich text content
 * @param content - Sanity rich text blocks
 * @returns Estimated reading time in minutes
 */
export function calculateReadingTime(content: SanityRichText[]): number {
  const wordsPerMinute = 200;
  const textContent = content
    .filter(block => block._type === 'block')
    .map(block => 
      block.children
        ?.map((child) => child.text)
        .join(' ') || ''
    )
    .join(' ');
  
  const wordCount = textContent.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Extract plain text from rich text content
 * @param content - Sanity rich text blocks
 * @returns Plain text string
 */
export function extractPlainText(content: SanityRichText[]): string {
  return content
    .filter(block => block._type === 'block')
    .map(block => 
      block.children
        ?.map((child) => child.text)
        .join(' ') || ''
    )
    .join(' ')
    .trim();
}

/**
 * Generate SEO-friendly slug from title
 * @param title - Content title
 * @returns URL-safe slug
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Error handling utility
export class SanityError extends Error {
  constructor(message: string, public query?: string) {
    super(`Sanity Error: ${message}`);
    this.name = 'SanityError';
  }
}

/**
 * Wrapper for Sanity queries with error handling
 * @param query - GROQ query string
 * @param params - Query parameters
 * @returns Promise with query result
 */
export async function sanityFetch<T = unknown>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  try {
    const result = await client.fetch<T>(query, params);
    return result;
  } catch (error) {
    console.error('Sanity fetch error:', error);
    throw new SanityError(
      error instanceof Error ? error.message : 'Unknown error',
      query
    );
  }
}

// Development utilities
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

/**
 * Preview mode utilities (for draft content)
 */
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  perspective: 'previewDrafts',
  token: process.env.SANITY_API_READ_TOKEN,
});

/**
 * Get client based on preview mode
 * @param preview - Whether to use preview mode
 * @returns Appropriate Sanity client
 */
export function getClient(preview = false) {
  return preview ? previewClient : client;
}