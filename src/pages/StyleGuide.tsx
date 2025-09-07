/**
 * Style Guide Page
 * Official design and naming reference for the Trading Desk site
 * 
 * This page serves as the single source of truth for:
 * - Typography hierarchy and usage
 * - Color palette and applications
 * - Button styles and states
 * - Spacing and layout systems
 * - Class naming conventions
 * - Reusable UI components
 */

import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { NeonGradientCard } from '@/components/magicui';
import { 
  Palette, 
  Type, 
  MousePointer, 
  Layout, 
  Code, 
  Component,
  Copy,
  Check,
  Eye,
  EyeOff
} from 'lucide-react';

const StyleGuide = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [showCode, setShowCode] = useState<Record<string, boolean>>({});

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const toggleCode = (sectionId: string) => {
    setShowCode(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const CodeBlock = ({ code, language = 'html', id }: { code: string; language?: string; id: string }) => (
    <div className="relative mt-4 overflow-hidden rounded-lg bg-gray-900">
      <div className="flex items-center justify-between border-b border-gray-700 bg-gray-800 p-3">
        <span className="font-mono text-xs text-gray-400">{language}</span>
        <div className="flex gap-2">
          <button
            onClick={() => toggleCode(id)}
            className="p-1 text-gray-400 transition-colors hover:text-white"
            title={showCode[id] ? 'Hide code' : 'Show code'}
          >
            {showCode[id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <button
            onClick={() => copyToClipboard(code, id)}
            className="p-1 text-gray-400 transition-colors hover:text-white"
            title="Copy code"
          >
            {copiedCode === id ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
      {showCode[id] && (
        <pre className="overflow-x-auto p-4 text-sm text-gray-300">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="container mx-auto max-w-6xl px-4 py-24">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-4xl font-light lg:text-6xl">Style Guide</h1>
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
            Official design and naming reference for the Trading Desk site. This guide ensures consistency 
            across all components and serves as the single source of truth for our design system.
          </p>
        </div>

        {/* Navigation */}
        <nav className="mb-12 rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Quick Navigation</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { id: 'typography', icon: Type, label: 'Typography' },
              { id: 'colors', icon: Palette, label: 'Colors' },
              { id: 'buttons', icon: MousePointer, label: 'Buttons' },
              { id: 'spacing', icon: Layout, label: 'Spacing' },
              { id: 'naming', icon: Code, label: 'Naming' },
              { id: 'components', icon: Component, label: 'Components' },
            ].map(({ id, icon: Icon, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex flex-col items-center rounded-lg border p-3 transition-colors hover:bg-muted"
              >
                <Icon className="mb-2 h-6 w-6" />
                <span className="text-sm">{label}</span>
              </a>
            ))}
          </div>
        </nav>

        {/* Typography Section */}
        <section id="typography" className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Type className="h-6 w-6" />
                Typography Hierarchy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Headings */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">Headings</h3>
                <div className="space-y-6">
                  <div>
                    <h1 className="mb-2">H1 - Main Page Title</h1>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Font: SF Pro Display | Size: 2.75rem (44px) | Weight: 300 | Line Height: 1.1
                    </p>
                    <CodeBlock 
                      id="h1-code" 
                      code={`<h1 className="text-5xl font-light leading-tight">Main Page Title</h1>
<!-- CSS: font-size: 2.75rem; font-weight: 300; line-height: 1.1; -->`} 
                    />
                  </div>

                  <div>
                    <h2 className="mb-2">H2 - Section Headers</h2>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Font: SF Pro Display | Size: 1.875rem (30px) | Weight: 400 | Line Height: 1.2
                    </p>
                    <CodeBlock 
                      id="h2-code" 
                      code={`<h2 className="text-3xl font-normal">Section Header</h2>
<!-- CSS: font-size: 1.875rem; font-weight: 400; line-height: 1.2; -->`} 
                    />
                  </div>

                  <div>
                    <h3 className="mb-2">H3 - Subsection Headers</h3>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Font: SF Pro Display | Size: 1.5rem (24px) | Weight: 500 | Line Height: 1.3
                    </p>
                    <CodeBlock 
                      id="h3-code" 
                      code={`<h3 className="text-2xl font-medium">Subsection Header</h3>
<!-- CSS: font-size: 1.5rem; font-weight: 500; line-height: 1.3; -->`} 
                    />
                  </div>

                  <div>
                    <h4 className="mb-2">H4 - Component Headers</h4>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Font: SF Pro Display | Size: 1.25rem (20px) | Weight: 500 | Line Height: 1.4
                    </p>
                    <CodeBlock 
                      id="h4-code" 
                      code={`<h4 className="text-xl font-medium">Component Header</h4>
<!-- CSS: font-size: 1.25rem; font-weight: 500; line-height: 1.4; -->`} 
                    />
                  </div>

                  <div>
                    <h5 className="mb-2">H5 - Small Headers</h5>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Font: SF Pro Display | Size: 1.125rem (18px) | Weight: 600 | Line Height: 1.4
                    </p>
                    <CodeBlock 
                      id="h5-code" 
                      code={`<h5 className="text-lg font-semibold">Small Header</h5>
<!-- CSS: font-size: 1.125rem; font-weight: 600; line-height: 1.4; -->`} 
                    />
                  </div>

                  <div>
                    <h6 className="mb-2">H6 - Labels/Tags</h6>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Font: SF Pro Display | Size: 0.875rem (14px) | Weight: 600 | Text Transform: Uppercase
                    </p>
                    <CodeBlock 
                      id="h6-code" 
                      code={`<h6 className="text-sm font-semibold uppercase tracking-wide">Label/Tag</h6>
<!-- CSS: font-size: 0.875rem; font-weight: 600; text-transform: uppercase; -->`} 
                    />
                  </div>
                </div>
              </div>

              {/* Body Text */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">Body Text</h3>
                <div className="space-y-4">
                  <div>
                    <p className="mb-2">Regular Body Text - Default paragraph text with optimal readability.</p>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Font: SF Pro Text | Size: 1rem (16px) | Weight: 400 | Line Height: 1.6
                    </p>
                    <CodeBlock 
                      id="body-code" 
                      code={`<p className="text-base">Regular body text content</p>
<!-- CSS: font-size: 1rem; font-weight: 400; line-height: 1.6; -->`} 
                    />
                  </div>

                  <div>
                    <p className="text-large mb-2">Large Text - For emphasized content and introductions.</p>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Font: SF Pro Text | Size: 1.125rem (18px) | Weight: 300 | Line Height: 1.7
                    </p>
                    <CodeBlock 
                      id="text-large-code" 
                      code={`<p className="text-large">Large emphasized text</p>
<!-- CSS: font-size: 1.125rem; font-weight: 300; line-height: 1.7; -->`} 
                    />
                  </div>

                  <div>
                    <p className="text-small mb-2">Small Text - For captions and secondary information.</p>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Font: SF Pro Text | Size: 0.875rem (14px) | Weight: 400 | Line Height: 1.5
                    </p>
                    <CodeBlock 
                      id="text-small-code" 
                      code={`<p className="text-small">Small secondary text</p>
<!-- CSS: font-size: 0.875rem; font-weight: 400; line-height: 1.5; -->`} 
                    />
                  </div>

                  <div>
                    <p className="mb-2 text-muted">Muted Text - For less important information.</p>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Color: hsl(var(--muted-foreground)) | Usage: Captions, metadata
                    </p>
                    <CodeBlock 
                      id="text-muted-code" 
                      code={`<p className="text-muted">Muted text content</p>
<!-- CSS: color: hsl(var(--muted-foreground)); -->`} 
                    />
                  </div>
                </div>
              </div>

              {/* Special Typography */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">Special Typography</h3>
                <div className="space-y-4">
                  <div>
                    <span className="tm-apple-3d-text mb-2 block text-3xl font-light">Apple 3D Text Effect</span>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Special 3D gradient effect for hero text and important headings
                    </p>
                    <CodeBlock 
                      id="apple-3d-code" 
                      code={`<h1 className="tm-apple-3d-text text-5xl font-light">Master Your Trading</h1>
<!-- Custom CSS class with white gradient and depth shadow -->`} 
                    />
                  </div>

                  <div>
                    <span className="tm-theme-text-gradient--brand mb-2 block text-2xl font-medium">Brand Gradient Text</span>
                    <p className="mb-2 text-sm text-muted-foreground">
                      Green gradient text for rotating words and accents
                    </p>
                    <CodeBlock 
                      id="brand-gradient-code" 
                      code={`<span className="tm-theme-text-gradient--brand">market</span>
<!-- Custom CSS: green gradient with drop shadow -->`} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Colors Section */}
        <section id="colors" className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Palette className="h-6 w-6" />
                Color Palette
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Primary Colors */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">Primary Colors</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="space-y-3">
                    <div className="h-16 w-full rounded-lg border bg-primary"></div>
                    <div>
                      <h4 className="font-medium">Primary</h4>
                      <p className="text-sm text-muted-foreground">HSL: 161 60% 65%</p>
                      <p className="text-sm text-muted-foreground">Light mint green</p>
                      <CodeBlock 
                        id="primary-code" 
                        code={`className="bg-primary text-primary-foreground"
/* CSS: --primary: 161 60% 65%; */`} 
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-16 w-full rounded-lg border bg-secondary"></div>
                    <div>
                      <h4 className="font-medium">Secondary</h4>
                      <p className="text-sm text-muted-foreground">HSL: 0 0% 5%</p>
                      <p className="text-sm text-muted-foreground">Subtle dark gray</p>
                      <CodeBlock 
                        id="secondary-code" 
                        code={`className="bg-secondary text-secondary-foreground"
/* CSS: --secondary: 0 0% 5%; */`} 
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-16 w-full rounded-lg border bg-accent"></div>
                    <div>
                      <h4 className="font-medium">Accent</h4>
                      <p className="text-sm text-muted-foreground">HSL: 161 55% 70%</p>
                      <p className="text-sm text-muted-foreground">Light mint accent</p>
                      <CodeBlock 
                        id="accent-code" 
                        code={`className="bg-accent text-accent-foreground"
/* CSS: --accent: 161 55% 70%; */`} 
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-16 w-full rounded-lg border bg-muted"></div>
                    <div>
                      <h4 className="font-medium">Muted</h4>
                      <p className="text-sm text-muted-foreground">HSL: 0 0% 3%</p>
                      <p className="text-sm text-muted-foreground">Subtle background</p>
                      <CodeBlock 
                        id="muted-code" 
                        code={`className="bg-muted text-muted-foreground"
/* CSS: --muted: 0 0% 3%; */`} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Brand Gradients */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">Brand Gradients</h3>
                <div className="space-y-4">
                  <div>
                    <div className="tm-theme-gradient--brand h-16 w-full rounded-lg"></div>
                    <h4 className="mt-3 font-medium">Brand Gradient</h4>
                    <p className="text-sm text-muted-foreground">Primary brand gradient for backgrounds</p>
                    <CodeBlock 
                      id="brand-bg-gradient-code" 
                      code={`className="tm-theme-gradient--brand"
/* CSS: linear-gradient(90deg, rgb(100 211 186) 0%, rgb(136 235 208) 50%, rgb(172 248 230) 100%) */`} 
                    />
                  </div>

                  <div>
                    <div className="flex h-16 w-full items-center justify-center rounded-lg">
                      <span className="tm-theme-text-gradient--brand text-2xl font-bold">Text Gradient</span>
                    </div>
                    <h4 className="mt-3 font-medium">Text Gradient</h4>
                    <p className="text-sm text-muted-foreground">Darker green gradient for text elements</p>
                    <CodeBlock 
                      id="text-gradient-code" 
                      code={`className="tm-theme-text-gradient--brand"
/* CSS: linear-gradient(90deg, rgb(22 101 52) 0%, rgb(34 197 94) 50%, rgb(74 222 128) 100%) */`} 
                    />
                  </div>
                </div>
              </div>

              {/* System Colors */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">System Colors</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-3">
                    <div className="h-16 w-full rounded-lg border bg-background"></div>
                    <div>
                      <h4 className="font-medium">Background</h4>
                      <p className="text-sm text-muted-foreground">HSL: 0 0% 0%</p>
                      <p className="text-sm text-muted-foreground">Main page background</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-16 w-full rounded-lg border bg-card"></div>
                    <div>
                      <h4 className="font-medium">Card</h4>
                      <p className="text-sm text-muted-foreground">HSL: 0 0% 2%</p>
                      <p className="text-sm text-muted-foreground">Card backgrounds</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-16 w-full rounded-lg bg-border"></div>
                    <div>
                      <h4 className="font-medium">Border</h4>
                      <p className="text-sm text-muted-foreground">HSL: 0 0% 10%</p>
                      <p className="text-sm text-muted-foreground">Element borders</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Buttons Section */}
        <section id="buttons" className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <MousePointer className="h-6 w-6" />
                Button Styles & States
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* TM UI Buttons */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">TM UI Button System</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-4 font-medium">Navigation Buttons (tm-ui-button--nav)</h4>
                    <div className="mb-4 flex flex-wrap gap-4">
                      <button className="tm-ui-button tm-ui-button--nav">Default</button>
                      <button className="tm-ui-button tm-ui-button--nav" style={{ 
                        background: 'rgba(255, 255, 255, 0.08)', 
                        borderColor: 'rgba(255, 255, 255, 0.18)' 
                      }}>Hover</button>
                      <button className="tm-ui-button tm-ui-button--nav" disabled>Disabled</button>
                    </div>
                    <CodeBlock 
                      id="nav-button-code" 
                      code={`<button className="tm-ui-button tm-ui-button--nav">Navigation Button</button>
/* Sizing: padding: 6px 14px; min-height: 38px; font-size: 14px; */
/* Material: border-radius: 50px; backdrop-filter: blur(20px); */`} 
                    />
                  </div>

                  <div>
                    <h4 className="mb-4 font-medium">Regular Buttons (tm-ui-button--regular)</h4>
                    <div className="mb-4 flex flex-wrap gap-4">
                      <button className="tm-ui-button tm-ui-button--regular">Default</button>
                      <button className="tm-ui-button tm-ui-button--regular" style={{ 
                        background: 'rgba(255, 255, 255, 0.12)', 
                        borderColor: 'rgba(255, 255, 255, 0.25)' 
                      }}>Hover</button>
                      <button className="tm-ui-button tm-ui-button--regular" disabled>Disabled</button>
                    </div>
                    <CodeBlock 
                      id="regular-button-code" 
                      code={`<button className="tm-ui-button tm-ui-button--regular">Regular Button</button>
/* Sizing: padding: 10px 20px; min-height: 44px; font-size: 15px; */
/* Material: Apple glass effect with backdrop blur */`} 
                    />
                  </div>
                </div>
              </div>

              {/* Special Buttons */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">Special Button Styles</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-4 font-medium">Liquid Glass Discord Button</h4>
                    <div className="mb-4 flex flex-wrap gap-4">
                      <button className="liquid-glass-discord-btn flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
                        <span>🎮</span> Discord
                      </button>
                    </div>
                    <CodeBlock 
                      id="discord-button-code" 
                      code={`<button className="liquid-glass-discord-btn flex items-center gap-2">
  <DiscordIcon className="w-4 h-4" />
  Discord
</button>
/* Special: Liquid glass with purple hover effects */`} 
                    />
                  </div>

                  <div>
                    <h4 className="mb-4 font-medium">Hero Action Buttons</h4>
                    <div className="mb-4 flex flex-wrap gap-4">
                      <button className="btn-hero-primary">Get Started</button>
                      <button className="btn-hero-secondary">Learn More</button>
                    </div>
                    <CodeBlock 
                      id="hero-button-code" 
                      code={`<button className="btn-hero-primary">Get Started</button>
<button className="btn-hero-secondary">Learn More</button>
/* Hero-specific styling with emphasis and prominence */`} 
                    />
                  </div>

                  <div>
                    <h4 className="mb-4 font-medium">Shadcn/UI Buttons</h4>
                    <div className="mb-4 flex flex-wrap gap-4">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                    </div>
                    <CodeBlock 
                      id="shadcn-button-code" 
                      code={`<Button>Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>`} 
                    />
                  </div>
                </div>
              </div>

              {/* Button States */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">Button States & Interactions</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    <div>
                      <h5 className="mb-2 font-medium">Default</h5>
                      <Button className="w-full">Normal</Button>
                    </div>
                    <div>
                      <h5 className="mb-2 font-medium">Hover</h5>
                      <Button className="w-full hover:bg-accent">Hover</Button>
                    </div>
                    <div>
                      <h5 className="mb-2 font-medium">Active</h5>
                      <Button className="w-full" style={{ transform: 'scale(0.96)' }}>Active</Button>
                    </div>
                    <div>
                      <h5 className="mb-2 font-medium">Disabled</h5>
                      <Button className="w-full" disabled>Disabled</Button>
                    </div>
                  </div>
                  <CodeBlock 
                    id="button-states-code" 
                    code={`/* Button State Behavior */
:hover { transform: translateY(-1px); /* Lift effect */ }
:active { transform: scale(0.96) translateY(0); /* Press effect */ }
:disabled { opacity: 0.3; cursor: not-allowed; /* Disabled state */ }
:focus-visible { outline: 2px solid rgba(0, 122, 255, 0.6); /* Apple focus */ }`} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Spacing Section */}
        <section id="spacing" className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Layout className="h-6 w-6" />
                Spacing & Layout Systems
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Tailwind Scale */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">Tailwind Spacing Scale</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="mb-4 font-medium">Padding Examples</h4>
                      <div className="space-y-3">
                        {[
                          { class: 'p-2', size: '0.5rem (8px)', desc: 'Compact elements' },
                          { class: 'p-4', size: '1rem (16px)', desc: 'Standard padding' },
                          { class: 'p-6', size: '1.5rem (24px)', desc: 'Card content' },
                          { class: 'p-8', size: '2rem (32px)', desc: 'Section padding' },
                          { class: 'p-12', size: '3rem (48px)', desc: 'Large sections' },
                        ].map(({ class: className, size, desc }) => (
                          <div key={className} className="flex items-center gap-4">
                            <div className={`${className} flex h-8 min-w-16 items-center justify-center rounded border border-accent bg-accent/20 text-xs`}>
                              {className}
                            </div>
                            <div>
                              <span className="font-mono text-sm">{size}</span>
                              <span className="ml-2 text-sm text-muted-foreground">{desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-4 font-medium">Margin Examples</h4>
                      <div className="space-y-3">
                        {[
                          { class: 'mb-2', size: '0.5rem (8px)', desc: 'Tight spacing' },
                          { class: 'mb-4', size: '1rem (16px)', desc: 'Standard spacing' },
                          { class: 'mb-6', size: '1.5rem (24px)', desc: 'Section spacing' },
                          { class: 'mb-8', size: '2rem (32px)', desc: 'Component spacing' },
                          { class: 'mb-16', size: '4rem (64px)', desc: 'Page sections' },
                        ].map(({ class: className, size, desc }) => (
                          <div key={className} className="flex items-center gap-4">
                            <div className="flex h-8 w-16 items-center justify-center rounded border border-primary bg-primary/20 text-xs">
                              {className}
                            </div>
                            <div>
                              <span className="font-mono text-sm">{size}</span>
                              <span className="ml-2 text-sm text-muted-foreground">{desc}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Layout Patterns */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">Common Layout Patterns</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-4 font-medium">Container Patterns</h4>
                    <CodeBlock 
                      id="container-code" 
                      code={`/* Standard Container */
<div className="container mx-auto px-4 py-24 max-w-6xl">

/* Cinematic Layout */
<div className="tm-layout-container--cinematic">
  /* max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; */
</div>

/* Section Padding */
<section className="section-padding">
  /* py-20 px-4 sm:px-6 lg:px-8 */
</section>`} 
                    />
                  </div>

                  <div>
                    <h4 className="mb-4 font-medium">Grid Patterns</h4>
                    <CodeBlock 
                      id="grid-code" 
                      code={`/* Responsive Grid */
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

/* Auto-fit Grid */
<div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">

/* Feature Grid */
<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">`} 
                    />
                  </div>

                  <div>
                    <h4 className="mb-4 font-medium">Flex Patterns</h4>
                    <CodeBlock 
                      id="flex-code" 
                      code={`/* Center Content */
<div className="flex items-center justify-center min-h-screen">

/* Space Between */
<div className="flex items-center justify-between">

/* Flex Column with Gap */
<div className="flex flex-col gap-8 lg:gap-10">`} 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Class Naming Section */}
        <section id="naming" className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Code className="h-6 w-6" />
                Class Naming Conventions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* TM Namespace */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">TM Namespace System</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    The Trading Desk uses a custom namespace system prefixed with <code className="rounded bg-muted px-2 py-1">tm-</code> 
                    to organize styles and avoid conflicts with external libraries.
                  </p>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="mb-4 font-medium">UI Components (tm-ui-*)</h4>
                      <CodeBlock 
                        id="ui-naming-code" 
                        code={`/* Button System */
.tm-ui-button              /* Base button foundation */
.tm-ui-button--nav         /* Navigation variant */
.tm-ui-button--regular     /* Regular variant */

/* Usage */
<button className="tm-ui-button tm-ui-button--nav">Navigation</button>`} 
                      />
                    </div>

                    <div>
                      <h4 className="mb-4 font-medium">Layout Components (tm-layout-*)</h4>
                      <CodeBlock 
                        id="layout-naming-code" 
                        code={`/* Layout Structure */
.tm-layout-hero--cinematic      /* Hero section styling */
.tm-layout-container--cinematic /* Container styling */
.tm-layout-nav__links           /* Navigation links */

/* Usage */
<section className="tm-layout-hero--cinematic">`} 
                      />
                    </div>

                    <div>
                      <h4 className="mb-4 font-medium">Theme Components (tm-theme-*)</h4>
                      <CodeBlock 
                        id="theme-naming-code" 
                        code={`/* Color & Theme */
.tm-theme-gradient--brand       /* Brand gradient background */
.tm-theme-text-gradient--brand  /* Brand gradient text */
.tm-apple-3d-text              /* Special 3D text effect */

/* Usage */
<div className="tm-theme-gradient--brand">
<span className="tm-theme-text-gradient--brand">market</span>`} 
                      />
                    </div>

                    <div>
                      <h4 className="mb-4 font-medium">Animation Components (tm-anim-*)</h4>
                      <CodeBlock 
                        id="anim-naming-code" 
                        code={`/* Animations */
.tm-anim-fade--in          /* Fade in animation */
.tm-anim-orb              /* Floating orb animation */

/* Usage */
<div className="tm-anim-fade--in">
<div className="tm-anim-orb">`} 
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* BEM-like Methodology */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">BEM-like Methodology</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    The naming system follows BEM-like principles adapted for the TM namespace:
                  </p>
                  
                  <div className="rounded-lg bg-muted p-4">
                    <code className="text-sm">
                      tm-[category]-[component][--modifier][__element]
                    </code>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-medium">Structure Examples</h4>
                      <div className="space-y-2 font-mono text-sm">
                        <div><span className="text-primary">tm-ui-button</span> - Base component</div>
                        <div><span className="text-accent">tm-ui-button--nav</span> - With modifier</div>
                        <div><span className="text-muted-foreground">tm-layout-nav__links</span> - With element</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-3 font-medium">Categories</h4>
                      <div className="space-y-2 text-sm">
                        <div><code>ui</code> - Interactive components</div>
                        <div><code>layout</code> - Structure and positioning</div>
                        <div><code>theme</code> - Colors and branding</div>
                        <div><code>anim</code> - Animations and effects</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* External Libraries */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">External Library Integration</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 font-medium">Tailwind CSS</h4>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Standard Tailwind utility classes for rapid development
                      </p>
                      <CodeBlock 
                        id="tailwind-naming-code" 
                        code={`/* Tailwind Utilities */
className="flex items-center justify-between"
className="text-lg font-semibold text-primary"
className="grid grid-cols-1 md:grid-cols-3 gap-6"`} 
                      />
                    </div>

                    <div>
                      <h4 className="mb-3 font-medium">Shadcn/UI</h4>
                      <p className="mb-3 text-sm text-muted-foreground">
                        Component library classes preserved as-is
                      </p>
                      <CodeBlock 
                        id="shadcn-naming-code" 
                        code={`/* Shadcn Components */
<Button variant="outline" size="lg">
<Card className="border-0">
<Badge variant="secondary">`} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Components Section */}
        <section id="components" className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Component className="h-6 w-6" />
                Reusable UI Components
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Cards */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">Card Components</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-4 font-medium">Standard Card</h4>
                    <Card className="max-w-md">
                      <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>Standard card content with proper spacing and typography.</p>
                      </CardContent>
                    </Card>
                    <CodeBlock 
                      id="card-code" 
                      code={`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>`} 
                    />
                  </div>

                  <div>
                    <h4 className="mb-4 font-medium">Neon Gradient Card</h4>
                    <NeonGradientCard className="max-w-md">
                      <div className="p-6">
                        <h3 className="mb-2 text-lg font-semibold">Neon Gradient Card</h3>
                        <p>Special card with animated gradient border for emphasis.</p>
                      </div>
                    </NeonGradientCard>
                    <CodeBlock 
                      id="neon-card-code" 
                      code={`<NeonGradientCard>
  <div className="p-6">
    <h3>Neon Gradient Card</h3>
    <p>Special card content</p>
  </div>
</NeonGradientCard>`} 
                    />
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">Badge Components</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-4">
                    <Badge>Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="destructive">Destructive</Badge>
                  </div>
                  <CodeBlock 
                    id="badge-code" 
                    code={`<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Destructive</Badge>`} 
                  />
                </div>
              </div>

              {/* Navigation */}
              <div>
                <h3 className="mb-6 text-xl font-semibold">Navigation Components</h3>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    The Navigation component provides consistent header navigation with mobile responsiveness 
                    and accessibility features.
                  </p>
                  <CodeBlock 
                    id="navigation-code" 
                    code={`import Navigation from '@/components/Navigation';

<Navigation />

/* Features:
- Responsive mobile menu
- Accessibility-first design
- Smart sticky behavior (hides on scroll down, shows on scroll up)
- Liquid glass Discord button integration
- Clean typography hierarchy
*/`} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Usage Guidelines */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle>Usage Guidelines & Best Practices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Do's ✅</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Use the tm- namespace for custom components</li>
                    <li>• Follow the established typography hierarchy</li>
                    <li>• Maintain consistent spacing using Tailwind scale</li>
                    <li>• Use semantic HTML elements for accessibility</li>
                    <li>• Test components across different screen sizes</li>
                    <li>• Document any new patterns added to the system</li>
                  </ul>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-semibold">Don'ts ❌</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Don't create new color variables without documentation</li>
                    <li>• Don't use inline styles unless absolutely necessary</li>
                    <li>• Don't override Tailwind utilities with custom CSS</li>
                    <li>• Don't break the established naming conventions</li>
                    <li>• Don't add animations without performance testing</li>
                    <li>• Don't forget to update this Style Guide for new patterns</li>
                  </ul>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="mb-4 text-lg font-semibold">Updating This Style Guide</h3>
                <p className="text-muted-foreground">
                  This Style Guide should be updated whenever new design patterns, components, or conventions are added 
                  to the system. Regular reviews ensure consistency and help onboard new team members effectively.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default StyleGuide;
