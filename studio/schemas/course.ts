import { Rule } from '@sanity/types';

export default {
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (R: Rule)=>R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R: Rule)=>R.required() },
    { name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'level', title: 'Level', type: 'string', options: { list: ['beginner','intermediate','advanced'] } },
    { name: 'accessTag', title: 'Access Tag', type: 'string', description: "e.g. 'course:orderflow-basics' or 'membership:all-access' or 'free'", validation: (R: Rule)=>R.required() },
    { name: 'instructor', title: 'Instructor', type: 'reference', to: [{ type: 'instructor' }] },
    { name: 'isPublished', title: 'Published', type: 'boolean', initialValue: false },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
  ],
  preview: {
    select: { title: 'title', media: 'thumbnail', subtitle: 'level' },
  },
};


