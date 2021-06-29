import React, { useContext, useState } from 'react';
import { SystemContext } from '../contexts/SystemContext';
import VideoResponse from '../types/vimeo/VideoResponse';
import Button from './common/Button'

interface SingleVideoBrowserProps {
  video: VideoResponse
}

const SingleVideoBrowser: React.FC<SingleVideoBrowserProps> = ({ video }) => {  
  const image = video.pictures.sizes[2]
  const { selecting, onSelect } = useContext(SystemContext)

  return (
      <div
        className={`w-90 p-1 border border-transparent border-solid rounded flex justify-center relative ${selecting ? 'cursor-pointer hover:border-white' : 'cursor-default'}`}
        title={video.name}
        onClick={() => onSelect(video)}
      >
        <img src={image.link} height={image.height} width={image.width} />
        <div className="absolute w-full h-10 bottom-0 bg-opacity-70 bg-black mb-1" />
        <div className="absolute bottom-1 p-2 text-sm truncate max-w-full">{video.name}</div>
      </div>
    );
};

export default SingleVideoBrowser;