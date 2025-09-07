# Best Practices Guide

## Project Structure
```
src/
├── components/     # Reusable UI components
├── data/          # Static data and constants
├── hooks/         # Custom React hooks
├── lib/           # Utility functions and configurations
├── pages/         # Page components
├── styles/        # Global styles and CSS modules
└── mock/          # Mock data for development
```

## 1. Vite Best Practices
**Files: `vite.config.ts`, `package.json`**

- ✅ Use `defineConfig` for better type inference
- ✅ Leverage `@vitejs/plugin-react-swc` for faster builds
- ✅ Configure path aliases for clean imports (`@/` → `src/`)
- ✅ Use development plugins conditionally (e.g., `componentTagger`)

## 2. React Best Practices
**Files: `src/**/*.{ts,tsx}`**

- ✅ Use functional components with hooks
- ✅ Implement `useMemo` and `useCallback` for performance
- ✅ Use TypeScript for type safety
- ✅ Separate concerns with custom hooks
- ✅ Use React.Fragment for multiple elements

## 3. React Query Best Practices
**Files: `src/hooks/`, `src/lib/sanity/`**

- ✅ Use `useQuery` for data fetching
- ✅ Implement proper error handling and loading states
- ✅ Use query keys for cache management
- ✅ Leverage React Query Devtools in development

## 4. React Hook Form Best Practices
**Files: `src/components/ui/form.tsx`, `src/**/*form*.{ts,tsx}`**

- ✅ Use `useForm` for form state management
- ✅ Integrate with Zod for validation
- ✅ Use `Controller` for custom components
- ✅ Implement proper error handling

## 5. Tailwind CSS Best Practices
**Files: `src/**/*.{ts,tsx}`, `tailwind.config.ts`**

- ✅ Use utility-first classes
- ✅ Create custom components with `@apply`
- ✅ Use responsive utilities (`sm:`, `md:`, `lg:`)
- ✅ Leverage `cn()` utility for conditional classes

## 6. Radix UI Best Practices
**Files: `src/components/ui/`**

- ✅ Use Radix components for accessibility
- ✅ Follow proper keyboard navigation patterns
- ✅ Implement proper ARIA attributes
- ✅ Use composition patterns for customization

## 7. Zod Best Practices
**Files: `src/**/*schema*.{ts,tsx}`, `src/lib/`**

- ✅ Define schemas for data validation
- ✅ Use Zod with React Hook Form
- ✅ Implement proper error messages
- ✅ Use type inference from schemas

## 8. Framer Motion Best Practices
**Files: `src/**/*.{ts,tsx}`**

- ✅ Use `motion` components declaratively
- ✅ Implement `variants` for reusable animations
- ✅ Optimize with `React.memo` when needed
- ✅ Use proper animation timing and easing

## 9. CLSX Best Practices
**Files: `src/**/*.{ts,tsx}`**

- ✅ Use `clsx` for conditional classes
- ✅ Keep class logic readable
- ✅ Combine with `cn()` utility
- ✅ Avoid complex conditional logic

## 10. Date-fns Best Practices
**Files: `src/**/*.{ts,tsx}`**

- ✅ Use specific functions for better performance
- ✅ Centralize date formatting logic
- ✅ Use proper locale settings
- ✅ Implement consistent date handling

## Implementation Examples

### Custom Hook Pattern
```typescript
// src/hooks/useCourseActions.ts
export const useCourseActions = () => {
  const navigate = useNavigate();
  
  const handlePreRegister = useCallback((courseId: string) => {
    // Implementation
  }, []);
  
  return { handlePreRegister };
};
```

### Component Pattern
```typescript
// src/components/CourseCard.tsx
interface CourseCardProps {
  // TypeScript interfaces
}

export const CourseCard: React.FC<CourseCardProps> = ({ ... }) => {
  // Implementation with proper typing
};
```

### Data Management
```typescript
// src/data/courses.ts
export interface CourseData {
  // TypeScript interfaces
}

export const coursesData: CourseData[] = [
  // Structured data
];
```

## File Naming Conventions
- Components: `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Utilities: `camelCase.ts`
- Constants: `UPPER_SNAKE_CASE.ts`
- Types: `camelCase.types.ts`

## Import Organization
```typescript
// 1. React and external libraries
import React from 'react';
import { motion } from 'framer-motion';

// 2. Internal components
import { CourseCard } from '@/components/CourseCard';

// 3. Hooks and utilities
import { useCourseActions } from '@/hooks/useCourseActions';
import { cn } from '@/lib/utils';

// 4. Types
import type { CourseData } from '@/data/courses';
```
