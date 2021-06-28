import PictureSize from "./PictureSize";

export default interface Pictures {
  active: boolean
  default_picture: boolean
  resource_key: string
  sizes: PictureSize[]
  type: string
  uri: string
}