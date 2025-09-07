export default {
  name: 'instructor',
  title: 'Instructor',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (R:any)=>R.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' }, validation: (R:any)=>R.required() },
    { name: 'avatar', title: 'Avatar', type: 'image', options: { hotspot: true } },
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'bio', title: 'Bio', type: 'text' },
    { name: 'social', title: 'Social', type: 'object', fields: [
      { name: 'twitter', title: 'Twitter', type: 'url' },
      { name: 'linkedin', title: 'LinkedIn', type: 'url' },
      { name: 'website', title: 'Website', type: 'url' },
    ] },
  ],
};


