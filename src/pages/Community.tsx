import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
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
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>
        
        <div className="container-cinematic text-center relative z-10">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm bg-blue-500/20 text-blue-300">
            👥 Trading Community
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">
            Join Our Trading{" "}
            <span className="text-gradient-gold">Community</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Connect with thousands of traders, share strategies, and accelerate your learning 
            in our supportive and active community.
          </p>
          
          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="px-8 py-4">
              <MessageCircle className="w-5 h-5 mr-2" />
              Join Discord Community
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="ghost" className="px-8 py-4">
              <Globe className="w-5 h-5 mr-2" />
              Browse Public Forums
            </Button>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="section-padding border-t border-border/30">
        <div className="container-cinematic">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Makes Our <span className="text-gradient-gold">Community</span> Special
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              More than just a discussion forum - it's your trading support network
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityFeatures.map((feature, index) => (
              <Card key={index} className="card-cinematic p-6 text-center">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Tiers */}
      <section className="section-padding bg-secondary/20">
        <div className="container-cinematic">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Community <span className="text-gradient-gold">Access Levels</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Different tiers of access based on your learning journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <Card className="card-cinematic p-6">
              <CardHeader className="text-center pb-4">
                <Badge variant="secondary" className="w-fit mx-auto mb-4">
                  FREE
                </Badge>
                <CardTitle className="text-xl mb-2">Public Community</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Open discussions and basic market insights
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    General trading discussions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Basic market updates
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Community guidelines access
                  </li>
                </ul>
                <Button variant="ghost" fullWidth>
                  Join Free Community
                </Button>
              </CardContent>
            </Card>

            {/* Student Tier */}
            <Card className="card-cinematic p-6 border-primary/50">
              <CardHeader className="text-center pb-4">
                <Badge className="w-fit mx-auto mb-4 bg-primary text-primary-foreground">
                  STUDENT
                </Badge>
                <CardTitle className="text-xl mb-2">Student Community</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Exclusive access for course students
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Private student channels
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Instructor Q&A sessions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Trade review submissions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Course-specific discussions
                  </li>
                </ul>
                <Button  fullWidth>
                  Enroll in Course
                </Button>
              </CardContent>
            </Card>

            {/* Premium Tier */}
            <Card className="card-cinematic p-6">
              <CardHeader className="text-center pb-4">
                <Badge variant="secondary" className="w-fit mx-auto mb-4 bg-yellow-500/20 text-yellow-400">
                  PREMIUM
                </Badge>
                <CardTitle className="text-xl mb-2">VIP Community</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Elite access with direct mentor support
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <ul className="space-y-2 mb-6 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    VIP channels & priority support
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    1-on-1 mentor sessions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Advanced strategy discussions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    Exclusive live sessions
                  </li>
                </ul>
                <Button variant="ghost" fullWidth>
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
          <div className="text-center p-8 bg-muted/20 rounded-lg">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Community Platform Launching Soon!</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're building an amazing community platform with Discord integration, 
              private forums, and exclusive member features. Join our waitlist to be notified when we launch.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>
                Join Waitlist
              </Button>
              <Button variant="ghost">
                Follow Updates
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Community;
