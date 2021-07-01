import React, {forwardRef, Ref, MouseEvent, useEffect} from 'react'
import VideoProvider from './contexts/VideoContext'
import SystemProvider from './contexts/SystemContext'
import UploadProvider from './contexts/UploadContext'
import Dashboard from './components/Dashboard'
import VideoAsset from './types/sanity/VideoAsset'
import Dialog from 'part:@sanity/components/dialogs/fullscreen'
import { SanityDocument, SanityAssetDocument, SanityImageAssetDocument } from '@sanity/client'
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'
import {Box, Portal, ThemeProvider, ToastProvider, studioTheme, PortalProvider} from '@sanity/ui'
import VideoResponse from './types/vimeo/VideoResponse'

interface VimeoBrowserProps {
  document: SanityDocument
  onFocus: () => void
  onChange: (event: any) => void
  selectedAssets?: (SanityAssetDocument | SanityImageAssetDocument)[]
  tool: string
}

const VimeoBrowser: React.FC<VimeoBrowserProps> = forwardRef((props, ref: Ref<HTMLDivElement>) => {
  const { onFocus, onChange, tool } = props
  const handleStopPropagation = (e: MouseEvent) => {
    e.nativeEvent.stopImmediatePropagation()
    e.stopPropagation()
  }

  const onSelect = (asset: VideoResponse) => {
    const event = {
      _type: 'vimeo.video',
      _key: Math.random().toString(16).substring(3),
      asset: {
        _ref: asset.resource_key,
        _type: "reference"
      }
    }
    onChange(PatchEvent.from(asset ? set(event) : unset()))
  }

  return <SystemProvider onFocus={onFocus} onSelect={onSelect} tool={tool}>
      <VideoProvider>
        <UploadProvider >
          <ThemeProvider scheme="dark" theme={studioTheme}>
            <ToastProvider zOffset={60000}>
              {tool ? 
                  <Box ref={ref} className="h-full relative">
                    <Dashboard />
                  </Box>
                : <Portal>
                    <Box
                      onDragEnter={handleStopPropagation}
                      onDragLeave={handleStopPropagation}
                      onDragOver={handleStopPropagation}
                      onDrop={handleStopPropagation}
                      onMouseUp={handleStopPropagation}
                      ref={ref}
                      className="h-auto left-0 fixed top-0 w-full z-800000"
                    >
                    <Dashboard />
                    </Box>
                  </Portal>
              }
            </ToastProvider>
          </ThemeProvider>
        </UploadProvider>
      </VideoProvider>
    </SystemProvider>
})

export default VimeoBrowser