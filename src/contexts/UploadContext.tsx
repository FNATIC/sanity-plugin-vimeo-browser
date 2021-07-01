import React, { createContext, useCallback, useEffect, useState } from 'react';
import Vimeo from '../services/Vimeo';

interface UploadContextProps {
  fileToUpload?: File
  setFileToUpload: (file?: File) => void
  name: string
  description: string
  setName: (name: string) => void
  setDescription: (description: string) => void
  progress: number
  error: string
  success: boolean
  uploadFile: () => Promise<void>
  clearState: () => void
  uploadInProgress: boolean
}

export const UploadContext = createContext<UploadContextProps>({
  setFileToUpload: (file) => null,
  setName: (name) => null,
  setDescription: (description) => null,
  progress: 0,
  name: '',
  description: '',
  error: '',
  success: false,
  uploadFile: () => new Promise((resolve) => resolve()),
  clearState: () => null,
  uploadInProgress: false
});

const UploadProvider: React.FC = ({ children }) => {
  const [fileToUpload, setFileToUpload] = useState<File | undefined>()
  const [progress, setProgress] = useState(0)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [uploadInProgress, setUploadInProgress] = useState(false)

  const uploadFile = async () => {
    setUploadInProgress(true)
    if (fileToUpload) await Vimeo.uploader.uploadFile(fileToUpload, name, description)
  }

  useEffect(() => {
    if (progress === 0) setUploadInProgress(false)
  }, [progress])

  const clearState = () => {
    setName('')
    setDescription('')
    setFileToUpload(undefined)
    setUploadInProgress(false)
    Vimeo.uploader.clearState()
  }

  Vimeo.uploader.registerCallbacks(setSuccess, setProgress, setError)    

  return (
    <UploadContext.Provider
      value={{
        fileToUpload,
        setFileToUpload,
        progress,
        name,
        description,
        setName,
        setDescription,
        error,
        success,
        uploadFile,
        clearState,
        uploadInProgress
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export default UploadProvider;


