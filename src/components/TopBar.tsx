import React, { useContext } from 'react';
import { SystemContext } from '../contexts/SystemContext';
import Sanity from '../services/Sanity';
import MODES from '../types/Modes';
import Button from './common/Button';

const TopBar: React.FC = () => {
    const { mode, setMode } = useContext(SystemContext)

    return (
      <div>
        <Button color="gray" onClick={() => Sanity.syncer.syncAllVideosWithSanity()}>
          Sync with Vimeo
        </Button>
        {mode === MODES.BROWSING ?
          <Button
            onClick={() => setMode(MODES.UPLOADING)}
          >
            Upload
          </Button>
        : <Button
            onClick={() => setMode(MODES.BROWSING)}
          >
            Browse
          </Button>}
      </div>
    );
};

export default TopBar;