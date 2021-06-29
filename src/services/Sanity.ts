import sanityClient from 'part:@sanity/base/client'
import VideoResponse from '../types/vimeo/VideoResponse'
import VideoAsset from '../types/sanity/VideoAsset'
import { Syncer } from './sanity/Syncer'
import { Paginator } from './sanity/Paginator'

const isContentLakeSupported = typeof sanityClient.withConfig === 'function'

interface Config {
  apiVersion: string,
  dataset: string,
  projectId: string,
  token: string
}

class Sanity {
  client?: any
  syncer: Syncer
  paginator: Paginator
  query = `*[_type == "vimeo.videoAsset"]`

  constructor() {
    this.client = isContentLakeSupported
      ? sanityClient.withConfig({ apiVersion: '2021-05-17' })
      : sanityClient
    this.syncer = new Syncer(this)
    this.paginator = new Paginator(this)
  }

  initialize = (sanityClient: any, config: Config) => {
    this.client = sanityClient(config)
  }


  createVimeoAsset = async (video: VideoResponse) => {
    const videoDoc = new VideoAsset(video)
    try {
      await this.client.createIfNotExists(videoDoc)
    } catch (e) {
      console.error(e)
    }
  }

  createOrUpdateVimeoAsset = async (video: VideoResponse) => {
    const videoDoc = new VideoAsset(video)
    try {
      await this.client.createOrReplace(videoDoc.videoAsset)
    } catch (e) {
      console.error(e)
    }
  }

  deleteVimeoAsset = async (videoId: string) => {
    try {
      await this.client.delete(videoId)
    } catch (e) {
      console.error(e)
    }
  }

  getAllVimeoAssets = async () => {
    try {
      const res = await this.client.fetch(this.query)
      return res as VideoResponse[]
    } catch (e) {
      console.error(e)
      return []
    }
  }

}

export default new Sanity()