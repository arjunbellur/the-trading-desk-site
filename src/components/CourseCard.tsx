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
      className={cn("grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-12 lg:mb-16 w-full max-w-7xl mx-auto h-[50vh]", className)}
    >
      {/* Course Content */}
      <div className="flex flex-col justify-center">
        {/* Course Header */}
        <div className="mb-4">
          <div className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-300">{courseNumber}</div>
          <div className="mb-2 text-sm font-medium text-green-400">{subtitle}</div>
          <h3 className="mb-3 text-xl font-semibold leading-tight text-white">
            {title}™
          </h3>
          <p className="text-sm leading-relaxed text-gray-300">
            {description}
          </p>
        </div>

        {/* Price & Features */}
        <div className="mb-6 grid grid-cols-2 gap-6">
          <div className="flex flex-col">
            <div className="mb-1 text-2xl font-bold text-white">{price}</div>
            <div className="text-xs text-gray-400">One-time payment</div>
          </div>
          <div>
            <div className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-300">What's Included</div>
            <ul className="space-y-2">
              {features.map((feature) => (
                <li key={feature.id} className="flex items-center">
                  <div className="mr-3 flex h-4 w-4 items-center justify-center rounded-full bg-green-400/20">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                  </div>
                  <span className="text-xs text-gray-300">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onPreRegister}
            className="liquid-glass-btn--green flex-1"
            aria-label={`Pre-register for ${title} course`}
          >
            Pre-register
          </button>
          <button
            onClick={onExplore}
            className="liquid-glass-btn--ghost flex-1"
            aria-label={`Explore ${title} course details`}
          >
            Explore
          </button>
        </div>
      </div>
      
      {/* Course Image Placeholder */}
      <div className="flex items-center justify-center">
        <div className="flex h-56 w-full items-center justify-center rounded-lg border border-gray-600 bg-gray-800 sm:h-64 lg:h-72">
          <div className="px-6 text-center text-gray-400">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-700 sm:h-14 sm:w-14">
              <IconComponent className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>
            <div className="mb-2 text-sm font-semibold">{levelLabels[level]}</div>
            <div className="text-xs opacity-75">Course content preview</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
