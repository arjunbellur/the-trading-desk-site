import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Clock, Users, BarChart } from "lucide-react";
import foundationsImage from "@/assets/course-foundations.jpg";
import liveImage from "@/assets/course-live.jpg";
import advancedImage from "@/assets/course-advanced.jpg";

const CoursesSection = () => {
  const courses = [
    {
      id: 1,
      title: "Foundations",
      subtitle: "Trading Fundamentals",
      description: "Master the basics with comprehensive market analysis, risk management, and technical indicators.",
      image: foundationsImage,
      icon: BarChart,
      duration: "6 weeks",
      students: "500+",
      level: "Beginner",
    },
    {
      id: 2,
      title: "Live Stream",
      subtitle: "Real-Time Trading",
      description: "Join live trading sessions with professional traders and learn from real market movements.",
      image: liveImage,
      icon: Users,
      duration: "Daily",
      students: "200+",
      level: "All Levels",
      isLive: true,
    },
    {
      id: 3,
      title: "Advanced Training",
      subtitle: "Pro Strategies",
      description: "Advanced algorithms, options strategies, and institutional-level trading techniques.",
      image: advancedImage,
      icon: Clock,
      duration: "12 weeks",
      students: "100+",
      level: "Advanced",
    },
  ];

  return (
    <section id="courses" className="section-padding bg-muted/20">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="heading-1 text-foreground mb-6">
            Trading Education
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose your path to trading mastery with our comprehensive course lineup
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {courses.map((course) => {
            const IconComponent = course.icon;
            return (
              <Card 
                key={course.id} 
                className="group relative overflow-hidden bg-gradient-card border-border/50 hover:shadow-luxury transition-all duration-300 hover:scale-105"
              >
                {/* Live Indicator */}
                {course.isLive && (
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-destructive text-destructive-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <div className="w-2 h-2 bg-destructive-foreground rounded-full mr-1 animate-pulse" />
                      LIVE
                    </div>
                  </div>
                )}

                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  
                  {/* Icon Overlay */}
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-primary/30">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Course Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-foreground mb-1">{course.title}</h3>
                    <p className="text-sm text-primary font-medium">{course.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Course Meta */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <span>{course.duration}</span>
                    <span>{course.students} students</span>
                    <span className="bg-secondary/50 px-2 py-1 rounded text-xs">
                      {course.level}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Button 
                    variant={course.isLive ? "hero" : "outline"} 
                    className="w-full group"
                  >
                    {course.isLive ? "Join Live" : "Learn More"}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Button variant="hero" size="lg">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;