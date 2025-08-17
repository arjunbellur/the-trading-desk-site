# CSS Naming Conventions & Class Organization

Following best practices from [Strategies for Maintaining Project Documentation & Requirements within the Cursor Framework](https://www.arsturn.com/blog/strategies-for-maintaining-documentation-requirements-cursor)

## Naming Convention System

### 1. Component-Based Structure
```
[component]-[element]--[modifier]
```

### 2. Layer-Based Organization
```
tm-[layer]-[component]-[element]--[modifier]
```

Where:
- `tm` = The Trading Desk prefix
- `layer` = ui | layout | theme | animation
- `component` = button | card | nav | hero | etc.
- `element` = specific part of component
- `modifier` = variant or state

## Class Categories

### UI Components
- `tm-ui-button--primary`
- `tm-ui-button--ghost`
- `tm-ui-button--liquid-glass`
- `tm-ui-card--elevated`
- `tm-ui-input--glass`

### Layout Components
- `tm-layout-hero--cinematic`
- `tm-layout-container--fluid`
- `tm-layout-grid--responsive`

### Theme Elements
- `tm-theme-gradient--brand`
- `tm-theme-glass--thick`
- `tm-theme-glass--thin`

### Animation States
- `tm-anim-fade--in`
- `tm-anim-slide--up`
- `tm-anim-glass--shimmer`

## Migration Plan

### Phase 1: Core Components
1. Button system (`btn-*` → `tm-ui-button-*`)
2. Glass effects (`glass-*` → `tm-theme-glass-*`)
3. Hero components (`hero-*` → `tm-layout-hero-*`)

### Phase 2: Layout & Cards
1. Card components (`card-*` → `tm-ui-card-*`)
2. Navigation (`nav-*` → `tm-layout-nav-*`)
3. Containers (`container-*` → `tm-layout-container-*`)

### Phase 3: Animations & Effects
1. Cinematic effects (`cinematic-*` → `tm-anim-*`)
2. Hover states (`:hover` → `--hover` modifier)
3. Focus states (`:focus` → `--focus` modifier)

## Benefits
- **Consistent Structure**: Easy to understand and maintain
- **Namespace Protection**: Avoid conflicts with third-party libraries
- **Logical Hierarchy**: Clear separation of concerns
- **Team Collaboration**: Everyone follows the same naming pattern
- **Documentation**: Self-documenting class names
