import AllVideosResponse from "../../types/vimeo/AllVideosResponse"
import VideoResponse from "../../types/vimeo/VideoResponse"
import Vimeo from "../Vimeo"

class AllVideos {
  baseUrl = '/me/videos'
  vimeo: typeof Vimeo
  paging: {
    next?: string
    previous?: string
    first?: string
  } = {}

  constructor(vimeo: typeof Vimeo) {
    this.vimeo = vimeo
  }

  getVideos = async(url: string) => {
    const res = await this.vimeo.getUrl(url)
    return this.sanitizeResponse(res)
  } 

  getFirst = async () => {
    const res = await this.getVideos(this.baseUrl)
    return res
  }

  // We strip the video here, so we don't upload too much to Sanity
  private stripVideo = (video: VideoResponse): VideoResponse => ({
    created_time: video.created_time,
    description: video.description,
    download: video.download,
    is_playable: video.is_playable,
    link: video.link,
    manage_link: video.manage_link,
    modified_time: video.modified_time,
    name: video.name,
    pictures: video.pictures,
    privacy: video.privacy,
    release_time: video.release_time,
    resource_key: video.resource_key,
    status: video.status
  })

  private sanitizeResponse(response: AllVideosResponse) {
    if (!response) {
      console.error('Response was empty')
      return
    }
    this.paging = response.paging

    const strippedVideos = []
    for (const video of response?.data) {
      strippedVideos.push(this.stripVideo(video))
    }
    response.data = strippedVideos
    response.max_index = Math.round((response.total || 1) / (response.per_page || 1))
    return response as AllVideosResponse
  }

  getNext = async () => {
    if (!this.paging.next) {
      console.error('Could not find any next paging call.')
      return
    }
    const res = await this.getVideos(this.paging.next)
    return res
   }

  getPrevious = async () => {
    if (!this.paging.previous) {
      console.error('Could not find any previous paging call.')
      return
    }
    const res = await this.getVideos(this.paging.previous)
    return res
  }


}

export default AllVideos