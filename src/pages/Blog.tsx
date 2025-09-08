import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NeonGradientCard, ShineBorder } from "@/components/magicui";
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";
// TODO: Replace with Sanity CMS integration once schema is approved

const Blog = () => {
  // TODO: Replace with actual Sanity query: getBlogPosts()
  const placeholderPosts = [
    {
      id: 1,
      title: "Market Analysis: Q4 2024 Trading Opportunities",
      excerpt: "Discover key market trends and trading opportunities as we head into the final quarter of 2024.",
      publishedAt: "2024-12-15",
      readTime: "5 min read",
      category: "Market Analysis",
      author: "John Martinez"
    },
    {
      id: 2,
      title: "Advanced Options Strategies for Income Generation",
      excerpt: "Learn how to generate consistent income using covered calls, cash-secured puts, and other strategies.",
      publishedAt: "2024-12-12",
      readTime: "8 min read", 
      category: "Strategy",
      author: "Sarah Chen"
    },
    {
      id: 3,
      title: "Platform Update: New Live Trading Features",
      excerpt: "Exciting new features added to enhance your live trading experience and community interaction.",
      publishedAt: "2024-12-10",
      readTime: "3 min read",
      category: "Platform Updates",
      author: "The Trading Desk Team"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pb-16 pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-primary/10 blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 h-96 w-96 animate-pulse rounded-full bg-accent/5 blur-3xl delay-1000"></div>
          </div>
        </div>
        
        <div className="container-cinematic relative z-10 text-center">
          <Badge variant="secondary" className="mb-6 bg-secondary/50 px-4 py-2 text-sm backdrop-blur-sm">
            📰 Trading Insights & Updates
          </Badge>
          
          <h1 className="mb-8 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Trading <span className="text-gradient-gold">Insights</span> & Market Analysis
          </h1>
          
          <p className="mx-auto mb-12 max-w-4xl text-xl leading-relaxed text-muted-foreground">
            Stay ahead of the markets with expert analysis, trading strategies, 
            and platform updates from our team of professional traders.
          </p>
        </div>
      </section>

      {/* Blog Content - Placeholder */}
      <section className="section-padding border-t border-border/30">
        <div className="container-cinematic">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {placeholderPosts.map((post, index) => (
              <div>
                <Card className="card-cinematic transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="mb-4 flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  
                  <CardTitle className="mb-3 text-xl leading-tight">
                    {post.title}
                  </CardTitle>
                  
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <span>By {post.author}</span>
                  </div>
                  
                  <Button variant="regular" className="w-full text-sm">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
              </div>
            ))}
          </div>
          
          {/* Coming Soon Notice */}
          <div>
            <div className="mt-16 rounded-lg bg-muted/20 p-8 text-center">
              <TrendingUp className="mx-auto mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-xl font-bold">Blog Coming Soon!</h3>
            <p className="mx-auto mb-6 max-w-2xl text-muted-foreground">
              We're preparing comprehensive market analysis, trading strategies, and educational content. 
              Our blog will feature insights from expert traders and timely market commentary.
            </p>
            <Button variant="regular">
              Get Notified
            </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Blog;
