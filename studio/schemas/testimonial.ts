export default {
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (R:any)=>R.required() },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'avatar', title: 'Avatar', type: 'image', options: { hotspot: true } },
    { name: 'quote', title: 'Quote', type: 'text', validation: (R:any)=>R.required() },
    { name: 'course', title: 'Related Course', type: 'reference', to: [{ type: 'course' }] },
  ],
};


