import React, { useContext, useEffect } from 'react';
import { VideoContext } from '../contexts/VideoContext';
import vimeo from '../services/Vimeo';
import TopBar from './TopBar';
import VideoBrowser from './VideoBrowser';
import LoadingSpinner from './common/LoadingSpinner';
import Uploader from './Uploader';
import { SystemContext } from '../contexts/SystemContext';
import MODES from '../types/Modes';

const Dashboard: React.FC = () => {
    const { selectedVideo, loading } = useContext(VideoContext)
    const { mode } = useContext(SystemContext)

    return (
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
    );
};

export default Dashboard;