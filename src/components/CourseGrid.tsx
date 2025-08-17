import { CourseCard } from "./CourseCard";
import type { CourseSummary } from "@/mock/content";

interface CourseGridProps {
  courses: CourseSummary[];
  title?: string;
  description?: string;
  className?: string;
}

export const CourseGrid = ({ 
  courses, 
  title = "Featured Courses",
  description = "Master trading with our comprehensive curriculum",
  className = "" 
}: CourseGridProps) => {
  if (courses.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <p className="text-muted-foreground">No courses available at the moment.</p>
      </div>
    );
  }

  return (
    <section className={`section-padding ${className}`}>
      <div className="container-cinematic">
        {(title || description) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
                {title.includes('Featured') ? (
                  <>
                    Featured <span className="text-gradient-gold">Courses</span>
                  </>
                ) : title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
        
        {/* Show more indicator if there are many courses */}
        {courses.length > 6 && (
          <div className="text-center mt-12">
            <p className="text-sm text-muted-foreground">
              Showing {Math.min(6, courses.length)} of {courses.length} courses
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
