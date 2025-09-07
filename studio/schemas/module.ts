export default {
  name: 'module',
  title: 'Module',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (R:any)=>R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (R:any)=>R.required() },
    { name: 'course', title: 'Course', type: 'reference', to: [{ type: 'course' }], validation: (R:any)=>R.required() },
    { name: 'order', title: 'Order', type: 'number' },
    { name: 'description', title: 'Description', type: 'text' },
    { name: 'isPublished', title: 'Published', type: 'boolean', initialValue: false },
  ],
};


