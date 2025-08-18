import Navigation from "@/components/Navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NeonGradientCard, ShineBorder } from "@/components/magicui";
import { Calendar, Clock, ArrowRight, TrendingUp } from "lucide-react";
import { BlurInView } from "@/components/BlurInView";
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
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>
        
        <div className="container-cinematic text-center relative z-10">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm bg-secondary/50 backdrop-blur-sm">
            📰 Trading Insights & Updates
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">
            Trading <span className="text-gradient-gold">Insights</span> & Market Analysis
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
            Stay ahead of the markets with expert analysis, trading strategies, 
            and platform updates from our team of professional traders.
          </p>
        </div>
      </section>

      {/* Blog Content - Placeholder */}
      <section className="section-padding border-t border-border/30">
        <div className="container-cinematic">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholderPosts.map((post, index) => (
              <BlurInView key={post.id} delay={index * 0.1}>
                <Card className="card-cinematic hover:scale-105 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  
                  <CardTitle className="text-xl mb-3 leading-tight">
                    {post.title}
                  </CardTitle>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <span>By {post.author}</span>
                  </div>
                  
                  <Button variant="regular" className="w-full text-sm">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
              </BlurInView>
            ))}
          </div>
          
          {/* Coming Soon Notice */}
          <BlurInView delay={0.4}>
            <div className="text-center mt-16 p-8 bg-muted/20 rounded-lg">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Blog Coming Soon!</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              We're preparing comprehensive market analysis, trading strategies, and educational content. 
              Our blog will feature insights from expert traders and timely market commentary.
            </p>
            <Button variant="regular">
              Get Notified When We Launch
            </Button>
            </div>
          </BlurInView>
        </div>
      </section>
    </div>
  );
};

export default Blog;
