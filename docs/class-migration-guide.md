# Class Migration Guide

Following the [Strategies for Maintaining Project Documentation & Requirements within the Cursor Framework](https://www.arsturn.com/blog/strategies-for-maintaining-documentation-requirements-cursor)

## Migration Status

### ✅ Completed
- [x] Created The Trading Desk UI system (`tm-*` prefix)
- [x] Button component liquid glass system
- [x] Brand gradient text classes
- [x] Documentation structure

### 🔄 In Progress
- [ ] Legacy CSS cleanup
- [ ] Component class updates

### ⏳ Pending
- [ ] Navigation component classes
- [ ] Card component classes
- [ ] Animation class consolidation

## Class Mapping

### Old → New Naming Convention

#### Buttons
```css
/* Old */
.btn-fx-primary → .tm-ui-button.tm-ui-button--liquid-glass-thick
.btn-fx-ghost → .tm-ui-button.tm-ui-button--liquid-glass-ghost
.btn-apple-glass → .tm-ui-button.tm-ui-button--liquid-glass-thick

/* New System */
.tm-ui-button                    /* Base button */
.tm-ui-button--liquid-glass-thick    /* Primary buttons */
.tm-ui-button--liquid-glass-thin     /* Secondary buttons */
.tm-ui-button--liquid-glass-ghost    /* Ghost buttons */
```

#### Gradients & Themes
```css
/* Old */
.text-gradient-brand → .tm-theme-text-gradient--brand
.gradient-brand → .tm-theme-gradient--brand

/* New System */
.tm-theme-text-gradient--brand   /* Text with brand gradient */
.tm-theme-gradient--brand        /* Background brand gradient */
```

#### Layout & Containers
```css
/* Old */
.cinematic-hero-bg → .tm-layout-hero--cinematic
.container-cinematic → .tm-layout-container--cinematic

/* New System */
.tm-layout-hero--cinematic       /* Hero section background */
.tm-layout-container--cinematic  /* Main content container */
```

#### Animations
```css
/* Old */
.cinematic-fade-in → .tm-anim-fade--in

/* New System */
.tm-anim-fade--in               /* Fade in animation */
.tm-anim-slide--up              /* Slide up animation */
.tm-anim-glass--shimmer         /* Glass shimmer effect */
```

## Benefits of New System

### 1. **Namespace Protection**
- `tm-` prefix prevents conflicts with third-party libraries
- Clear ownership of custom classes

### 2. **Logical Organization**
- `ui-` for interface components
- `layout-` for structural elements
- `theme-` for visual styling
- `anim-` for animations

### 3. **Consistent Structure**
- `[prefix]-[category]-[component]--[modifier]`
- Easy to understand and maintain
- Self-documenting class names

### 4. **Team Collaboration**
- Clear naming conventions everyone follows
- Easier onboarding for new developers
- Reduced naming conflicts and confusion

## Usage Examples

### Button Components
```jsx
// Old way
<Button className="btn-fx-primary">Primary</Button>

// New way (handled automatically by Button component)
<Button variant="regular" material="thick">Primary</Button>
// Renders with: tm-ui-button tm-ui-button--liquid-glass-thick
```

### Text Gradients
```jsx
// Old way
<span className="text-gradient-brand">Brand Text</span>

// New way
<span className="tm-theme-text-gradient--brand">Brand Text</span>
```

### Layout Components
```jsx
// Old way
<div className="cinematic-hero-bg">

// New way
<div className="tm-layout-hero--cinematic">
```

## Implementation Strategy

1. **Phase 1**: Core components (✅ Completed)
2. **Phase 2**: Layout and structure components
3. **Phase 3**: Animation and effect classes
4. **Phase 4**: Legacy cleanup and deprecation

This systematic approach ensures smooth migration while maintaining functionality throughout the process.
