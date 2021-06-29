import { MutationEvent } from "@sanity/client";
import VideoResponse from "../../types/vimeo/VideoResponse";
import Sanity from "../Sanity";

let videosSubscription: any

export interface PagingState {
  next?: () => Promise<void>
  previous?: () => Promise<void>
  currentPage: number
  totalNumberOfVideos: number
  videosPerPage: number
  maxPages: number
}

export class Paginator {
  private sanity: typeof Sanity
  private paging: PagingState = {
    maxPages: 1,
    totalNumberOfVideos: 0,
    currentPage: 1,
    videosPerPage: 25
  }
  private startIndex = 0
  private endIndex = 25
  private videos: { [id: string]: VideoResponse } = {}
  private callbackStateFn?: (state: PagingState) => void
  private callbackAllVideosFn?: (videos: VideoResponse[]) => void

  constructor(sanity: typeof Sanity) {
    this.sanity = sanity
  }

  private get queryAndParams() {
    const query = `${this.sanity.query} | order(_createdAt desc) [$start ... $stop]`
    const params = { start: this.startIndex, stop: this.endIndex }
    return { query, params }
  }

  private getTotalNumberOfVideos = async () => {
    const query = `count(${this.sanity.query})`
    const initialNumber = await this.sanity.client.fetch(query)
    this.paging.totalNumberOfVideos = initialNumber
    this.updatePagingState()
  }

  getVideos = async () => {
    const { query, params } = this.queryAndParams
    const initialData = await this.sanity.client.fetch(query, params) as VideoResponse[]
    await this.getTotalNumberOfVideos()
    this.callCalbackAllVideosFn(initialData)
    this.updatePagingState()
    this.videos = this.getVideoAssetMap(initialData)
    this.registerPaginatorSubscription()
  }

  private registerPaginatorSubscription = async () => {
    const { query, params } = this.queryAndParams
    if (videosSubscription) videosSubscription.unsubscribe()
    videosSubscription = this.sanity.client.listen(query, params).subscribe((data: MutationEvent<VideoResponse>) => {
      this.getTotalNumberOfVideos()
      this.updateVideos(data)
      this.updatePagingState()
    })
  }

  private getVideoAssetMap = (videos: VideoResponse[]) => {
    const res: { [id: string]: VideoResponse } = {}
    for (const video of videos) {
      res[video.resource_key] = video
    }
    return res
  }

  private getVideoArray = (videos: { [id: string]: VideoResponse }) => {
    return Object.values(videos).sort((videoA, videoB) => {
      return videoB.modified_unix_time - videoA.modified_unix_time
    }).slice(0, this.paging.videosPerPage)
  }

  private updateVideos(event: MutationEvent<VideoResponse>) {
    const tmpVideos = { ...this.videos }
    if (event.transition === 'disappear') {
      delete tmpVideos[event.documentId]
    } else if (event.result) {
      tmpVideos[event.documentId] = event.result
    }
    this.callCalbackAllVideosFn(this.getVideoArray(tmpVideos))
    this.videos = tmpVideos
  }

  setCallbackFn(callbackStateFn: (state: PagingState) => void, callbackAllVideosFn: (videos: VideoResponse[]) => void) {
    this.callbackStateFn = callbackStateFn
    this.callbackAllVideosFn = callbackAllVideosFn
  }

  private callCalbackStateFn(state: PagingState) {
    if (!this.callbackStateFn) return console.error('No callback function for state provided. This is necessary to keep the application reactive.')
    
    this.callbackStateFn(state)
  }

  private callCalbackAllVideosFn(videos: VideoResponse[]) {
    if (!this.callbackAllVideosFn) return console.error('No callback function for videos provided. This is necessary to keep the application reactive.')
    this.callbackAllVideosFn(videos)
  }

  private updatePagingState = () => {
    const newPaging: PagingState = { ...this.paging }

    newPaging.maxPages = Math.floor(this.paging.totalNumberOfVideos / this.paging.videosPerPage) + 1

    delete newPaging.next
    if (this.paging.currentPage < this.paging.maxPages) {
      newPaging.next = this.getNext
    }

    delete newPaging.previous
    if (this.paging.currentPage > 1) {
      newPaging.previous = this.getPrevious
    }

    this.paging = newPaging
    this.callCalbackStateFn(newPaging)
  }

  private getNext = async () => {
    if (!this.paging.next) {
      return console.error('Could not find any next paging call.')
    }
    this.paging.currentPage++
    this.startIndex = this.startIndex + this.paging.videosPerPage
    this.endIndex = this.endIndex + this.paging.videosPerPage
    this.callCalbackStateFn(this.paging)
    this.getVideos()
  }

  private getPrevious = async () => {
    if (!this.paging.previous) {
      return console.error('Could not find any previous paging call.')
    }
    this.paging.currentPage--
    this.startIndex = this.startIndex - this.paging.videosPerPage
    this.endIndex = this.endIndex - this.paging.videosPerPage
    this.callCalbackStateFn(this.paging)
    this.getVideos()
  }

}