# Design System Documentation

## Overview

This design system provides reusable, consistent components that eliminate repetitive styling and promote maintainability across the application.

## Core Principles

1. **Consistency**: All components follow the same design patterns
2. **Reusability**: Components are designed to be used across the entire application
3. **Simplicity**: Base components are simple and composable
4. **Accessibility**: Built with accessibility in mind
5. **Performance**: Optimized for performance and bundle size

## Layout Components

### Section Component

The `Section` component provides consistent section styling with built-in spacing and variants.

```tsx
import { Section } from '@/components/ui/section';

<Section variant="default" spacing="md" id="my-section">
  {/* Content */}
</Section>
```

**Props:**
- `variant`: 'default' | 'hero' | 'featured' | 'dark'
- `spacing`: 'sm' | 'md' | 'lg' | 'xl'
- `container`: boolean (default: true)
- `id`: string (optional)
- `className`: string (optional)

**Variants:**
- `default`: Standard background
- `hero`: Hero section with overflow handling
- `featured`: Featured section with border
- `dark`: Dark background with backdrop blur

### Container Component

The `Container` component provides consistent width constraints and centering.

```tsx
import { Container } from '@/components/ui/container';

<Container size="lg" centered={true}>
  {/* Content */}
</Container>
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full'
- `centered`: boolean (default: true)
- `className`: string (optional)

**Sizes:**
- `sm`: max-w-none (100% width)
- `md`: max-w-none (100% width)
- `lg`: max-w-none (100% width) - **Recommended for most sections**
- `xl`: max-w-none (100% width)
- `full`: max-w-none (100% width)

**Note:** All containers now use 100% width. The only width constraint is the global section padding.

## Typography Components

### Page Headers

```tsx
import { PageTitle, PageSubtitle } from '@/components/ui/typography';

<PageTitle>Main Page Title</PageTitle>
<PageSubtitle>Page Subtitle</PageSubtitle>
```

### Section Headers

```tsx
import { SectionTitle, SectionSubtitle } from '@/components/ui/typography';

<SectionTitle>Section Title</SectionTitle>
<SectionSubtitle>Section Subtitle</SectionSubtitle>
```

### Content Text

```tsx
import { Text, TextLarge, TextSmall, Caption, Label } from '@/components/ui/typography';

<Text>Regular paragraph text</Text>
<TextLarge>Large paragraph text</TextLarge>
<TextSmall>Small paragraph text</TextSmall>
<Caption>Caption text</Caption>
<Label>Label text</Label>
```

## Usage Examples

### Before (Repetitive Styling)

```tsx
// Old way - lots of repetitive classes
<section className="tm-layout-section py-12 sm:py-16 md:py-20 border-t border-border/30 relative z-40">
  <div className="tm-layout-container max-w-none mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
    <div className="text-center mb-16 sm:mb-20">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
        Section Title
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
        Section description
      </p>
    </div>
  </div>
</section>
```

### After (Clean Design System)

```tsx
// New way - clean and reusable
<Section variant="featured" spacing="lg">
  <Container size="lg">
    <div className="text-center mb-12">
      <SectionTitle className="mb-4">
        Section Title
      </SectionTitle>
      <Text className="text-muted-foreground">
        Section description
      </Text>
    </div>
  </Container>
</Section>
```

## Benefits

### 1. **Reduced Code Duplication**
- No more repetitive section/container classes
- Consistent spacing and typography
- Single source of truth for styling

### 2. **Better Maintainability**
- Changes to spacing/typography happen in one place
- Consistent design across all pages
- Easier to update and modify

### 3. **Improved Developer Experience**
- Clear, semantic component names
- TypeScript support with proper interfaces
- Consistent API across components

### 4. **Performance Benefits**
- Smaller bundle size (less repeated CSS)
- Better tree-shaking
- Optimized re-renders

### 5. **Accessibility**
- Proper semantic HTML structure
- Consistent focus management
- Screen reader friendly

## Migration Guide

### Step 1: Replace Section Wrappers

```tsx
// Old
<section className="tm-layout-section py-12 sm:py-16 md:py-20 border-t border-border/30 relative z-40">
  <div className="tm-layout-container max-w-none mx-auto px-2 sm:px-4 md:px-6 lg:px-8">

// New
<Section variant="featured" spacing="lg">
  <Container size="lg">  // Use 'lg' for consistent width across sections
```

### Step 2: Replace Typography

```tsx
// Old
<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">

// New
<SectionTitle className="mb-4">
```

### Step 3: Replace Text Elements

```tsx
// Old
<p className="text-lg text-muted-foreground max-w-2xl mx-auto">

// New
<Text className="text-muted-foreground max-w-2xl mx-auto">
```

## Best Practices

1. **Use semantic variants**: Choose the appropriate section variant for your content
2. **Consistent spacing**: Use the spacing prop instead of custom padding
3. **Typography hierarchy**: Use the appropriate typography component for the content level
4. **Container sizing**: All containers now use 100% width by default
5. **Global padding**: The only width constraint is the section padding (`px-2`)
6. **Composition**: Combine components to create complex layouts

## Future Enhancements

- Animation variants for sections
- More typography variants
- Grid system components
- Form layout components
- Card layout components
