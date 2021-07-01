import Sanity from "../Sanity";
import Vimeo from "../Vimeo";
import axios, { AxiosRequestConfig } from "axios";
import { Upload } from 'tus-js-client'

export class Uploader {
  vimeo: typeof Vimeo
  private file?: File
  private rawFile?: ArrayBuffer
  private uploadLink?: string
  private uploadStatus?: string
  private currentTusUpload?: Upload
  private name?: string
  private description?: string
  private onSuccessCallback?: (success: boolean) => void
  private onProgressCallback?: (percentage: number) => void
  private onErrorCallback?: (error: string) => void

  constructor(vimeo: typeof Vimeo) {
    this.vimeo = vimeo
  }

  registerCallbacks = (onSuccessCallback: (success: boolean) => void, onProgressCallback: (percentage: number) => void, onErrorCallback: (error: string) => void) => {
    this.onSuccessCallback = onSuccessCallback
    this.onProgressCallback = onProgressCallback
    this.onErrorCallback = onErrorCallback
  }

  uploadFile = async(file: File, name: string, description: string) => {
    this.file = file
    this.name = name
    this.description = description
  
    await this.sendVideoCreateRequest()
    this.uploadVideoUsingTus()
  }

  clearState = () => {
    this.file = undefined
    this.uploadLink = ''
    this.name = ''
    this.description = ''
    if (this.onErrorCallback) this.onErrorCallback('')
    if (this.onProgressCallback) this.onProgressCallback(0)
    if (this.onSuccessCallback) this.onSuccessCallback(false)
  }

  private sendVideoCreateRequest = async () => {
    if (!this.file) return console.error('No file was available for upload.')
    const headers = this.vimeo.baseHeader
    headers['Accept'] = "application/vnd.vimeo.*+json;version=3.4"

    const body = {
      description: this.description,
      name: this.name,
      upload: {
        approach: "tus",
        size: this.file?.size
      }
    }

    const uploadResponse = await axios.post('https://api.vimeo.com/me/videos', body, { headers })
    this.uploadLink = uploadResponse.data.upload.upload_link
  }

  private uploadVideoUsingTus = () => {
    if (!this.file) return console.error('No file was available for upload.')
    const headers = this.vimeo.baseHeader
    headers['Accept'] = "application/vnd.vimeo.*+json;version=3.4"


    this.currentTusUpload = new Upload(this.file!, {
        uploadUrl: this.uploadLink,
        retryDelays: [0, 3000, 5000, 10000, 20000],
        metadata: {
            filename: this.file.name,
            filetype: this.file.type
        },
        headers,
        onError: (error) => {
            console.log("Failed because: " + error)
            if (this.onErrorCallback) this.onErrorCallback(error.message)
        },
        onProgress: (bytesUploaded, bytesTotal) => {
            const percentage = bytesUploaded / bytesTotal * 100
            console.log(bytesUploaded, bytesTotal, percentage + "%")
            if (this.onProgressCallback && percentage > 5) this.onProgressCallback(percentage)
        },
        onSuccess: async () => {
            console.log("Download %s from %s", this.currentTusUpload?.url)
            await Sanity.syncer.syncAllVideosWithSanity()
            await Sanity.paginator.getVideos()
            if (!this.onSuccessCallback) return console.error('No onSuccess callback was registered.')
            this.onSuccessCallback(true)
        }
    })

    this.currentTusUpload.findPreviousUploads().then((previousUploads) => {
      // Found previous uploads so we select the first one. 
      if (previousUploads.length) {
          this.currentTusUpload?.resumeFromPreviousUpload(previousUploads[0])
      }

      // Start the upload
      this.currentTusUpload?.start()
  })
  }


}