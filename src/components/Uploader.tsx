import React, { useContext } from 'react';
import { UploadContext } from '../contexts/UploadContext';
import PreviewVideo from './PreviewVideo';
import UploadButton from './UploadButton';
import UploadProgress from './UploadProgress';

const Uploader: React.FC = () => {
    const { fileToUpload, progress, uploadInProgress } = useContext(UploadContext)
    
    return (
      <div className="m-auto">
        { uploadInProgress? <UploadProgress /> 
        : fileToUpload ? <PreviewVideo />
          : <UploadButton />
        }
      </div>
    );
};

export default Uploader;