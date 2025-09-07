import { z } from 'zod';

/**
 * Zod schemas following best practices
 */

// Course feature schema
export const courseFeatureSchema = z.object({
  id: z.string().min(1, 'Feature ID is required'),
  text: z.string().min(1, 'Feature text is required'),
});

// Course data schema
export const courseDataSchema = z.object({
  id: z.string().min(1, 'Course ID is required'),
  courseNumber: z.string().min(1, 'Course number is required'),
  subtitle: z.string().min(1, 'Subtitle is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.string().regex(/^\$\d+/, 'Price must be in format $XXX'),
  features: z.array(courseFeatureSchema).min(1, 'At least one feature is required'),
  level: z.enum(['beginner', 'intermediate', 'advanced'], {
    errorMap: () => ({ message: 'Level must be beginner, intermediate, or advanced' }),
  }),
});

// Form validation schemas
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  subscribe: z.boolean().optional(),
});

export const courseRegistrationSchema = z.object({
  courseId: z.string().min(1, 'Course selection is required'),
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  experience: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: 'You must agree to the terms and conditions',
  }),
});

// Type exports
export type CourseFeature = z.infer<typeof courseFeatureSchema>;
export type CourseData = z.infer<typeof courseDataSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type CourseRegistrationData = z.infer<typeof courseRegistrationSchema>;

// Validation helpers
export const validateCourseData = (data: unknown): CourseData => {
  return courseDataSchema.parse(data);
};

export const validateContactForm = (data: unknown): ContactFormData => {
  return contactFormSchema.parse(data);
};

export const validateCourseRegistration = (data: unknown): CourseRegistrationData => {
  return courseRegistrationSchema.parse(data);
};
