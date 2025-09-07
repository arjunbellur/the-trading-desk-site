import React from 'react';
import { motion } from 'framer-motion';
import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { 
  PageTitle, 
  SectionTitle, 
  Text, 
  TextLarge,
  Caption 
} from '@/components/ui/typography';
import { CourseCard } from '@/components/CourseCard';
import { coursesData } from '@/data/courses';
import { useCourseActions } from '@/hooks/useCourseActions';

const CleanIndexExample = () => {
  const { handlePreRegister, handleExplore } = useCourseActions();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Section variant="hero" spacing="xl" container={false}>
        <Container size="lg" className="text-center">
          <PageTitle className="mb-6">
            Master the Art of Trading
          </PageTitle>
          <TextLarge className="mx-auto mb-8 max-w-2xl text-muted-foreground">
            Join thousands of traders learning from professionals. 
            Real strategies, real results.
          </TextLarge>
        </Container>
      </Section>

      {/* Transform Your Trading Section */}
      <Section variant="default" spacing="lg">
        <Container size="lg">
          <div className="mb-12 text-center">
            <SectionTitle className="mb-4">
              Transform Your Trading
            </SectionTitle>
            <Text className="text-muted-foreground">
              Choose your path to trading success
            </Text>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {/* Three cards would go here */}
          </div>
        </Container>
      </Section>

      {/* Featured Courses Section */}
      <Section variant="featured" spacing="lg" id="courses">
        <Container size="lg">
          <div className="mb-16 text-center">
            <PageTitle className="mb-4">
              Unlock new career possibilities with
            </PageTitle>
            <PageTitle className="text-green-400">
              our courses today
            </PageTitle>
          </div>
          
          {/* Course Cards */}
          {coursesData.map((course, index) => (
            <React.Fragment key={course.id}>
              <CourseCard
                courseNumber={course.courseNumber}
                subtitle={course.subtitle}
                title={course.title}
                description={course.description}
                price={course.price}
                features={course.features}
                level={course.level}
                onPreRegister={() => handlePreRegister(course.id)}
                onExplore={() => handleExplore(course.id)}
              />
              {index < coursesData.length - 1 && (
                <div className="my-16 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
              )}
            </React.Fragment>
          ))}
        </Container>
      </Section>

      {/* Live Trading Section */}
      <Section variant="dark" spacing="lg" id="livestream">
        <Container size="md">
          <div className="mb-12 text-center">
            <SectionTitle className="mb-4">
              Learn in <span className="text-gradient-gold">Real Time</span>
            </SectionTitle>
            <Text className="mx-auto max-w-2xl text-muted-foreground">
              Join live trading sessions. Watch expert decision-making, 
              risk management, and execution in real market conditions.
            </Text>
          </div>
          
          {/* Live trading content would go here */}
        </Container>
      </Section>

      {/* Pricing Section */}
      <Section variant="featured" spacing="lg">
        <Container size="lg">
          <div className="mb-12 text-center">
            <SectionTitle className="mb-4">
              Choose Your Path
            </SectionTitle>
            <Text className="text-muted-foreground">
              Flexible plans for every trader. Upgrade anytime.
            </Text>
          </div>
          
          {/* Pricing cards would go here */}
        </Container>
      </Section>

      {/* Instructor Section */}
      <Section variant="default" spacing="lg">
        <Container size="lg">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <SectionTitle className="mb-4">
                Learn from Proven Professionals
              </SectionTitle>
              <Text className="mb-6 text-muted-foreground">
                Our instructors are seasoned traders with institutional and prop experience. 
                They teach exactly how they trade—no fluff.
              </Text>
            </div>
            
            {/* Instructor image would go here */}
          </div>
        </Container>
      </Section>

      {/* Testimonials Section */}
      <Section variant="featured" spacing="lg" id="testimonials">
        <Container size="lg">
          <div className="mb-12 text-center">
            <SectionTitle className="mb-4">
              What Our <span className="text-gradient-gold">Students Say</span>
            </SectionTitle>
          </div>
          
          {/* Testimonials would go here */}
        </Container>
      </Section>
    </div>
  );
};

export default CleanIndexExample;
