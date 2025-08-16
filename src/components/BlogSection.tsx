import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const BlogSection = () => {
  const articles = [
    {
      id: 1,
      title: "Market Analysis: Q4 Trading Outlook",
      excerpt: "Deep dive into market trends and opportunities for the final quarter. Essential reading for serious traders.",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      category: "Analysis",
      featured: true,
    },
    {
      id: 2,
      title: "Risk Management Strategies",
      excerpt: "Protecting your capital while maximizing returns. Learn from professional risk management techniques.",
      date: "Dec 12, 2024",
      readTime: "8 min read",
      category: "Education",
    },
    {
      id: 3,
      title: "Live Trading Session Recap",
      excerpt: "Key takeaways from our latest live trading session, including successful trades and market insights.",
      date: "Dec 10, 2024",
      readTime: "3 min read",
      category: "Recap",
    },
  ];

  return (
    <section id="blog" className="section-padding bg-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-1 text-foreground mb-6">
            Latest Insights
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay ahead of the markets with expert analysis and trading insights
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {articles.map((article) => (
            <Card 
              key={article.id} 
              className={`group relative overflow-hidden bg-gradient-card border-border/50 hover:shadow-luxury transition-all duration-300 hover:scale-105 ${
                article.featured ? 'lg:col-span-2 lg:row-span-1' : ''
              }`}
            >
              {article.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                </div>
              )}

              <CardContent className="p-6">
                {/* Category & Meta */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-secondary/50 text-secondary-foreground px-2 py-1 rounded text-xs font-medium">
                    {article.category}
                  </span>
                  <div className="flex items-center text-xs text-muted-foreground space-x-3">
                    <span className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      {article.date}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className={`font-bold text-foreground mb-3 group-hover:text-primary transition-colors ${
                  article.featured ? 'text-2xl' : 'text-xl'
                }`}>
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Read More Link */}
                <Button variant="ghost" className="p-0 h-auto group">
                  <span className="mr-2">Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;