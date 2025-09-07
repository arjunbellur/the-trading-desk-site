export default {
  name: 'lesson',
  type: 'document',
  title: 'Lesson',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'module',
      type: 'reference',
      title: 'Module',
      to: [{ type: 'module' }],
    },
    {
      name: 'order',
      type: 'number',
      title: 'Order',
      description: 'Order within the course/module',
    },
    {
      name: 'duration',
      type: 'number',
      title: 'Duration (minutes)',
    },
    {
      name: 'muxPlaybackId',
      type: 'string',
      title: 'Mux Playback ID',
      description: 'Mux video playback ID for this lesson',
    },
    {
      name: 'muxAssetId',
      type: 'string',
      title: 'Mux Asset ID',
      description: 'Mux asset ID (for reference)',
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
      name: 'accessOverride',
      type: 'array',
      title: 'Access Override',
      description: 'Override course access requirements (optional)',
      of: [{ type: 'string' }],
    },
    {
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        { type: 'block' },
        { type: 'image' },
        { type: 'file' },
      ],
    },
    {
      name: 'resources',
      type: 'array',
      title: 'Resources',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              type: 'string',
              title: 'Title',
            },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
            },
            {
              name: 'type',
              type: 'string',
              title: 'Type',
              options: {
                list: [
                  { title: 'PDF', value: 'pdf' },
                  { title: 'Video', value: 'video' },
                  { title: 'Link', value: 'link' },
                ],
              },
            },
          ],
        },
      ],
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
      subtitle: 'course.title',
      media: 'thumbnail',
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
