import React, { Fragment, useCallback, useState } from 'react';
import styled from 'styled-components';

import { useTheme } from '@material-ui/core/styles';
import { CloudUploadOutlined as BaseCloudUploadIcon } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';

import parseTrackFiles from '../utils/parse-track-files';
import BaseFilePicker from './FilePicker';

const CloudUploadIcon = styled(BaseCloudUploadIcon)`
  margin-left: 10px;
`;

const DropZone = styled.div`
  width: 100%;
  padding: ${({ isDropActive }) => isDropActive ? '50px 15px' : '15px'};
  text-align: center;
  border: 3px dashed ${({ theme }) => theme.palette.grey["500"]};

  background: ${({ isDropActive, theme }) => isDropActive ? theme.palette.action.hover : 'none'}
`;

const FilePicker = styled(BaseFilePicker)`
  margin-top: 15px;
`;
// type TrackShape = {
//   track: string,
//   parsedTrack: any,
//   duration: number,
//   date: string
// };

// type Props = {
//   onChange: TrackShape => any,
//   className: string
// };

const TrackSelector = ({ className, onChange }) => {
  const theme = useTheme();
  const [isDropActive, setIsDropActive] = useState(false);
  const handleDropFiles = useCallback(async (event) => {
    event.preventDefault();
    setIsDropActive(false);
    try {
      event.persist();

      const filesToParse = [];
      for (let i = 0; i < event.dataTransfer.items.length; i++) {
        const item = event.dataTransfer.items[i];
        if (item.kind !== 'file') {
          continue;
        }
        const file = item.getAsFile();
        if (!file.name.toLowerCase().includes('.igc')) {
          continue;
        }
        filesToParse.push(file);
      }

      const files = await Promise.all(parseTrackFiles(filesToParse));
      onChange(files.filter(Boolean)); // remove failed files
    } catch(error) {
      console.error('Failed to parse dropped files.', error);
    }
  }, [onChange, setIsDropActive]);

  const handleFilePicker = useCallback(async (event) => {
    if (!event.target.files.length) {
      return;
    }
    try {
      // Allow async access to the event
      event.persist();

      const files = await Promise.all(parseTrackFiles(event.target.files));
      event.target.value = '';
      onChange(files.filter(Boolean)); // remove failed files
    } catch (error) {
      console.error('Failed to parse file.', error);
    }
  }, [onChange]);

  const pointerEventsStyle = {
    pointerEvents: isDropActive ? 'none' : 'all',
  };
  return (
    <DropZone
      theme={theme}
      className={className}
      isDropActive={isDropActive}
      onDrop={handleDropFiles}
      onDragOver={(event) => {
        event.preventDefault();
      }}
      onDragEnter={() => setIsDropActive(true)}
      onDragLeave={() => setIsDropActive(false)}
    >
      <Typography variant="body1" style={pointerEventsStyle}>
        Drag and drop .igc file here or
      </Typography>
      <FilePicker
        accept=".igc"
        multiple
        style={pointerEventsStyle}
        label={(
          <>
            select files
            <CloudUploadIcon />
          </>
        )}
        onChange={handleFilePicker}
      />
    </DropZone>
  );
};

TrackSelector.defaultProps = {
  className: '',
  onChange: () => undefined,
};

export default TrackSelector;
