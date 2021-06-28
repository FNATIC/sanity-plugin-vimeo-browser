import { Patch, PatchMutationOperation } from '@sanity/client';
import React, { createContext, useState } from 'react';
import MODES from '../types/Modes'
import VideoResponse from '../types/vimeo/VideoResponse';

interface SystemContextProps {
  mode: MODES
  setMode: (mode: MODES) => void
  selecting: boolean
  setSelecting: (selecting: boolean) => void,
  onSelect: (asset: VideoResponse) => void,
  onFocus: () => void
}

export const SystemContext = createContext<SystemContextProps>({
  mode: MODES.BROWSING,
  setMode: (mode) => null,
  selecting: false,
  setSelecting: (selecting) => null,
  onSelect: () => null,
  onFocus: () => null
});

interface SystemProviderProps {
  onFocus: () => void,
  onSelect: (doc: VideoResponse) => void,
  tool: string
}

const SystemProvider: React.FC<SystemProviderProps> = ({onSelect, onFocus, tool, children }) => {

  const [mode, setMode] = useState<MODES>(MODES.BROWSING)
  const [selecting, setSelecting] = useState(!tool)

  return (
    <SystemContext.Provider
      value={{
        mode,
        setMode,
        selecting,
        setSelecting,
        onSelect,
        onFocus
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export default SystemProvider;


