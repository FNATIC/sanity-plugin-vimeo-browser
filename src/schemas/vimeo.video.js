import App from '../App'

export default {
  name: 'vimeo.video',
  type: 'document',
  title: 'Video asset reference',
  fields: [
    {
      title: 'Video',
      name: 'asset',
      type: 'reference',
      weak: true,
      to: [{type: 'vimeo.videoAsset'}]
    }
  ],
  preview: {
    select: {
      playbackId: 'asset.playbackId',
      status: 'asset.status',
      duration: 'asset.data.duration',
      thumbTime: 'asset.thumbTime',
      filename: 'asset.filename',
      playbackIds: 'asset.data.playback_ids'
    },
    // component: Preview
  }
}