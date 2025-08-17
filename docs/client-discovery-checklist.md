# Trade Masters CMS Schema Discovery Checklist

## 📋 Approval Checklist

**Before schema implementation, client must review and approve:**

- [ ] **Course Structure** - How courses, modules, and lessons are organized
- [ ] **Pricing Models** - One-time, subscription, cohort-based pricing
- [ ] **Access Control** - Free vs paid content, membership tiers
- [ ] **Video Integration** - Mux configuration, preview/locked content
- [ ] **Instructor Management** - Profiles, roles, content ownership
- [ ] **Livestream Requirements** - Scheduling, access, replay policies
- [ ] **Administrative Workflow** - Publishing, review process, content scheduling
- [ ] **Legal & Compliance** - Trading disclaimers, refund policies

**Client Signature:** _________________ **Date:** _________

---

## 🎯 Schema Discovery Questionnaire

### A. Courses

#### Course Identity & Structure
- **What uniquely identifies a course?**
  - [ ] Title, slug, summary
  - [ ] Difficulty level (Beginner/Intermediate/Advanced)
  - [ ] Category/tags (Options, Day Trading, Forex, etc.)
  - [ ] Duration estimate
  - [ ] Prerequisites

- **How are courses organized internally?**
  - [ ] Flat structure (just lessons)
  - [ ] Modular structure (modules containing lessons)
  - [ ] Sequential vs. non-sequential access
  - [ ] Progress tracking needed?

- **What content types exist within courses?**
  - [ ] Video lessons (primary content)
  - [ ] Text/markdown content
  - [ ] Downloadable resources (PDFs, templates)
  - [ ] Assignments/exercises
  - [ ] Quizzes/assessments

#### Lesson Requirements
- **Essential lesson fields:**
  - [ ] Title, description
  - [ ] Runtime/duration
  - [ ] Video ID (Mux playback ID)
  - [ ] Preview status (free preview vs locked)
  - [ ] Attachments/resources
  - [ ] Transcript availability

#### Pricing & Access Models
- **What purchase models do you support?**
  - [ ] One-time purchase per course
  - [ ] Monthly/annual subscription for all courses
  - [ ] Cohort-based pricing (limited enrollment)
  - [ ] Bundle pricing (multiple courses)
  - [ ] Enterprise/bulk pricing

- **Free vs Paid Content:**
  - [ ] Some lessons always free (previews)
  - [ ] Entire free courses for lead generation
  - [ ] Tiered access (basic vs premium content)

### B. Livestreams

#### Technical Requirements
- **Required livestream fields:**
  - [ ] Title, description
  - [ ] Scheduled date/time
  - [ ] Duration estimate
  - [ ] Mux live stream key/playback ID
  - [ ] Chat/interaction features needed?

#### Access & Replay Policies
- **Who can access livestreams?**
  - [ ] Open to all (marketing events)
  - [ ] Course students only
  - [ ] Premium members only
  - [ ] Registration required

- **Replay availability:**
  - [ ] Automatic replay generation
  - [ ] Replay access duration (permanent/time-limited)
  - [ ] Different access rules for live vs replay

### C. Instructors & Team

#### Instructor Profiles
- **Required instructor information:**
  - [ ] Name, bio, professional background
  - [ ] Profile photo/avatar
  - [ ] Role/title (Lead Instructor, Guest Expert, etc.)
  - [ ] Social media links
  - [ ] Trading specializations

- **Content Ownership:**
  - [ ] Single instructor per course
  - [ ] Multiple instructors per course
  - [ ] Guest instructors for specific lessons

### D. Pricing & Membership

#### Access Control Tiers
- **What membership levels exist?**
  - [ ] Free (limited content)
  - [ ] Basic Paid (full course access)
  - [ ] Premium (courses + live sessions)
  - [ ] Enterprise (custom features)

#### Payment Integration
- **Current payment processor:**
  - [ ] Stripe integration required
  - [ ] Whop integration required
  - [ ] Other: _________________

### E. SEO & Marketing

#### Content Marketing
- **SEO requirements per page:**
  - [ ] Meta title, description
  - [ ] OpenGraph images
  - [ ] Schema.org markup
  - [ ] Custom URLs/slugs

#### Blog Content
- **Blog implementation priority:**
  - [ ] Critical for launch
  - [ ] Phase 2 feature
  - [ ] Not needed initially

- **Blog content types:**
  - [ ] Market analysis posts
  - [ ] Strategy tutorials
  - [ ] Platform updates
  - [ ] Guest content

### F. Compliance & Legal

#### Trading Education Compliance
- **Required disclaimers:**
  - [ ] Risk warnings on all trading content
  - [ ] Performance disclaimers
  - [ ] Educational purpose statements
  - [ ] Geographic restrictions

#### Business Policies
- **Policy pages needed:**
  - [ ] Refund policy
  - [ ] Terms of service
  - [ ] Privacy policy
  - [ ] Content usage rights

### G. Administrative Workflow

#### Content Publishing
- **Who manages content?**
  - [ ] Single admin user
  - [ ] Multiple team members
  - [ ] Instructor self-publishing

#### Workflow Requirements
- **Content review process:**
  - [ ] Draft → Review → Publish
  - [ ] Direct publishing allowed
  - [ ] Scheduled publishing needed

#### Content Management
- **Bulk operations needed:**
  - [ ] Bulk course updates
  - [ ] Batch content import
  - [ ] Content versioning
  - [ ] Content archiving

---

## 🚀 Next Steps After Approval

1. **Schema Implementation** (1-2 days)
   - Create Sanity schemas based on approved requirements
   - Set up content relationships and validation rules
   - Configure Sanity Studio

2. **Content Migration** (2-3 days)
   - Replace mock data with GROQ queries
   - Implement real content fetching
   - Test all data flows

3. **Production Setup** (1 day)
   - Configure production Sanity project
   - Set up environment variables
   - Deploy and test live integration

**Estimated Timeline:** 4-6 days post-approval
