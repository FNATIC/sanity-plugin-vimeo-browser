import DownloadQuality from "./File";
import Pictures from "./Pictures";
import Privacy from "./Privacy";

export default interface VideoResponse {
  created_time: string
  created_unix_time: number
  description: string
  files: DownloadQuality[]
  is_playable: boolean
  link: string
  manage_link: string
  modified_time: string
  modified_unix_time: number
  name: string
  pictures: Pictures
  privacy: Privacy
  release_time: string
  status: string
  resource_key: string
}