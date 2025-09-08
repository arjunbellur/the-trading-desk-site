import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Users, Clock, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CourseSummary } from "@/mock/content";

interface CourseGridProps {
  courses: CourseSummary[];
  title?: string;
  description?: string;
  className?: string;
}

interface CourseSummaryCardProps {
  course: CourseSummary;
}

const CourseSummaryCard: React.FC<CourseSummaryCardProps> = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], type: "tween" }}
      className="group relative overflow-hidden rounded-lg border border-gray-600 bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:border-gray-500 hover:bg-gray-800/70"
    >
      <Link to={`/courses/${course.slug}`} className="block">
        {/* Course Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={course.thumbnailUrl}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute left-4 top-4">
            <span className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              course.difficulty === 'beginner' && "bg-green-500/20 text-green-400",
              course.difficulty === 'intermediate' && "bg-yellow-500/20 text-yellow-400",
              course.difficulty === 'advanced' && "bg-red-500/20 text-red-400"
            )}>
              {course.difficulty}
            </span>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-6">
          <div className="mb-3">
            <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-white">
              {course.title}
            </h3>
            <p className="line-clamp-2 text-sm text-gray-300">
              {course.shortDescription}
            </p>
          </div>

          {/* Course Stats */}
          <div className="mb-4 flex items-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {course.duration}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              {course.lessonCount} lessons
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {course.studentCount.toLocaleString()}
            </div>
          </div>

          {/* Rating */}
          <div className="mb-4 flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3 w-3",
                    i < Math.floor(course.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-600"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">
              {course.rating} ({course.studentCount.toLocaleString()})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-white">
                ${course.price}
              </span>
              {course.originalPrice && course.originalPrice > course.price && (
                <span className="ml-2 text-sm text-gray-400 line-through">
                  ${course.originalPrice}
                </span>
              )}
            </div>
            <span className="text-xs text-green-400">
              {course.originalPrice && course.originalPrice > course.price 
                ? `${Math.round((1 - course.price / course.originalPrice) * 100)}% off`
                : 'Special Price'
              }
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export const CourseGrid = ({ 
  courses, 
  title = "Featured Courses",
  description = "Master trading with our comprehensive curriculum",
  className = "" 
}: CourseGridProps) => {
  if (courses.length === 0) {
    return (
      <div className={`py-12 text-center ${className}`}>
        <p className="text-muted-foreground">No courses available at the moment.</p>
      </div>
    );
  }

  return (
    <section className={`section-padding ${className}`}>
      <div className="container-cinematic">
        {(title || description) && (
          <div className="mb-16 text-center">
            {title && (
              <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">
                {title.includes('Featured') ? (
                  <>
                    Featured <span className="text-gradient-gold">Courses</span>
                  </>
                ) : title}
              </h2>
            )}
            {description && (
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseSummaryCard key={course.id} course={course} />
          ))}
        </div>
        
        {/* Show more indicator if there are many courses */}
        {courses.length > 6 && (
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              Showing {Math.min(6, courses.length)} of {courses.length} courses
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
