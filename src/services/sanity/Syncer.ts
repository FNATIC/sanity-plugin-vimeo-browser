import VideoResponse from "../../types/vimeo/VideoResponse"
import Sanity from "../Sanity"
import Vimeo from "../Vimeo"

export class Syncer {
  sanity: typeof Sanity

  constructor(sanity: typeof Sanity) {
    this.sanity = sanity
  }

  private getVideoAssetMap = async () => {
    const videosAllreadySynced = await this.sanity.getAllVimeoAssets()
    const res: { [id: string]: VideoResponse } = {}

    for (const video of videosAllreadySynced) {
      res[video.resource_key] = video
    }

    return res
  }

  private syncVideo = (videoToSync: VideoResponse) => {
    console.log(`Syncing video with id ${videoToSync.resource_key}`)
    return this.sanity.createOrUpdateVimeoAsset(videoToSync)
  }

  private checkIfVideoHasBeenModified = (videoToSync: VideoResponse, videoAllreadySynced: VideoResponse) => new Date(videoAllreadySynced.modified_time) < new Date(videoToSync.modified_time)

  private syncOrSkipVideo = async (videoToSync: VideoResponse, videoAllreadySynced: VideoResponse) => {
    if (!videoAllreadySynced) return this.syncVideo(videoToSync)
    if (this.checkIfVideoHasBeenModified(videoToSync, videoAllreadySynced)) return this.syncVideo(videoToSync)
    console.log(`Skipping video with id ${videoToSync.resource_key}`)
  }

  private deleteVideo = (videoIdToDelete: string) => {
    console.log(`Deleting video with id ${videoIdToDelete}`)
    return this.sanity.deleteVimeoAsset(videoIdToDelete)
  }

  private deleteVideos = (videosAllreadySynced: {[id: string]: VideoResponse}, videosToKeep: {[id: string]: string}) => {
    const promises = []
    for (const videoId of Object.keys(videosAllreadySynced)) {
      const shouldKeepVideo = videosToKeep[videoId]
      if (shouldKeepVideo) continue
      promises.push(this.deleteVideo(videoId))
    }
    return Promise.all(promises)
  }

  syncAllVideosWithSanity = async () => {
    const videosAllreadySynced = await this.getVideoAssetMap()
    const videosToKeep: { [id: string]: string } = {}
    let nextResponse = await Vimeo.allVideos.getFirst()

    const promises = []
    
    while (nextResponse && nextResponse.data) {
      let videos = nextResponse.data
      for (const video of videos) {
        if (!video.resource_key) {
          console.error(`Video with title: ${video.name} didn't have an id. We can therefore not process it at this time`)
          continue
        }
        videosToKeep[video.resource_key] = video.resource_key
        promises.push(this.syncOrSkipVideo(video, videosAllreadySynced[video.resource_key]))
      }
      videos = []
      nextResponse = await Vimeo.allVideos.getNext()
    }
    await Promise.all(promises)
    await this.deleteVideos(videosAllreadySynced, videosToKeep)
  }
}