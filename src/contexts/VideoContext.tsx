import React, { createContext, useState } from 'react';
import VimeoWrapper from '../services/Vimeo';
import VideoResponse from '../types/vimeo/VideoResponse'
import { PagingState } from '../services/sanity/Paginator'
import Sanity from '../services/Sanity';

interface VideoContextProps {
  allVideos: VideoResponse[];
  selectedVideo?: VideoResponse;
  setSelectedVideo: (video: VideoResponse) => void
  pagingState?: PagingState
  loading: boolean
}

export const VideoContext = createContext<VideoContextProps>({
  allVideos: [],
  setSelectedVideo: (video) => null,
  loading: false
});

const VideoProvider: React.FC = ({ children }) => {
  const [allVideos, setAllVideos] = useState<VideoResponse[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<VideoResponse | undefined>()
  const [pagingState, setPagingState] = useState<PagingState>()
  const [loading, setLoading] = useState(false)
  
  Sanity.paginator.setCallbackFn(setPagingState, setAllVideos)
  VimeoWrapper.setLoadingCallback(setLoading)

  return (
    <VideoContext.Provider
      value={{
        allVideos,
        selectedVideo,
        setSelectedVideo,
        pagingState,
        loading
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export default VideoProvider;


