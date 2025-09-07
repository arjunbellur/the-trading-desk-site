import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import course from './schemas/course';
import moduleDoc from './schemas/module';
import lesson from './schemas/lesson';
import instructor from './schemas/instructor';
import testimonial from './schemas/testimonial';

export default defineConfig({
  name: 'default',
  title: 'TradeMasters Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || 'zuq2cuhq',
  dataset: process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Courses').child(
              S.documentTypeList('course').title('Courses')
            ),
            S.listItem().title('Modules').child(
              S.documentTypeList('module').title('Modules')
            ),
            S.listItem().title('Lessons').child(
              S.documentTypeList('lesson').title('Lessons')
            ),
            S.listItem().title('Instructors').child(
              S.documentTypeList('instructor').title('Instructors')
            ),
            S.listItem().title('Testimonials').child(
              S.documentTypeList('testimonial').title('Testimonials')
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: [course, moduleDoc, lesson, instructor, testimonial],
  },
});


