import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Users, Clock, Award } from 'lucide-react';
import { coursesData } from '@/data/courses';

const Courses = () => {
  const handlePurchase = (courseId: string) => {
    // TODO: Implement course purchase logic
    // Redirect to checkout or billing
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'beginner':
        return '🌱';
      case 'intermediate':
        return '🚀';
      case 'advanced':
        return '⚡';
      default:
        return '📚';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900/20 to-black">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute left-1/4 top-1/4 h-64 w-64 animate-pulse rounded-full bg-green-500/10 blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 h-96 w-96 animate-pulse rounded-full bg-blue-500/5 blur-3xl delay-1000"></div>
          </div>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge className="mb-6 border-green-500/30 bg-green-500/20 px-4 py-2 text-green-400">
            📚 Choose Your Trading Journey
          </Badge>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Master <span className="text-green-400">Trading</span> with Expert-Led Courses
          </h1>
          <p className="mx-auto mb-12 max-w-3xl text-lg text-gray-300">
            From beginner fundamentals to advanced strategies. Learn from industry professionals 
            and join a community of successful traders.
          </p>
          
          {/* Course Stats */}
          <div className="mx-auto mb-16 grid max-w-3xl grid-cols-3 gap-8 text-center">
            <div>
              <div className="mb-2 text-3xl font-bold text-white">{coursesData.length}</div>
              <div className="text-sm text-gray-400">Expert Courses</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-white">15K+</div>
              <div className="text-sm text-gray-400">Active Students</div>
            </div>
            <div>
              <div className="mb-2 text-3xl font-bold text-white">4.8</div>
              <div className="text-sm text-gray-400">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Plans */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Choose Your <span className="text-green-400">Learning Path</span>
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Start your trading journey with our comprehensive course offerings
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {coursesData.map((course, index) => (
              <Card 
                key={course.id} 
                className={`relative border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                  course.level === 'intermediate' ? 'ring-2 ring-green-500/50' : ''
                }`}
              >
                {course.level === 'intermediate' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-green-500 px-4 py-1 text-white">
                      <Star className="mr-1 h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-4 text-center">
                  <div className="mb-4 flex items-center justify-center">
                    <span className="text-4xl">{getLevelIcon(course.level)}</span>
                  </div>
                  
                  <Badge className={`mx-auto mb-4 ${getLevelColor(course.level)}`}>
                    {course.courseNumber}
                  </Badge>
                  
                  <CardTitle className="text-2xl font-bold text-white">
                    {course.title}
                  </CardTitle>
                  
                  <CardDescription className="mt-2 text-gray-300">
                    {course.description}
                  </CardDescription>
                  
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-green-400">{course.price}</span>
                    <span className="ml-2 text-gray-400">one-time</span>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="mb-8 space-y-3">
                    {course.features.map((feature) => (
                      <div key={feature.id} className="flex items-center gap-3">
                        <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500/20">
                          <Check className="h-3 w-3 text-green-400" />
                        </div>
                        <span className="text-sm text-gray-300">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    onClick={() => handlePurchase(course.id)}
                    className={`w-full ${
                      course.level === 'intermediate' 
                        ? 'liquid-glass-btn--green' 
                        : 'liquid-glass-btn'
                    }`}
                  >
                    Get Started Now
                  </Button>
                  
                  <p className="mt-3 text-center text-xs text-gray-400">
                    30-day money-back guarantee
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-900/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose <span className="text-green-400">The Trading Desk</span>
            </h2>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20">
                <Users className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Expert Instructors</h3>
              <p className="text-gray-300">
                Learn from professional traders with decades of market experience
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20">
                <Clock className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Live Sessions</h3>
              <p className="text-gray-300">
                Join live trading sessions and Q&A with instructors
              </p>
            </div>
            
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-500/20">
                <Award className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="mb-2 text-xl font-bold">Community Access</h3>
              <p className="text-gray-300">
                Connect with fellow traders and share strategies
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Courses;