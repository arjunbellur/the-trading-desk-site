# The Trading Desk – Frontend

## Project info

**URL**: https://lovable.dev/projects/bb1ef5ce-747a-431b-956e-6dc4b70aa0c8

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/bb1ef5ce-747a-431b-956e-6dc4b70aa0c8) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- Sanity CMS (integration pending)
- Lenis (smooth scrolling)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/bb1ef5ce-747a-431b-956e-6dc4b70aa0c8) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## CMS Integration Plan (The Trading Desk)

### Current Status: AWAITING CLIENT APPROVAL

We are using **Sanity CMS** as our headless content management system, but schema implementation is **on hold** pending client approval of the discovery checklist.

#### What's Ready:
- ✅ **Sanity client configuration** (`src/lib/sanity/client.ts`)
- ✅ **GROQ query placeholders** (`src/lib/sanity/queries.ts`)
- ✅ **TypeScript interfaces** for all content types
- ✅ **Mock data layer** (`src/mock/content.ts`) for development
- ✅ **UI components** built to be schema-agnostic
- ✅ **Environment variable setup** ready for configuration

#### What's Pending:
- ⏳ **Client schema approval** (see `docs/client-discovery-checklist.md`)
- ⏳ **Sanity schema implementation**
- ⏳ **Content migration from mock to live CMS**

#### Next Steps:

1. **Client Discovery** (1-2 days)
   - Client reviews and completes `docs/client-discovery-checklist.md`
   - Schema requirements finalized and approved

2. **Schema Implementation** (1-2 days)
   - Create Sanity schemas based on approved requirements
   - Set up Sanity Studio with custom UI components
   - Configure content validation and relationships

3. **Content Migration** (2-3 days)
   - Replace mock data imports with GROQ query calls
   - Implement proper error handling and loading states
   - Test all content flows and edge cases

4. **Production Setup** (1 day)
   - Configure production Sanity project
   - Set up environment variables
   - Deploy and test live integration

**Total Migration Timeline:** 4-8 days after client approval

#### Environment Variables Needed:
```env
VITE_SANITY_PROJECT_ID=your_project_id
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2024-12-18
VITE_SANITY_USE_CDN=true
```

#### File Structure:
```
src/
├── lib/sanity/
│   ├── client.ts          # ✅ Sanity client setup
│   └── queries.ts         # ⏳ GROQ queries (commented)
├── mock/
│   └── content.ts         # ✅ Temporary mock data
├── components/
│   ├── CourseCard.tsx     # ✅ Schema-agnostic components
│   ├── CourseGrid.tsx
│   ├── LivestreamCard.tsx
│   └── LivestreamList.tsx
└── pages/
    ├── Courses.tsx        # ✅ Using mock data
    ├── CourseDetail.tsx   # ✅ TODO comments for CMS
    ├── Live.tsx
    ├── Blog.tsx           # ✅ Placeholder ready
    └── Community.tsx      # ✅ Placeholder ready

docs/
├── client-discovery-checklist.md  # ✅ Client approval needed
└── schema.todo.md                 # ✅ Implementation plan
```

**Contact the development team when the client discovery is complete to begin schema implementation within 24 hours.**
