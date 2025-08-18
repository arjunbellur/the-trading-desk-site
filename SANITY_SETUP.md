# Sanity CMS Setup Guide for Trading Desk

This guide will help you set up Sanity CMS for the Trading Desk project. The site has been prepared with all necessary TypeScript types, queries, and utilities.

## Prerequisites

✅ **Already Done:**
- Sanity client dependencies installed
- TypeScript types defined
- GROQ queries prepared
- React hooks created
- Environment template ready

## Quick Setup Checklist

### 1. Create Sanity Project
1. Go to [sanity.io](https://sanity.io) and create a new project
2. Choose a project name (e.g., "trading-desk-cms")
3. Select a dataset name (use "production")
4. Note your Project ID

### 2. Configure Environment Variables
1. Copy `sanity.env.template` to `.env.local`
2. Replace placeholders with your actual Sanity configuration:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_READ_TOKEN=your-read-token
   SANITY_WEBHOOK_SECRET=your-webhook-secret
   ```

### 3. Install Sanity Studio
```bash
# Install Sanity CLI globally
npm install -g @sanity/cli

# Initialize Sanity studio in the project
npx @sanity/cli init --template clean --dataset production

# OR create studio folder manually
mkdir studio
cd studio
npx @sanity/cli init
```

### 4. Schema Implementation

Follow the **Sanity Development Guidelines** provided to implement these schemas:

#### Documents (studio/schemaTypes/documents/)
- `course.ts` - Course content with modules and lessons
- `livestream.ts` - Live streaming sessions
- `blog-post.ts` - Blog articles
- `course-category.ts` - Course categorization
- `site-settings.ts` - Global site configuration

#### Blocks (studio/schemaTypes/blocks/)
- `hero.ts` - Hero section component
- `cta.ts` - Call-to-action sections
- `faq-accordion.ts` - FAQ sections

#### Definitions (studio/schemaTypes/definitions/)
- `button.ts` - Reusable button component
- `rich-text.ts` - Rich text editor configuration
- `seo-fields.ts` - SEO metadata fields

### 5. Key Features Ready to Use

#### Course Management
```typescript
import { useAllCourses, useFeaturedCourses } from '@/lib/sanity';

// Get all courses
const { data: courses, loading, error } = useAllCourses();

// Get featured courses
const { data: featured } = useFeaturedCourses(6);
```

#### Livestream Management
```typescript
import { useUpcomingLivestreams, useLiveStreams } from '@/lib/sanity';

// Get upcoming streams
const { data: upcoming } = useUpcomingLivestreams();

// Get currently live streams
const { data: live } = useLiveStreams();
```

#### Blog Management
```typescript
import { useBlogPosts, useFeaturedBlogPosts } from '@/lib/sanity';

// Get all blog posts
const { data: posts } = useBlogPosts();

// Get featured posts
const { data: featured } = useFeaturedBlogPosts(3);
```

### 6. Content Migration

The codebase includes utilities to help migrate from mock data:

```typescript
import { 
  convertMockCourseToSanity,
  convertMockLivestreamToSanity,
  convertMockBlogPostToSanity 
} from '@/lib/sanity';

// Convert existing mock data to Sanity format
const sanityContent = convertMockCourseToSanity(mockCourse);
```

### 7. Image Handling

Sanity images are handled with built-in optimization:

```typescript
import { getImageUrl, getResponsiveImageUrls } from '@/lib/sanity';

// Get optimized image URL
const imageUrl = getImageUrl(sanityImage, 800, 600);

// Get responsive images
const responsive = getResponsiveImageUrls(sanityImage);
```

## File Structure

```
src/lib/sanity/
├── index.ts          # Main exports
├── types.ts          # TypeScript interfaces
├── client.ts         # Sanity client configuration
├── queries.ts        # GROQ query templates
└── hooks.ts          # React hooks for data fetching

studio/               # Sanity Studio (to be created)
├── sanity.config.ts
├── schemaTypes/
│   ├── index.ts
│   ├── documents/
│   ├── blocks/
│   └── definitions/
└── utils/
```

## Development Workflow

### Content Creation
1. Use Sanity Studio for content management
2. Content automatically syncs with the frontend
3. Preview mode available for draft content

### Type Safety
```typescript
// All content is fully typed
import type { SanityCourse, SanityLivestream } from '@/lib/sanity';

const course: SanityCourse = await sanityFetch(getCourseBySlugQuery, { slug });
```

### Error Handling
```typescript
import { SanityError } from '@/lib/sanity';

try {
  const data = await sanityFetch(query);
} catch (error) {
  if (error instanceof SanityError) {
    console.error('Sanity Error:', error.message);
  }
}
```

## Testing Sanity Configuration

Check if Sanity is properly configured:

```typescript
import { isSanityConfigured, getSanityConfigStatus } from '@/lib/sanity';

// Simple check
if (isSanityConfigured()) {
  // Sanity is ready
}

// Detailed status
const status = getSanityConfigStatus();
console.log(status);
```

## Next Steps

1. **Set up Sanity studio** following the development guidelines
2. **Configure environment variables** with your project details
3. **Implement schemas** for courses, livestreams, and blog posts
4. **Migrate existing content** from mock data to Sanity
5. **Set up webhooks** for real-time content updates

## Support

- **Sanity Documentation**: [sanity.io/docs](https://sanity.io/docs)
- **GROQ Query Reference**: [sanity.io/docs/groq](https://sanity.io/docs/groq)
- **Project Guidelines**: See the Sanity Development Guidelines document

The Trading Desk site is now fully prepared for Sanity CMS integration! 🚀
