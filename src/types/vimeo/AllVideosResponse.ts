import VideoResponse from "./VideoResponse";

export default interface AllVideosResponse {
  data: VideoResponse[],
  page: number,
  paging: {
    next: string,
    previos: string,
    first: string
  },
  per_page: number,
  total: number
  max_index: number
}