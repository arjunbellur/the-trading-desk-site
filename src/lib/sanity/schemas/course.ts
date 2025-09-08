import { Rule } from '@sanity/types';

export default {
  name: 'course',
  type: 'document',
  title: 'Course',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
      rows: 4,
    },
    {
      name: 'thumbnail',
      type: 'image',
      title: 'Thumbnail',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'level',
      type: 'string',
      title: 'Level',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'accessTag',
      type: 'string',
      title: 'Access Tag',
      description: 'Entitlement required to access this course (e.g., "course:orderflow-basics", "membership:all-access", or "free")',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'instructor',
      type: 'reference',
      title: 'Instructor',
      to: [{ type: 'instructor' }],
    },
    {
      name: 'duration',
      type: 'number',
      title: 'Duration (minutes)',
    },
    {
      name: 'lessonsCount',
      type: 'number',
      title: 'Number of Lessons',
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price (USD)',
      description: 'Display price (actual pricing handled by Stripe)',
    },
    {
      name: 'isPublished',
      type: 'boolean',
      title: 'Published',
      initialValue: false,
    },
    {
      name: 'publishedAt',
      type: 'datetime',
      title: 'Published At',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'level',
      media: 'thumbnail',
    },
  },
};
