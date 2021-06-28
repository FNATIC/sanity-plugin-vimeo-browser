import React, { createContext, useState } from 'react';
import MODES from '../types/Modes'
import VideoAsset from '../types/sanity/VideoAsset';

interface SystemContextProps {
  mode: MODES
  setMode: (mode: MODES) => void
  selecting: boolean
  setSelecting: (selecting: boolean) => void
}

export const SystemContext = createContext<SystemContextProps>({
  mode: MODES.BROWSING,
  setMode: (mode) => null,
  selecting: false,
  setSelecting: (selecting) => null
});

interface SystemProviderProps {
  onClose: () => void,
  onSelect: (doc: VideoAsset) => void,
  tool: boolean
}

const SystemProvider: React.FC<SystemProviderProps> = ({onClose, onSelect, tool, children }) => {
  console.log(!tool)

  const [mode, setMode] = useState<MODES>(MODES.BROWSING)
  const [selecting, setSelecting] = useState(!tool)

  return (
    <SystemContext.Provider
      value={{
        mode,
        setMode,
        selecting,
        setSelecting
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export default SystemProvider;


