import React, { useContext } from 'react';
import { SystemContext } from '../contexts/SystemContext';
import { UploadContext } from '../contexts/UploadContext';
import MODES from '../types/Modes';
import Button from './common/Button';

const UploadProgress = () => {  
  const { progress, error, success, uploadFile, clearState } = useContext(UploadContext)
  const { setMode } = useContext(SystemContext)
  return (
      <>
      {!error && <>
        <div className="flex justify-center items-center mt-3">
          We're currently uploading your video to Vimeo and adding it to Sanity.
        </div>
        <div className="flex justify-center text-lg">
          Progress: {progress.toFixed(2)} %
        </div>
        </>}
        {
          success && <>
            <div className="flex justify-center items-center mt-3">Upload complete!</div>
            <div className="flex justify-center">
              <Button onClick={() => {
                clearState()
                setMode(MODES.BROWSING)
              }}>Go back</Button>
            </div>
            </>
        }
        {
          error && 
          <>
            <div className="flex justify-center items-center mt-3">Something wnet wrong when uploading... Try again</div>
            <div className="flex justify-center">
              <Button onClick={uploadFile}>Try again</Button>
            </div>
          </>
        }
        
      </>
    );
};

export default UploadProgress;