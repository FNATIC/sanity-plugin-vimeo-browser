import React, { useCallback, useContext, useEffect } from 'react';
import { VideoContext } from '../contexts/VideoContext';
import vimeo from '../services/Vimeo';
import TopBar from './TopBar';
import VideoBrowser from './VideoBrowser';
import LoadingSpinner from './common/LoadingSpinner';
import Uploader from './Uploader';
import { SystemContext } from '../contexts/SystemContext';
import MODES from '../types/Modes';
import { UploadContext } from '../contexts/UploadContext';
import Sanity from '../services/Sanity';

const Dashboard: React.FC = () => {
    const { loading } = useContext(VideoContext)
    const { mode } = useContext(SystemContext)

    const loadVideos = useCallback(() => {
      Sanity.paginator.getVideos()
    }, [])

    useEffect(() => {
      loadVideos()
    }, [loadVideos])

    return (
      <div className="w-screen h-screen bg-gray-800 text-white">
        <div className="m-auto p-2">
        <div className="flex justify-end">
         <TopBar />
        </div>
          { loading ?  <LoadingSpinner /> :
            mode === MODES.BROWSING ? 
            <div>
              <VideoBrowser />
            </div>
            : <Uploader />
          }
        </div>
      </div>
    );
};

export default Dashboard;