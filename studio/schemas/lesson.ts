export default {
  name: 'lesson',
  title: 'Lesson',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (R:any)=>R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R:any)=>R.required() },
    { name: 'course', title: 'Course', type: 'reference', to: [{ type: 'course' }], validation: (R:any)=>R.required() },
    { name: 'module', title: 'Module', type: 'reference', to: [{ type: 'module' }] },
    { name: 'order', title: 'Order', type: 'number' },
    { name: 'muxPlaybackId', title: 'Mux Playback ID', type: 'string' },
    { name: 'thumbnail', title: 'Thumbnail', type: 'image', options: { hotspot: true } },
    { name: 'accessOverride', title: 'Access Override', type: 'array', of: [{ type: 'string' }], description: 'Optional: add specific entitlements for this lesson' },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }, { type: 'image' }, { type: 'file' }] },
    { name: 'resources', title: 'Resources', type: 'array', of: [{
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Title' },
        { name: 'url', type: 'url', title: 'URL' },
        { name: 'type', type: 'string', title: 'Type', options: { list: ['pdf','link','video'] } },
      ]
    }] },
    { name: 'isPublished', title: 'Published', type: 'boolean', initialValue: false },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
  ],
};


