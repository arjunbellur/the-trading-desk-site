# Sanity Schema Implementation Plan

## 🚫 Schema Development Status: PENDING CLIENT APPROVAL

**Current Status:** Awaiting client review of discovery checklist
**Next Action:** Client must complete `docs/client-discovery-checklist.md`
**Timeline:** Schema implementation begins after client approval

---

## 📋 Potential Document Types (Pending Approval)

*These are preliminary outlines based on common trading education platforms. Final implementation depends on client requirements.*

### 1. Course
```typescript
// PLACEHOLDER - Not yet implemented
{
  _type: 'course',
  title: string,
  slug: Slug,
  shortDescription: string,
  description: PortableText,
  thumbnailImage: Image,
  price: number,
  originalPrice?: number,
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  duration: string, // "8 weeks"
  prerequisites?: string[],
  whatYouWillLearn: string[],
  instructor: Reference<Instructor>,
  modules: Reference<Module>[],
  isPublished: boolean,
  publishedAt: datetime,
  seoTitle?: string,
  seoDescription?: string
}
```

### 2. Module
```typescript
// PLACEHOLDER - Not yet implemented
{
  _type: 'module',
  title: string,
  description: string,
  order: number,
  lessons: Reference<Lesson>[],
  course: Reference<Course>
}
```

### 3. Lesson
```typescript
// PLACEHOLDER - Not yet implemented
{
  _type: 'lesson',
  title: string,
  description?: string,
  runtime: number, // seconds
  order: number,
  isPreview: boolean, // free preview lesson
  videoId: string, // Mux playback ID
  attachments: File[],
  transcript?: text,
  module: Reference<Module>
}
```

### 4. Livestream
```typescript
// PLACEHOLDER - Not yet implemented
{
  _type: 'livestream',
  title: string,
  slug: Slug,
  description: PortableText,
  scheduledAt: datetime,
  duration: number, // minutes
  instructor: Reference<Instructor>,
  liveStreamKey?: string, // Mux live stream key
  playbackId?: string, // Mux playback ID for replay
  status: 'scheduled' | 'live' | 'ended',
  accessLevel: 'free' | 'paid' | 'premium',
  replayAvailable: boolean,
  chatEnabled: boolean
}
```

### 5. Instructor
```typescript
// PLACEHOLDER - Not yet implemented
{
  _type: 'instructor',
  name: string,
  slug: Slug,
  bio: PortableText,
  avatar: Image,
  role: string, // "Lead Instructor", "Guest Expert"
  specializations: string[], // "Options Trading", "Day Trading"
  socialLinks: {
    twitter?: string,
    linkedin?: string,
    youtube?: string
  },
  isActive: boolean
}
```

### 6. Testimonial
```typescript
// PLACEHOLDER - Not yet implemented
{
  _type: 'testimonial',
  content: text,
  author: {
    name: string,
    role: string, // "Day Trader", "Options Trader"
    avatar?: Image
  },
  rating: number, // 1-5
  course?: Reference<Course>,
  isPublished: boolean,
  order: number
}
```

### 7. Blog Post (If Required)
```typescript
// PLACEHOLDER - Not yet implemented
{
  _type: 'blogPost',
  title: string,
  slug: Slug,
  excerpt: string,
  content: PortableText,
  featuredImage: Image,
  author: Reference<Instructor>,
  category: 'market-analysis' | 'strategy' | 'platform-update',
  tags: string[],
  publishedAt: datetime,
  isPublished: boolean,
  seoTitle?: string,
  seoDescription?: string
}
```

### 8. Site Settings (Global Configuration)
```typescript
// PLACEHOLDER - Not yet implemented
{
  _type: 'siteSettings',
  title: string,
  description: string,
  logo: Image,
  favicon: Image,
  socialMedia: {
    twitter?: string,
    youtube?: string,
    discord?: string
  },
  legalPages: {
    termsOfService: PortableText,
    privacyPolicy: PortableText,
    refundPolicy: PortableText,
    riskDisclaimer: PortableText
  }
}
```

---

## 🔄 Implementation Dependencies

### Client Decisions Required:
1. **Course Structure:** Flat vs modular organization
2. **Pricing Strategy:** Single purchase vs subscription model
3. **Access Control:** Free previews, membership tiers
4. **Video Platform:** Mux configuration and policies
5. **Blog Priority:** Immediate need vs future phase
6. **Administrative Workflow:** Review process requirements

### Technical Prerequisites:
- [ ] Sanity project creation
- [ ] Mux account setup (if using video)
- [ ] Payment processor integration planning
- [ ] Content migration strategy

### Post-Approval Tasks:
1. Create actual Sanity schemas with validation rules
2. Set up Sanity Studio with custom UI components
3. Implement GROQ queries in `src/lib/sanity/queries.ts`
4. Replace mock data throughout application
5. Add content management documentation

---

## ⚠️ Important Notes

- **No schemas will be created until client approval**
- **All code currently uses mock data** (see `src/mock/content.ts`)
- **UI components are built to be schema-agnostic** for easy migration
- **Environment variables are configured** but not populated

**Contact:** Development team ready to implement within 24 hours of client approval.
