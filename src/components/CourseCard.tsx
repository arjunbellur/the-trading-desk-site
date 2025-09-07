import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Zap, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SectionTitle, Text, Label } from '@/components/ui/typography';

interface CourseFeature {
  id: string;
  text: string;
}

interface CourseCardProps {
  courseNumber: string;
  subtitle: string;
  title: string;
  description: string;
  price: string;
  features: CourseFeature[];
  level: 'beginner' | 'intermediate' | 'advanced';
  onPreRegister?: () => void;
  onExplore?: () => void;
  className?: string;
}

const levelIcons = {
  beginner: BookOpen,
  intermediate: Zap,
  advanced: Award,
};

const levelLabels = {
  beginner: 'Beginner Course',
  intermediate: 'Intermediate Course',
  advanced: 'Advanced Course',
};

export const CourseCard: React.FC<CourseCardProps> = ({
  courseNumber,
  subtitle,
  title,
  description,
  price,
  features,
  level,
  onPreRegister,
  onExplore,
  className,
}) => {
  const IconComponent = levelIcons[level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], type: "tween" }}
      className={cn("grid md:grid-cols-2 gap-10 sm:gap-12 lg:gap-20 mb-24 lg:mb-28 w-full max-w-6xl mx-auto", className)}
    >
      {/* Course Content */}
      <div className="flex flex-col justify-center">
        <Label className="mb-6 text-white">{courseNumber}</Label>
        <Label className="mb-6 text-xl text-white md:text-2xl">{subtitle}</Label>
        <SectionTitle className="mb-10 text-4xl text-white md:text-5xl lg:text-6xl">
          {title}™
        </SectionTitle>
        <Text className="mb-12 text-base leading-relaxed text-white md:text-lg lg:mb-16">
          {description}
        </Text>

        <div className="mb-12 grid grid-cols-2 gap-8 sm:gap-10 lg:mb-16 lg:gap-14">
          <div>
            <div className="mb-6 text-2xl font-bold text-white md:text-3xl">{price}</div>
          </div>
          <div>
            <Label className="mb-8 text-sm uppercase tracking-wider text-white">WHAT'S INCLUDED</Label>
            <ul className="space-y-5 text-white">
              {features.map((feature) => (
                <li key={feature.id} className="flex items-start">
                  <span className="mr-4 mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-white" />
                  <span className="leading-relaxed">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 flex gap-6 lg:gap-8">
          <button
            onClick={onPreRegister}
            className="btn-glass--green"
            aria-label={`Pre-register for ${title} course`}
          >
            PRE-REGISTER →
          </button>
          <button
            onClick={onExplore}
            className="btn-glass--ghost"
            aria-label={`Explore ${title} course details`}
          >
            EXPLORE →
          </button>
        </div>
      </div>
      
      {/* Course Image Placeholder */}
      <div className="flex items-center justify-center">
        <div className="flex h-80 w-full items-center justify-center rounded-lg border border-gray-600 bg-gray-800 sm:h-96 lg:h-[28rem]">
          <div className="px-6 text-center text-gray-400">
            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-gray-700 sm:h-20 sm:w-20">
              <IconComponent className="h-8 w-8 sm:h-10 sm:w-10" />
            </div>
            <div className="mb-3 text-lg font-semibold sm:text-xl">{levelLabels[level]}</div>
            <div className="text-sm opacity-75 sm:text-base">Course content preview</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
