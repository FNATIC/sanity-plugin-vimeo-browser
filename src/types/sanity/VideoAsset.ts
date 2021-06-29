import DownloadQuality from "../vimeo/File";
import Pictures from "../vimeo/Pictures";
import Privacy from "../vimeo/Privacy";
import VideoResponse from "../vimeo/VideoResponse";
import { SanityDocument } from "@sanity/client";

export default class VideoAsset {
  videoAsset: SanityDocument<VideoResponse>
  
  constructor(video: VideoResponse) {
    this.videoAsset = this.generateAsset(video)
  }

  private addTypeAndKeyToObject = (object: any, _type: string) => ({ 
      _type,
      _key: Math.random().toString(16).substring(3),
      ...object
    })

  private generateDownloadObject = (downloadQualities: DownloadQuality[]) => {
    return downloadQualities.map((quality) => (this.addTypeAndKeyToObject(quality, 'vimeo.video.downloadQuality')))
  }

  private generatePicturesObject = (pictures: Pictures) => {
    return {
      ...pictures,
      _type: 'vimeo.video.pictures',
      sizes: pictures.sizes.map((size) => (this.addTypeAndKeyToObject(size, 'vimeo.picture.size'))),
    }
  }

  private generatePrivacyObject = (privacy: Privacy) => {
    return {
      ...privacy,
      _type: 'vimeo.video.privacy'
    }
  }


  private generateAsset = (video: VideoResponse): SanityDocument<VideoResponse> => {
    const base = {
      ...video,
      _createdAt: video.created_time,
      _updatedAt: video.modified_time,
      _id: video.resource_key,
      _type: 'vimeo.videoAsset',
      _rev: ''
    }

    base.files = this.generateDownloadObject(base.files)
    base.pictures = this.generatePicturesObject(base.pictures)
    base.privacy = this.generatePrivacyObject(base.privacy)
    return base
  }
}