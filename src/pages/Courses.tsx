import Navigation from "@/components/Navigation";
import { CourseGrid } from "@/components/CourseGrid";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NeonGradientCard, ShineBorder } from "@/components/magicui";
import { BookOpen, Play, Users } from "lucide-react";
import { mockCourses } from "@/mock/content";
import { BlurInView } from "@/components/BlurInView";
// TODO: Replace mock data with Sanity GROQ queries once schema is approved

const Courses = () => {
  // TODO: Replace with actual Sanity query: getAllCourses()
  const courses = mockCourses;

  return (
    <div className="tm-layout-page min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="tm-layout-hero tm-layout-hero--page relative pt-24 pb-16 overflow-hidden">
        <div className="tm-layout-hero__background absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90">
          <div className="tm-layout-hero__decorations absolute inset-0 opacity-20">
            <div className="tm-anim-orb absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="tm-anim-orb absolute bottom-1/3 right-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>
        </div>
        
        <div className="tm-layout-container tm-layout-container--cinematic text-center relative z-10">
          <Badge variant="secondary" className="tm-ui-badge tm-ui-badge--glass mb-6 px-4 py-2 tm-ui-text--small bg-secondary/50 backdrop-blur-sm">
            📚 Comprehensive Trading Education
          </Badge>
          
          <h1 className="mb-8">
            Master <span className="text-gradient-gold">Trading</span> with Expert-Led Courses
          </h1>
          <p className="text-lead text-muted mb-12 max-w-4xl mx-auto">
            From beginner fundamentals to advanced strategies. Learn from industry professionals 
            and join a community of successful traders.
          </p>
          
          {/* Course Stats */}
          <BlurInView delay={0.2}>
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto text-center mb-16">
              <div>
                <div className="text-3xl font-bold text-foreground mb-2">{courses.length}+</div>
                <h6>Expert Courses</h6>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-2">15K+</div>
                <h6>Active Students</h6>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground mb-2">4.8</div>
                <h6>Average Rating</h6>
              </div>
            </div>
          </BlurInView>
        </div>
      </section>

      {/* Courses Grid */}
      <BlurInView delay={0.3}>
        <CourseGrid 
          courses={courses} 
          title=""
          description=""
          className="border-t border-border/30"
        />
      </BlurInView>

      {/* Features Section */}
      <section className="section-padding bg-secondary/20">
        <div className="container-cinematic">
          <BlurInView>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose <span className="text-gradient-gold">The Trading Desk</span>
              </h2>
            </div>
          </BlurInView>
          
          <div className="grid md:grid-cols-3 gap-8">
            <BlurInView delay={0.1}>
              <Card className="card-cinematic p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
                <p className="text-muted-foreground">
                  Learn from professional traders with decades of market experience
                </p>
              </Card>
            </BlurInView>
            
            <BlurInView delay={0.2}>
              <Card className="card-cinematic p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Live Sessions</h3>
                <p className="text-muted-foreground">
                  Join live trading sessions and Q&A with instructors
                </p>
              </Card>
            </BlurInView>
            
            <BlurInView delay={0.3}>
              <Card className="card-cinematic p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Access</h3>
                <p className="text-muted-foreground">
                  Connect with fellow traders and share strategies
                </p>
              </Card>
            </BlurInView>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;