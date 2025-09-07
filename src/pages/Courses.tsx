import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { CourseGrid } from "@/components/CourseGrid";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NeonGradientCard, ShineBorder } from "@/components/magicui";
import { BookOpen, Play, Users } from "lucide-react";
import { mockCourses } from "@/mock/content";
// TODO: Replace mock data with Sanity GROQ queries once schema is approved

const Courses = () => {
  // TODO: Replace with actual Sanity query: getAllCourses()
  const courses = mockCourses;

  return (
    <div className="tm-layout-page min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Hero Section */}
      <section className="tm-layout-hero tm-layout-hero--page relative overflow-hidden pb-16 pt-24">
        <div className="tm-layout-hero__background absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background/90">
          <div className="tm-layout-hero__decorations absolute inset-0 opacity-20">
            <div className="tm-anim-orb absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-primary/10 blur-3xl"></div>
            <div className="tm-anim-orb absolute bottom-1/3 right-1/3 h-96 w-96 animate-pulse rounded-full bg-accent/5 blur-3xl delay-1000"></div>
          </div>
        </div>
        
        <div className="tm-layout-container tm-layout-container--cinematic relative z-10 text-center">
          <Badge variant="secondary" className="tm-ui-badge tm-ui-badge--glass tm-ui-text--small mb-6 bg-secondary/50 px-4 py-2 backdrop-blur-sm">
            📚 Comprehensive Trading Education
          </Badge>
          
          <h1 className="mb-8">
            Master <span className="text-gradient-gold">Trading</span> with Expert-Led Courses
          </h1>
          <p className="text-lead mx-auto mb-12 max-w-4xl text-muted">
            From beginner fundamentals to advanced strategies. Learn from industry professionals 
            and join a community of successful traders.
          </p>
          
          {/* Course Stats */}
          <div>
            <div className="mx-auto mb-16 grid max-w-3xl grid-cols-3 gap-8 text-center">
              <div>
                <div className="mb-2 text-3xl font-bold text-foreground">{courses.length}+</div>
                <h6>Expert Courses</h6>
              </div>
              <div>
                <div className="mb-2 text-3xl font-bold text-foreground">15K+</div>
                <h6>Active Students</h6>
              </div>
              <div>
                <div className="mb-2 text-3xl font-bold text-foreground">4.8</div>
                <h6>Average Rating</h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <div>
        <CourseGrid 
          courses={courses} 
          title=""
          description=""
          className="border-t border-border/30"
        />
      </div>

      {/* Features Section */}
      <section className="section-padding bg-secondary/20">
        <div className="container-cinematic">
          <div>
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">
                Why Choose <span className="text-gradient-gold">The Trading Desk</span>
              </h2>
            </div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <Card className="card-cinematic p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Expert Instructors</h3>
                <p className="text-muted-foreground">
                  Learn from professional traders with decades of market experience
                </p>
              </Card>
            </div>
            
            <div>
              <Card className="card-cinematic p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Live Sessions</h3>
                <p className="text-muted-foreground">
                  Join live trading sessions and Q&A with instructors
                </p>
              </Card>
            </div>
            
            <div>
              <Card className="card-cinematic p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-bold">Community Access</h3>
                <p className="text-muted-foreground">
                  Connect with fellow traders and share strategies
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Courses;