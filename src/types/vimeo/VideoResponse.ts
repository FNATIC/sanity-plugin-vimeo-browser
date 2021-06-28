import DownloadQuality from "./DownloadQuality";
import Pictures from "./Pictures";
import Privacy from "./Privacy";

export default interface VideoResponse {
  created_time: string
  description: string
  download: DownloadQuality[]
  is_playable: boolean
  link: string
  manage_link: string
  modified_time: string
  name: string
  pictures: Pictures
  privacy: Privacy
  release_time: string
  status: string
  resource_key: string
}