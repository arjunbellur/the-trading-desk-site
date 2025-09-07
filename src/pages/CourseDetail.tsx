import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { LiquidGlassButton } from "@/components/ui/liquid-glass-button";
import { NeonGradientCard, ShineBorder } from "@/components/magicui";
import { 
  ArrowLeft, 
  Play, 
  Clock, 
  BookOpen, 
  Star, 
  Users, 
  CheckCircle, 
  Lock,
  User,
  Calendar,
  Target
} from "lucide-react";
import { getCourseBySlug } from "@/mock/content";
// TODO: Replace mock data with Sanity GROQ queries once schema is approved

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // TODO: Replace with actual Sanity query: getCourseBySlug(slug)
  const course = slug ? getCourseBySlug(slug) : null;

  if (!course) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navigation />
        <div className="container-cinematic pt-24 text-center">
          <h1 className="mb-4 text-2xl font-bold">Course Not Found</h1>
          <p className="mb-8 text-muted-foreground">The course you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const difficultyColors = {
    beginner: "bg-green-500/20 text-green-300",
    intermediate: "bg-yellow-500/20 text-yellow-300", 
    advanced: "bg-red-500/20 text-red-300"
  };

  const formatRuntime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${minutes}m`;
  };

  const totalLessons = course.modules.reduce((total, module) => total + module.lessons.length, 0);
  const totalRuntime = course.modules.reduce(
    (total, module) => total + module.lessons.reduce((moduleTotal, lesson) => moduleTotal + lesson.runtime, 0), 
    0
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Back to Courses */}
      <div className="pb-6 pt-24">
        <div className="container-cinematic">
          <Button variant="ghost" asChild className="text-muted-foreground">
            <Link to="/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
          </Button>
        </div>
      </div>

      {/* Course Hero */}
      <section className="pb-16">
        <div className="container-cinematic">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Course Header */}
              <div className="mb-8">
                <div className="mb-4 flex items-center gap-4">
                  <Badge className={`${difficultyColors[course.difficulty]} border-0 capitalize`}>
                    {course.difficulty}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-primary" />
                    <span className="font-medium">{course.rating}</span>
                    <span className="text-muted-foreground">({course.studentCount.toLocaleString()} students)</span>
                  </div>
                </div>
                
                <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl">
                  {course.title}
                </h1>
                
                <p className="mb-6 text-xl leading-relaxed text-muted-foreground">
                  {course.shortDescription}
                </p>

                {/* Course Meta */}
                <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{course.duration}</p>
                      <p className="text-sm text-muted-foreground">Duration</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{totalLessons} lessons</p>
                      <p className="text-sm text-muted-foreground">Content</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{formatRuntime(totalRuntime)}</p>
                      <p className="text-sm text-muted-foreground">Video</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{course.studentCount.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Students</p>
                    </div>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-4 rounded-lg bg-muted/20 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{course.instructor.name}</p>
                    <p className="text-sm text-muted-foreground">Lead Instructor</p>
                  </div>
                </div>
              </div>

              {/* Course Description */}
              <div className="mb-8">
                <h2 className="mb-4 text-2xl font-bold">About This Course</h2>
                <p className="mb-6 leading-relaxed text-muted-foreground">
                  {course.description}
                </p>
              </div>

              {/* Prerequisites */}
              {course.prerequisites.length > 0 && (
                <div className="mb-8">
                  <h3 className="mb-4 text-xl font-bold">Prerequisites</h3>
                  <ul className="space-y-2">
                    {course.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <Target className="h-4 w-4 text-primary" />
                        {prereq}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What You'll Learn */}
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-bold">What You'll Learn</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Curriculum */}
              <div className="mb-8">
                <h3 className="mb-4 text-xl font-bold">Course Curriculum</h3>
                <div className="space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <Card key={module.id} className="card-cinematic">
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center justify-between text-lg">
                          <span>Module {moduleIndex + 1}: {module.title}</span>
                          <span className="text-sm font-normal text-muted-foreground">
                            {module.lessons.length} lessons
                          </span>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{module.description}</p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div key={lesson.id} className="flex items-center justify-between rounded bg-muted/10 p-3">
                              <div className="flex items-center gap-3">
                                <div className="flex h-8 w-8 items-center justify-center rounded bg-muted/30">
                                  {lesson.isLocked ? (
                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                  ) : (
                                    <Play className="h-4 w-4 text-primary" />
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{lesson.title}</p>
                                  {lesson.isPreview && (
                                    <Badge variant="secondary" className="mt-1 text-xs">FREE PREVIEW</Badge>
                                  )}
                                </div>
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {formatRuntime(lesson.runtime)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar - Pricing & Enrollment */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="card-cinematic">
                  <CardHeader className="text-center">
                    <div className="mb-4">
                      <span className="text-3xl font-bold">${course.price}</span>
                      {course.originalPrice && (
                        <span className="ml-2 text-lg text-muted-foreground line-through">
                          ${course.originalPrice}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <LiquidGlassButton size="lg" className="w-full text-lg">
                      <Play className="mr-2 h-5 w-5" />
                      Start Now
                    </LiquidGlassButton>
                    
                    <Button variant="ghost" className="w-full py-3">
                      <Calendar className="mr-2 h-4 w-4" />
                      30-Day Money Back Guarantee
                    </Button>

                    <Separator />

                    <div className="space-y-3">
                      <h4 className="font-semibold">This course includes:</h4>
                      {course.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetail;
