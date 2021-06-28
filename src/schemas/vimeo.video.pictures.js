export default {
  name: 'vimeo.video.pictures',
  type: 'object',
  fields: [
    {
      type: 'boolean',
      name: 'active'
    },
    {
      type: 'boolean',
      name: 'default_picture'
    },
    {
      type: 'string',
      name: 'resource_key'
    },
    {
      type: 'array',
      name: 'sizes',
      of: [{ type: 'vimeo.picture.size' }]
    },
    {
      type: 'string',
      name: 'type'
    },
    {
      type: 'string',
      name: 'uri'
    }
  ]
}