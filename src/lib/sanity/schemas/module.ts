import { Rule } from '@sanity/types';

export default {
  name: 'module',
  type: 'document',
  title: 'Module',
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
      rows: 3,
    },
    {
      name: 'course',
      type: 'reference',
      title: 'Course',
      to: [{ type: 'course' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'order',
      type: 'number',
      title: 'Order',
      description: 'Order within the course',
    },
    {
      name: 'duration',
      type: 'number',
      title: 'Duration (minutes)',
      description: 'Total duration of all lessons in this module',
    },
    {
      name: 'lessonsCount',
      type: 'number',
      title: 'Number of Lessons',
    },
    {
      name: 'isPublished',
      type: 'boolean',
      title: 'Published',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'course.title',
    },
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
};
