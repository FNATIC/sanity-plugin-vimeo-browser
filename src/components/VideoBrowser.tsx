import React, { useContext, useEffect } from 'react';
import { VideoContext } from '../contexts/VideoContext';

import SingleVideoBrowser from './SingleVideoBrowser';
import SkipButtons from './SkipButtons';
import Vimeo from '../services/Vimeo';

const VideoBrowser: React.FC = () => {
    const { allVideos, pagingState } = useContext(VideoContext)



    return (
      <>
        <div className="grid grid-cols-2 md:grid-cols-5">
          {allVideos.map((video) => (
            <SingleVideoBrowser key={video.link} video={video} />
          ))}
        </div>
        <div className="flex justify-center pt-2">
          <SkipButtons index={pagingState?.currentPage || 1} maxIndex={pagingState?.maxPages || 1} nextLink={pagingState?.next} previousLink={pagingState?.previous} />
        </div>
      </>
    );
};

export default VideoBrowser;