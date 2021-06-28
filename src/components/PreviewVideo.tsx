import React, { useCallback, useContext, useEffect, useState } from 'react';
import { UploadContext } from '../contexts/UploadContext';
import vimeo from '../services/Vimeo';
import Button from './common/Button';

const PreviewVideo: React.FC = () => {
  const { fileToUpload, setFileToUpload, name, description, setName, setDescription, uploadFile } = useContext(UploadContext)
  const [videoStream, setVideoStream] = useState('')
  
  const getVideoStream = useCallback(() => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        const binaryStr = reader.result as string
        setVideoStream(binaryStr)
      }

      if (fileToUpload) reader.readAsDataURL(fileToUpload)
    
  }, [])

  useEffect(() => {
    getVideoStream()
  }, [])

  return (
    <>
      <div className="flex justify-center items-center mt-3">
        <div className="h-80 block relative">
          {videoStream && 
            <video autoPlay className="h-full inset-0 object-cover object-top" controls>
              <source src={videoStream} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          }
        </div>
        <div className="pl-10">
          <div>
            <label>
              Name:
              <input type="text" className="border ml-4 pl-1 pt-1 w-64 text-white border-t-0 border-l-0 border-r-0 bg-gray-500 bg-opacity-40" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
          </div>
          <div className="pt-4 w-full">
            <label>
              Description:
              <textarea className="border w-full pl-2 pt-2 text-white border-t-0 border-l-0 border-r-0 bg-gray-500 bg-opacity-40" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
          </div>
        </div>
      </div>  
      <div className="flex justify-center mt-2">
        <Button onClick={() => setFileToUpload(undefined)}>Change video</Button>
        {fileToUpload && <Button color="green" onClick={uploadFile}>Upload to Vimeo</Button>}
      </div>
    </>
  );
};

export default PreviewVideo;