import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, BookOpen, Users, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { CourseSummary } from "@/mock/content";

interface CourseCardProps {
  course: CourseSummary;
  className?: string;
}

export const CourseCard = ({ course, className = "" }: CourseCardProps) => {
  const difficultyColors = {
    beginner: "bg-green-500/20 text-green-300",
    intermediate: "bg-yellow-500/20 text-yellow-300", 
    advanced: "bg-red-500/20 text-red-300"
  };

  const formatRuntime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  return (
    <Card className={`tm-ui-card tm-ui-card--glass hover:scale-105 transition-all duration-500 group overflow-hidden ${className}`}>
      {/* Course Thumbnail */}
      <div className="tm-ui-card__thumbnail h-40 relative overflow-hidden">
        {/* Unsplash image */}
        <img
          src={course.thumbnailUrl}
          alt={course.title}
          loading="lazy"
          decoding="async"
          className="tm-ui-card__image absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
        />
        <div className="tm-ui-card__overlay absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Course Level Badge */}
        <div className="tm-ui-card__badge absolute top-4 left-4">
          <Badge className={`tm-ui-badge tm-ui-badge--glass ${difficultyColors[course.difficulty]} border-0 capitalize`}>
            {course.difficulty}
          </Badge>
        </div>
        
        {/* Rating */}
        <div className="tm-ui-card__rating absolute top-4 right-4 flex items-center gap-1 text-white">
          <Star className="w-4 h-4 fill-current" />
          <span className="tm-ui-text--small font-medium">{course.rating}</span>
        </div>
        
        {/* Student Count */}
        <div className="tm-ui-card__stats absolute bottom-4 left-4 text-white">
          <div className="tm-ui-text--small opacity-90">
            <Users className="w-4 h-4 inline mr-1" />
            {course.studentCount.toLocaleString()} students
          </div>
        </div>
        
        {/* Hover Play Effect */}
        <div className="tm-ui-card__play-button absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="tm-ui-button tm-ui-button--liquid-glass-thick w-16 h-16 rounded-full flex items-center justify-center">
            <ArrowRight className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <CardHeader className="tm-ui-card__header pb-3">
        <CardTitle className="tm-ui-card__title tm-ui-text--large mb-2 group-hover:text-primary transition-colors">
          {course.title}
        </CardTitle>
        <CardDescription className="tm-ui-card__description tm-ui-text--small tm-ui-text--muted leading-relaxed">
          {course.shortDescription}
        </CardDescription>
        
        {/* Instructor */}
        <div className="tm-ui-card__instructor flex items-center gap-2 pt-2">
          <div className="tm-ui-badge tm-ui-badge--secondary w-6 h-6 rounded-full flex items-center justify-center">
            <span className="tm-ui-text--small font-medium">
              {course.instructor.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <span className="tm-ui-text--small tm-ui-text--muted">{course.instructor.name}</span>
        </div>
      </CardHeader>
      
      <CardContent className="tm-ui-card__content pt-0">
        {/* Course Meta */}
        <div className="tm-ui-card__meta flex items-center gap-4 tm-ui-text--small tm-ui-text--muted mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.duration}
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {course.lessonCount} lessons
          </div>
        </div>
        
        {/* Key Features */}
        <div className="tm-ui-card__features space-y-1 mb-4">
          {course.features.slice(0, 2).map((feature, i) => (
            <div key={i} className="tm-ui-card__feature flex items-center gap-2 tm-ui-text--small">
              <CheckCircle className="w-3 h-3 text-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Pricing */}
        <div className="tm-ui-card__pricing flex items-center justify-between mb-4">
          <div>
            <span className="tm-ui-card__price text-2xl font-bold text-foreground">${course.price}</span>
            {course.originalPrice && (
              <span className="tm-ui-card__original-price tm-ui-text--small tm-ui-text--muted line-through ml-2">
                ${course.originalPrice}
              </span>
            )}
          </div>
        </div>
        
        {/* CTA Button */}
        <Button asChild variant="regular" fullWidth className="tm-ui-card__cta font-semibold">
          <Link to={`/courses/${course.slug}`}>
            VIEW COURSE
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
