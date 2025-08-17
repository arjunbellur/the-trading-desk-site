import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import SmoothScrollLink from "@/components/SmoothScrollLink";
import ParticleBackground from "@/components/ParticleBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { 
  BookOpen, 
  Star, 
  Quote,
  Clock,
  Play,
  Users,
  Video,
  Award,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Globe,
  Zap
} from "lucide-react";

const Index = () => {
  const rotatingWords = ["Market", "Trade", "insights"];
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* Animated Particle Background */}
      <ParticleBackground />
      
      <div className="relative z-50">
        <Navigation />
      </div>
      
      {/* Hero Section - Magic UI Layout */}
      <section id="home" className="tm-layout-hero relative pt-32 pb-24 overflow-hidden z-40">
        {/* Transparent background to show particles */}
        <div className="tm-layout-hero__background absolute inset-0 bg-transparent" />
        
        <div className="tm-layout-container max-w-6xl mx-auto px-6 text-center relative z-50">
          <div className="tm-layout-hero__content max-w-4xl mx-auto">
            {/* Beta pill */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="tm-layout-hero__badge mb-8"
            >
              <span className="tm-ui-badge tm-ui-badge--glass beta-pill">Welcome to the beta version!</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="tm-layout-hero__title mb-6 text-white"
            >
              <div className="tm-layout-hero__title-container flex flex-col items-center">
                <span>Master your</span>
                <span className="tm-layout-hero__rotating-word inline-block relative">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={rotatingWords[wordIndex]}
                      initial={{ opacity: 0, y: -30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="tm-theme-text-gradient--brand"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </div>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="tm-layout-hero__description text-lead text-white/70 mb-12 max-w-xl mx-auto"
            >
              Professional education, live mentorship, and a community built for serious traders.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="tm-layout-hero__actions mb-16"
            >
              <Button variant="regular">
                Get Started for free
              </Button>
            </motion.div>

            {/* Hero Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="tm-layout-hero__image relative"
            >
              <div className="tm-ui-card tm-ui-card--glass aspect-video rounded-2xl border bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">📈</span>
                  </div>
                  <p className="text-muted-foreground">Trading Dashboard Preview</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="tm-layout-section py-24 border-t border-border/30 relative z-40">
        <div className="tm-layout-container max-w-6xl mx-auto px-6">
          <div className="text-center">
            <p className="tm-ui-text--small text-muted-foreground font-semibold tracking-wide uppercase mb-8">
              TRUSTED BY TEAMS FROM AROUND THE WORLD
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center opacity-60">
              {/* Company logos - using placeholder brands */}
              <div className="tm-ui-card tm-ui-card--glass h-16 flex items-center justify-center">
                <span className="font-bold text-lg">Goldman</span>
              </div>
              <div className="tm-ui-card tm-ui-card--glass h-16 flex items-center justify-center">
                <span className="font-bold text-lg">Citadel</span>
              </div>
              <div className="tm-ui-card tm-ui-card--glass h-16 flex items-center justify-center">
                <span className="font-bold text-lg">JP Morgan</span>
              </div>
              <div className="tm-ui-card tm-ui-card--glass h-16 flex items-center justify-center">
                <span className="font-bold text-lg">BlackRock</span>
              </div>
              <div className="tm-ui-card tm-ui-card--glass h-16 flex items-center justify-center">
                <span className="font-bold text-lg">Bridgewater</span>
              </div>
              <div className="tm-ui-card tm-ui-card--glass h-16 flex items-center justify-center">
                <span className="font-bold text-lg">Two Sigma</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transform Your Trading Section */}
      <section className="tm-layout-section py-24 bg-transparent relative z-40">
        <div className="tm-layout-container max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h1 className="text-white mb-4">
              Transform Your{" "}
              <span className="tm-theme-text-gradient--brand">Trading</span>
            </h1>
          </div>

          {/* Three Cards Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Coaching Card */}
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 relative">
                {/* Background Image - Professional mentor/coaching */}
                <img 
                  src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1426&q=80" 
                  alt="Professional coaching session" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 to-black/70"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  {/* Icon Area */}
                  <div className="flex justify-center items-center h-32">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <div className="text-center">
                    <h3 className="text-2xl font-thin text-white tracking-wide">Coaching</h3>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Courses Card */}
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-red-800 to-red-900 relative">
                {/* Background Image - Trading charts and analysis */}
                <img 
                  src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
                  alt="Trading charts and financial analysis" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/40 to-black/80"></div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  {/* Icon Area */}
                  <div className="flex justify-center items-center h-32">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <div className="text-center">
                    <h3 className="text-2xl font-thin text-white tracking-wide">Courses</h3>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            {/* Community Card */}
            <div className="relative group cursor-pointer">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-teal-800 to-slate-900 relative">
                {/* Background Image - Team collaboration/community */}
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80" 
                  alt="Team collaboration and community" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-teal-900/40 to-black/70">
                  {/* Mock chat interface elements overlay */}
                  <div className="absolute top-4 left-4 right-4 space-y-2 opacity-20">
                    <div className="h-2 bg-white/20 rounded w-3/4"></div>
                    <div className="h-2 bg-white/15 rounded w-1/2"></div>
                    <div className="h-2 bg-white/10 rounded w-2/3"></div>
                  </div>
                  <div className="absolute bottom-16 left-4 right-4 space-y-2 opacity-15">
                    <div className="h-2 bg-white/15 rounded w-1/2 ml-auto"></div>
                    <div className="h-2 bg-white/20 rounded w-3/4 ml-auto"></div>
                  </div>
                </div>
                
                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-8">
                  {/* Icon Area */}
                  <div className="flex justify-center items-center h-32">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <div className="text-center">
                    <h3 className="text-2xl font-thin text-white tracking-wide">Community</h3>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="tm-layout-section py-24 relative z-40">
        <div className="tm-layout-container max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="mb-4">Simple pricing for everyone.</h2>
            <p className="text-lead text-muted max-w-3xl mx-auto">
              Choose an <strong>affordable plan</strong> that's packed with the best features for mastering trading, 
              building skills, and achieving consistent profits.
            </p>
          </div>

          {/* Pricing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="tm-ui-badge tm-ui-badge--glass flex items-center gap-4 p-1">
              <span className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium">Annual</span>
              <span className="px-4 py-2 text-muted-foreground">2 MONTHS FREE ✨</span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Basic Plan */}
            <div className="tm-ui-card tm-ui-card--glass p-8">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Basic</h3>
                <p className="text-sm text-muted-foreground mb-4">Perfect for beginners starting their trading journey</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">$29</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
              </div>
              <Button variant="regular" fullWidth className="mb-6">Subscribe</Button>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Basic trading strategies
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Community support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  5 courses access
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Basic market analysis
                </li>
              </ul>
            </div>

            {/* Premium Plan */}
            <div className="tm-ui-card tm-ui-card--glass p-8 border-primary">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Premium</h3>
                <p className="text-sm text-muted-foreground mb-4">Advanced features for serious traders</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">$79</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
              </div>
              <Button variant="regular" fullWidth className="mb-6">Subscribe</Button>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Advanced trading strategies
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Priority support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Unlimited courses
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Live trading sessions
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="tm-ui-card tm-ui-card--glass p-8">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Pro</h3>
                <p className="text-sm text-muted-foreground mb-4">Professional features for advanced traders</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">$149</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
              </div>
              <Button variant="regular" fullWidth className="mb-6">Subscribe</Button>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Expert trading strategies
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  24/7 dedicated support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Unlimited access
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  1-on-1 mentorship
                </li>
              </ul>
            </div>

            {/* Elite Plan */}
            <div className="tm-ui-card tm-ui-card--glass p-8">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Elite</h3>
                <p className="text-sm text-muted-foreground mb-4">Ultimate package for trading mastery</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">$299</span>
                  <span className="text-muted-foreground">/ month</span>
                </div>
              </div>
              <Button variant="regular" fullWidth className="mb-6">Subscribe</Button>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Custom trading strategies
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  White-glove support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Unlimited everything
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  Personal trading coach
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="tm-layout-section py-24 relative z-40">
        <div className="tm-layout-container max-w-4xl mx-auto px-6 text-center">
          <h2 className="mb-6">
            Stop wasting time on guesswork.
          </h2>
          <p className="text-lead text-muted mb-8">
            Start your 7-day free trial. No credit card required.
          </p>
          <Button variant="regular" className="text-lg font-semibold">
            Get Started
          </Button>
        </div>
      </section>

      {/* Keep existing sections but update to use new layout classes */}
      <section id="value-proposition" className="tm-layout-section py-24 border-t border-border/30 relative z-40">
        <div className="tm-layout-container max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Why <span className="text-gradient-gold">The Trading Desk</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Four pillars that separate professionals from amateurs
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Award,
                title: "Expert-Led Masterclasses",
                description: "Learn from traders who've generated millions in profits across multiple market cycles."
              },
              {
                icon: Video,
                title: "Live Trading Sessions",
                description: "Watch real trades happen in real-time. See decision-making, risk management, and execution."
              },
              {
                icon: DollarSign,
                title: "Revenue-Focused Strategies",
                description: "Every technique we teach is designed to generate consistent, measurable returns."
              },
              {
                icon: Users,
                title: "Community + Peer Learning",
                description: "Connect with serious traders. Share insights, strategies, and accountability."
              }
            ].map((pillar, index) => (
              <motion.div
                key={index}
                whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="rounded-2xl shadow-lg hover:shadow-xl transition-all card-gradient-bg p-6 text-center hover:scale-105 border border-white/10">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <pillar.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold mb-3">{pillar.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emotional Showcase (Cinematic Grid) */}
      <section className="section-padding border-t border-border/30 relative z-40">
        <div className="container-cinematic">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Text Left */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
                Trading is an <span className="text-gradient-brand">Art</span> and a <span className="text-gradient-brand">Discipline</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 max-w-xl">
                We teach systems that withstand market cycles. Real techniques. Real accountability. Real results.
              </p>
              <div className="flex gap-4">
                <SmoothScrollLink href="#courses">
                  <Button variant="fx" className="btn-ios--md">Explore Courses</Button>
                </SmoothScrollLink>
                <SmoothScrollLink href="#livestream">
                  <Button variant="fx-ghost" className="btn-ios--md">Watch Live</Button>
                </SmoothScrollLink>
              </div>
            </motion.div>

            {/* Image Grid Right */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              transition={{ staggerChildren: 0.25 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1518186233392-c232efbf2373?auto=format&fit=crop&w=1200&q=80",
              ].map((src, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                  <div className={`relative overflow-hidden rounded-2xl ${i === 0 ? 'row-span-2 h-[420px]' : 'h-[200px]'} bg-muted/20`}>
                    <img src={src} alt="Cinematic" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="section-padding smooth-scroll-target relative z-40">
        <div className="container-cinematic">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Featured <span className="text-gradient-gold">Courses</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From beginner fundamentals to advanced strategies. 
              Build skills that generate real profits.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Market Mastery Foundations",
                description: "Complete beginner's guide to profitable trading. Risk management, psychology, and proven strategies.",
                price: "$297",
                originalPrice: "$497",
                duration: "6 weeks",
                lessons: "24 video lessons",
                students: "3,247",
                rating: 4.9,
                level: "Beginner",
                features: ["Live Q&A sessions", "Trading simulator access", "Community access", "Certificate of completion"],
                thumbnail: "gradient-from-blue-600-to-purple-600"
              },
              {
                title: "Advanced Options Strategies",
                description: "Master complex options plays. Income generation, hedging, and advanced Greeks analysis.",
                price: "$597",
                originalPrice: "$897",
                duration: "8 weeks", 
                lessons: "32 video lessons",
                students: "1,893",
                rating: 4.8,
                level: "Advanced",
                features: ["Live trading sessions", "1-on-1 mentorship", "Strategy backtesting", "Lifetime updates"],
                thumbnail: "gradient-from-green-600-to-emerald-600"
              },
              {
                title: "Day Trading Intensive",
                description: "High-frequency strategies for active traders. Scalping, momentum, and intraday techniques.",
                price: "$497",
                originalPrice: "$697",
                duration: "10 weeks",
                lessons: "40 video lessons", 
                students: "2,156",
                rating: 4.9,
                level: "Intermediate",
                features: ["Daily market analysis", "Live trading room", "Discord community", "Mobile app access"],
                thumbnail: "gradient-from-orange-600-to-red-600"
              }
            ].map((course, index) => (
              <Card key={index} className="card-cinematic hover:scale-105 transition-all duration-500 group overflow-hidden">
                {/* Course Thumbnail */}
                <div className={`h-40 bg-${course.thumbnail} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">
                      {course.level}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex items-center gap-1 text-white">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium">{course.rating}</span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm opacity-90">{course.students} students</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {course.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {course.lessons}
                    </div>
                  </div>
                  
                  <div className="space-y-1 mb-4">
                    {course.features.slice(0, 2).map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-foreground">{course.price}</span>
                      <span className="text-xs text-muted-foreground line-through ml-2">
                        {course.originalPrice}
                      </span>
                    </div>
                  </div>
                  
                  <Button variant="fx" className="w-full rounded-sm py-3 text-sm font-semibold">
                    ENROLL NOW
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Live Trading / Cinematic Teaser */}
      <section id="livestream" className="relative py-20 smooth-scroll-target overflow-hidden z-40">
        {/* Dark cinematic background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/20 to-background">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
          </div>
        </div>
        
        <div className="container-cinematic relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
              Learn in <span className="text-gradient-gold">Real Time</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Join live trading sessions. Watch expert decision-making, 
              risk management, and execution in real market conditions.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
                        {/* Video Preview Area */}
            <div className="relative card-neo card-neo--elevated overflow-hidden mb-8 group cursor-pointer">
              <div className="aspect-video bg-gradient-to-br from-black/20 to-black/10 flex items-center justify-center">
      <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/30 transition-colors">
                    <Play className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-base font-semibold mb-1">Live Session Preview</p>
                  <p className="text-sm text-muted-foreground">Watch our latest trading session</p>
                </div>
              </div>
              
              {/* Live indicator */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-white bg-black/60 px-2 py-1 rounded">LIVE</span>
              </div>
              
              {/* Viewer count */}
              <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded text-sm">
                <Users className="w-4 h-4 inline mr-1" />
                247 watching
              </div>
            </div>
            
            {/* Session info and CTAs */}
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-bold mb-3">Next Live Session</h3>
                <p className="text-base text-muted-foreground mb-4">
                  "Advanced Options Income Strategies" 
                  <br />
                  <span className="text-sm">Wednesday, December 18th • 2:00 PM EST</span>
                </p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-sm">Real-time trade execution</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm">Live Q&A with expert traders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="text-sm">Market analysis and insights</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button variant="fx" className="w-full text-base font-semibold btn-ios--lg">
                  <Play className="w-4 h-4 mr-2" />
                  JOIN LIVE SESSION
                </Button>
                <Button variant="fx-ghost" className="w-full py-4 text-base btn-ios--lg">
                  SEE LIVE SCHEDULE
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Free for all students • Premium features for members
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Enrollment */}
      <section className="section-padding border-t border-border/30 relative z-40">
        <div className="container-cinematic">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Path</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Flexible plans for every trader. Upgrade anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Starter', price: '$29/mo', features: ['Community Access', 'Weekly Insights', 'Select Previews'], featured: false },
              { name: 'Student', price: '$79/mo', features: ['All Courses', 'Live Sessions', 'Downloads'], featured: true },
              { name: 'Pro', price: '$149/mo', features: ['1:1 Mentorship', 'VIP Community', 'Advanced Strategies'], featured: false },
            ].map((tier, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Card className={`glass-card rounded-2xl p-6 ${tier.featured ? 'scale-105 border-white/30' : ''}`}>
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl mb-2">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold">{tier.price}</div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 mb-6 text-sm">
                      {tier.features.map((f, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button variant="fx" className="w-full btn-ios--lg">Get Started</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Section */}
      <section className="section-padding border-t border-border/30 relative z-40">
        <div className="container-cinematic">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} className="flex justify-center">
              <div className="relative">
                <img src="https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&w=800&q=80" alt="Lead Instructor" className="w-56 h-56 rounded-full object-cover" />
                <div className="absolute inset-0 rounded-full ring-4 ring-white/10" />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h3 className="text-3xl font-bold mb-4">Learn from Proven Professionals</h3>
              <p className="text-muted-foreground mb-4">Our instructors are seasoned traders with institutional and prop experience. They teach exactly how they trade—no fluff.</p>
              <div className="grid sm:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold">15+ yrs</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Experience</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">$50M+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Profits</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">10K+</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">Students</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="section-padding border-t border-border/50 smooth-scroll-target relative z-40">
        <div className="container-cinematic">
          <div className="text-center mb-20">
            <h2 className="aod-heading text-aod-title">
              What Our <span className="text-gradient-gold">Students Say</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 spacing-lg">
            {[
              {
                name: "Sarah Johnson",
                role: "Day Trader",
                content: "The Trading Desk transformed my approach to trading. The live sessions are incredibly valuable.",
                rating: 5
              },
              {
                name: "Michael Chen", 
                role: "Options Trader",
                content: "The advanced course gave me the confidence to trade complex strategies profitably.",
                rating: 5
              },
              {
                name: "David Rodriguez",
                role: "Swing Trader", 
                content: "Amazing community and expert instructors. My portfolio has grown 300% this year.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="card-cinematic p-6">
                <CardContent className="p-0">
                  <Quote className="w-8 h-8 text-foreground mb-4" />
                  <p className="text-muted-foreground mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-foreground fill-current" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer with Gradient Accent */}
      <footer className="bg-black border-t border-border/20">
        <div className="h-1 w-full gradient-brand" />
        <div className="container-cinematic py-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            {/* Footer Logo */}
            <div className="flex items-center gap-3">
              <img 
                src="/logo.svg" 
                alt="The Trading Desk Logo" 
                className="h-6 w-auto"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <span className="text-lg font-semibold text-white/90">The Trading Desk</span>
            </div>
            
            {/* Footer Content */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm text-muted-foreground">
              <div>© {new Date().getFullYear()} The Trading Desk. All rights reserved.</div>
              <div className="flex gap-6">
                <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="#" className="hover:text-foreground transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
