import App from '../App'

export default {
  name: 'vimeo.videoAsset',
  type: 'object',
  title: 'Video asset',
  inputComponent: App,
  fields: [
    {
      type: 'string',
      name: 'created_time',
    },
    {
      type: 'string',
      name: 'description',
    },
    {
      type: 'array',
      name: 'file',
      of: [{ type: 'vimeo.video.file' }]
    },
    {
      type: 'boolean',
      name: 'is_playable'
    },
    {
      type: 'string',
      name: 'link'
    },
    {
      type: 'string',
      name: 'manage_link',
    },
    {
      type: 'string',
      name: 'modified_time'
    },
    {
      type: 'string',
      name: 'name'
    },
    {
      type: 'vimeo.video.pictures',
      name: 'pictures'
    },
    {
      type: 'vimeo.video.privacy',
      name: 'privacy'
    },
    {
      type: 'string',
      name: 'release_time'
    },
    {
      type: 'string',
      name: 'status'
    },
    {
      type: 'string',
      name: 'resource_key'
    }
  ]
}