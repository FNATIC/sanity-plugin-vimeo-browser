
import axios from 'axios'
import AllVideos from './vimeo/AllVideos'
import { Uploader } from './vimeo/Uploader'

class Vimeo {
  protected apiKey? = process.env.SANITY_STUDIO_VIMEO_TOKEN
  allVideos: AllVideos
  uploader: Uploader
  protected loadingCallbackFn?: (loading: boolean) => void

  constructor() {
    this.allVideos = new AllVideos(this)
    this.uploader = new Uploader(this)
  }

  setApiKey = (apiKey: string) => {
    this.apiKey = apiKey
  }

  setLoadingCallback = (callbackFn: (loading: boolean) => void) => this.loadingCallbackFn = callbackFn

  get baseHeader(): { [id: string]: string } {
    return { Authorization: `Bearer ${this.apiKey}` }
  }

  getUrl = async (url: string) => {
    if (this.loadingCallbackFn) this.loadingCallbackFn(true)
    const headers = { Authorization: `Bearer ${this.apiKey}` }
    try {
      const res = await axios.get(`https://api.vimeo.com${url}`, { headers })
      if (this.loadingCallbackFn) this.loadingCallbackFn(false)
      return res.data
    } catch (e) {
      console.log(e)
      if (this.loadingCallbackFn) this.loadingCallbackFn(false)
    }
  }
}

export default new Vimeo()