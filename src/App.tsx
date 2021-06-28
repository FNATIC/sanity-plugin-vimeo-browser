import React from 'react'
import VideoProvider from './contexts/VideoContext'
import SystemProvider from './contexts/SystemContext'
import UploadProvider from './contexts/UploadContext'
import Dashboard from './components/Dashboard'
import VideoAsset from './types/sanity/VideoAsset'

interface VimeoBrowserProps {
  onClose: () => void,
  onSelect: (doc: VideoAsset) => void,
  tool: boolean
}

const VimeoBrowser: React.FC<VimeoBrowserProps> = ({ onClose, onSelect, tool }) => {
  return <div className="w-screen h-screen bg-gray-800 text-white">
    <SystemProvider onClose={onClose} onSelect={onSelect} tool={tool}>
      <VideoProvider>
        <UploadProvider >
          <Dashboard />
        </UploadProvider>
      </VideoProvider>
    </SystemProvider>
  </div>
}

export default VimeoBrowser