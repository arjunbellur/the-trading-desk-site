import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NeonGradientCard, ShineBorder } from "@/components/magicui";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { 
  Users, 
  MessageCircle, 
  BookOpen, 
  TrendingUp, 
  Award, 
  ExternalLink,
  Zap,
  Target,
  Globe
} from "lucide-react";
// TODO: Replace with Sanity CMS integration once schema is approved

const Community = () => {
  const communityFeatures = [
    {
      icon: MessageCircle,
      title: "Live Discussions",
      description: "Real-time market analysis and strategy discussions with fellow traders"
    },
    {
      icon: BookOpen,
      title: "Shared Learning",
      description: "Access to educational resources, trade reviews, and strategy breakdowns"
    },
    {
      icon: Award,
      title: "Expert Mentorship",
      description: "Direct access to professional traders and personalized guidance"
    },
    {
      icon: TrendingUp,
      title: "Trade Sharing",
      description: "Share your trades, get feedback, and learn from others' experiences"
    },
    {
      icon: Zap,
      title: "Real-time Alerts", 
      description: "Market alerts, breaking news, and trading opportunities"
    },
    {
      icon: Target,
      title: "Accountability",
      description: "Set goals, track progress, and stay motivated with peer support"
    }
  ];

  const communityStats = [
    { label: "Active Members", value: "10,000+" },
    { label: "Messages Daily", value: "2,500+" },
    { label: "Expert Mentors", value: "25+" },
    { label: "Success Stories", value: "500+" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16 pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-blue-500/10 blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 h-96 w-96 animate-pulse rounded-full bg-purple-500/5 blur-3xl delay-1000"></div>
          </div>
        </div>
        
        <div className="container-cinematic relative z-10 text-center">
          <Badge variant="secondary" className="mb-6 bg-blue-500/20 px-4 py-2 text-sm text-blue-300">
            👥 Trading Community
          </Badge>
          
          <h1 className="mb-8 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Join Our Trading{" "}
            <span className="text-gradient-gold">Community</span>
          </h1>
          
          <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-muted-foreground">
            Connect with thousands of traders, share strategies, and accelerate your learning 
            in our supportive and active community.
          </p>
          
          {/* Community Stats */}
          <div className="mx-auto mb-16 grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-1 text-2xl font-bold text-foreground md:text-3xl">{stat.value}</div>
                <div className="text-sm uppercase tracking-wide text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Primary CTAs */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button className="px-8 py-4">
              <MessageCircle className="mr-2 h-5 w-5" />
              Join Discord
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="regular" className="px-8 py-4">
              <Globe className="mr-2 h-5 w-5" />
              Browse Forums
            </Button>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="section-padding border-t border-border/30">
        <div className="container-cinematic">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              What Makes Our <span className="text-gradient-gold">Community</span> Special
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              More than just a discussion forum - it's your trading support network
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {communityFeatures.map((feature, index) => (
              <Card key={index} className="card-cinematic p-6 text-center">
                <CardContent className="p-0">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-3 text-lg font-bold">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Tiers */}
      <section className="section-padding bg-secondary/20">
        <div className="container-cinematic">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Community <span className="text-gradient-gold">Access Levels</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Different tiers of access based on your learning journey
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Free Tier */}
            <Card className="card-cinematic p-6">
              <CardHeader className="pb-4 text-center">
                <Badge variant="secondary" className="mx-auto mb-4 w-fit">
                  FREE
                </Badge>
                <CardTitle className="mb-2 text-xl">Public Community</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Open discussions and basic market insights
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="mb-6 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    General trading discussions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Basic market updates
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Community guidelines access
                  </li>
                </ul>
                <Button variant="regular" fullWidth>
                  Join Free
                </Button>
              </CardContent>
            </Card>

            {/* Student Tier */}
            <Card className="card-cinematic border-primary/50 p-6">
              <CardHeader className="pb-4 text-center">
                <Badge className="mx-auto mb-4 w-fit bg-primary text-primary-foreground">
                  STUDENT
                </Badge>
                <CardTitle className="mb-2 text-xl">Student Community</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Exclusive access for course students
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="mb-6 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Private student channels
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Instructor Q&A sessions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Trade review submissions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Course-specific discussions
                  </li>
                </ul>
                <LiquidGlassButton className="w-full">
                  Start Now
                </LiquidGlassButton>
              </CardContent>
            </Card>

            {/* Premium Tier */}
            <Card className="card-cinematic p-6">
              <CardHeader className="pb-4 text-center">
                <Badge variant="secondary" className="mx-auto mb-4 w-fit bg-yellow-500/20 text-yellow-400">
                  PREMIUM
                </Badge>
                <CardTitle className="mb-2 text-xl">VIP Community</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Elite access with direct mentor support
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="mb-6 space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    VIP channels & priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    1-on-1 mentor sessions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Advanced strategy discussions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary"></div>
                    Exclusive live sessions
                  </li>
                </ul>
                <Button variant="regular" fullWidth>
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="section-padding">
        <div className="container-cinematic">
          <div className="rounded-lg bg-muted/20 p-8 text-center">
            <Users className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h3 className="mb-4 text-2xl font-bold">Community Platform Launching Soon!</h3>
            <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
              We're building an amazing community platform with Discord integration, 
              private forums, and exclusive member features. Join our waitlist to be notified when we launch.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button>
                Join Waitlist
              </Button>
              <Button variant="regular">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Community;
