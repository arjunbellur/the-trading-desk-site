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
            <CourseCard key={course.id} course={course} />
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
