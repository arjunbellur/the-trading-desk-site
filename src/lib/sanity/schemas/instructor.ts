import { Rule } from '@sanity/types';

export default {
  name: 'instructor',
  type: 'document',
  title: 'Instructor',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'bio',
      type: 'text',
      title: 'Bio',
      rows: 4,
    },
    {
      name: 'avatar',
      type: 'image',
      title: 'Avatar',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'title',
      type: 'string',
      title: 'Professional Title',
      description: 'e.g., "Senior Trader", "Market Analyst"',
    },
    {
      name: 'company',
      type: 'string',
      title: 'Company',
    },
    {
      name: 'experience',
      type: 'string',
      title: 'Years of Experience',
    },
    {
      name: 'specialties',
      type: 'array',
      title: 'Specialties',
      of: [{ type: 'string' }],
    },
    {
      name: 'socialLinks',
      type: 'object',
      title: 'Social Links',
      fields: [
        {
          name: 'twitter',
          type: 'url',
          title: 'Twitter',
        },
        {
          name: 'linkedin',
          type: 'url',
          title: 'LinkedIn',
        },
        {
          name: 'website',
          type: 'url',
          title: 'Website',
        },
      ],
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
      title: 'name',
      subtitle: 'title',
      media: 'avatar',
    },
  },
};
