import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Trophy, TrendingUp, Shield } from "lucide-react";

const CommunitySection = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Expert Chat",
      description: "24/7 access to professional traders and market analysis"
    },
    {
      icon: Trophy,
      title: "Leaderboards",
      description: "Compete with fellow traders and track your progress"
    },
    {
      icon: TrendingUp,
      title: "Trade Signals",
      description: "Real-time market opportunities and entry points"
    },
    {
      icon: Shield,
      title: "Risk Management",
      description: "Advanced tools to protect and grow your portfolio"
    }
  ];

  return (
    <section id="community" className="section-padding">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-card/20 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50 mb-6">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">
                Coming Soon
              </span>
            </div>

            <h2 className="heading-1 text-foreground mb-6">
              Join the Inner Circle
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Connect with elite traders, share strategies, and access exclusive market insights 
              in our private Discord community.
            </p>

            <div className="space-y-6 mb-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg">
                Get Early Access
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <Card className="bg-gradient-card border-border/50 shadow-luxury">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Trade Masters Discord</h3>
                  <p className="text-muted-foreground">Private community launching soon</p>
                </div>

                <div className="space-y-4">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">Active Members</span>
                      <span className="text-primary font-bold">1,247</span>
                    </div>
                    <div className="w-full bg-background rounded-full h-2">
                      <div className="bg-gradient-accent h-2 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">Daily Signals</span>
                      <span className="text-success font-bold">15-20</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Average per day</div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">Success Rate</span>
                      <span className="text-primary font-bold">94.2%</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Last 30 days</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/10 rounded-full blur-xl animate-pulse delay-1000" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;