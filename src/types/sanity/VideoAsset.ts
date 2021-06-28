import DownloadQuality from "../vimeo/DownloadQuality";
import Pictures from "../vimeo/Pictures";
import Privacy from "../vimeo/Privacy";
import VideoResponse from "../vimeo/VideoResponse";

export default class VideoAsset {
  videoResponse: VideoResponse
  
  constructor(video: VideoResponse) {
    this.videoResponse = video
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


  generateAsset = () => {
    const base = {
      ...this.videoResponse,
      _createdAt: this.videoResponse.created_time,
      _updatedAt: this.videoResponse.modified_time,
      _id: this.videoResponse.resource_key,
      _type: 'vimeo.videoAsset'
    }

    base.download = this.generateDownloadObject(base.download)
    base.pictures = this.generatePicturesObject(base.pictures)
    base.privacy = this.generatePrivacyObject(base.privacy)
    return base
  }
}