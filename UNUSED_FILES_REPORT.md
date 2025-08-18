# Unused Files Analysis Report

## 🗑️ Files That Can Be Safely Removed

### **1. Legacy CSS File**
- **`src/App.css`** - Default Vite/React CSS that's never imported
  - Contains generic Vite starter styles
  - All styling is handled through `src/index.css` and Tailwind
  - ❌ Not imported anywhere in the codebase

### **2. Empty Directory**
- **`src/styles/`** - Empty directory with no files
  - Can be removed entirely

### **3. Unused Component**
- **`src/components/ClearGlass.tsx`** - Never imported or used
  - References `./glass-effect.svg` which doesn't exist
  - ❌ No imports found in any file

### **4. Potentially Unused Page**
- **`src/pages/Livestream.tsx`** - Individual livestream page
  - ❌ Not referenced in routing (App.tsx)
  - ❌ No imports found
  - Note: `src/pages/Live.tsx` exists and is used for the live page

### **5. Sanity CMS Files (If Not Using CMS)**
- **`src/lib/sanity/client.ts`** - Sanity client setup
- **`src/lib/sanity/queries.ts`** - GROQ queries
  - ⚠️ Only remove if you're not planning to use Sanity CMS
  - Currently using mock data instead

## 🔍 Potentially Unused UI Components

Many UI components from shadcn/ui are included but not currently used:

### **Never Imported Components**
- `src/components/ui/accordion.tsx`
- `src/components/ui/alert-dialog.tsx`
- `src/components/ui/alert.tsx`
- `src/components/ui/aspect-ratio.tsx`
- `src/components/ui/avatar.tsx`
- `src/components/ui/breadcrumb.tsx`
- `src/components/ui/calendar.tsx`
- `src/components/ui/carousel.tsx`
- `src/components/ui/chart.tsx`
- `src/components/ui/checkbox.tsx`
- `src/components/ui/collapsible.tsx`
- `src/components/ui/context-menu.tsx`
- `src/components/ui/drawer.tsx`
- `src/components/ui/dropdown-menu.tsx`
- `src/components/ui/hover-card.tsx`
- `src/components/ui/input-otp.tsx`
- `src/components/ui/input.tsx`
- `src/components/ui/label.tsx`
- `src/components/ui/menubar.tsx`
- `src/components/ui/pagination.tsx`
- `src/components/ui/popover.tsx`
- `src/components/ui/progress.tsx`
- `src/components/ui/radio-group.tsx`
- `src/components/ui/resizable.tsx`
- `src/components/ui/scroll-area.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/skeleton.tsx`
- `src/components/ui/slider.tsx`
- `src/components/ui/switch.tsx`
- `src/components/ui/table.tsx`
- `src/components/ui/tabs.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/toggle-group.tsx`
- `src/components/ui/toggle.tsx`

### **⚠️ Recommendation for UI Components**
**DO NOT remove these UI components yet** because:
1. They're part of the shadcn/ui design system
2. You may need them for future features
3. They don't significantly impact bundle size (tree-shaking handles unused imports)
4. Better to have them available when needed

## 🎯 Immediate Action Items

### **Safe to Remove Now:**
```bash
# Remove definitely unused files
rm src/App.css
rm src/components/ClearGlass.tsx
rm src/pages/Livestream.tsx
rmdir src/styles/

# If not using Sanity CMS:
rm -rf src/lib/sanity/
```

### **Bundle Size Impact:**
- **Minimal** - Most unused components are tree-shaken during build
- **App.css** - 43 lines of unused CSS
- **ClearGlass.tsx** - Small component with broken import
- **Livestream.tsx** - Unused page component

## 📊 Summary

**Files to Remove:** 4-6 files
**Bundle Size Reduction:** ~2-3KB (minimal impact)
**Maintenance Benefit:** Cleaner codebase, fewer confusing files
**Risk Level:** ✅ Low - All identified files are confirmed unused

The codebase is generally well-organized with minimal unused code. The shadcn/ui components should be kept as they're part of the design system foundation.
