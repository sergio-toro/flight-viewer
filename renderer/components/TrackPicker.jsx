import React, { Fragment } from 'react';
import IGCParser from 'igc-parser';
import styled from 'styled-components';
import { CloudUploadOutlined as BaseCloudUploadIcon } from '@material-ui/icons';

import readFileAsText from '../utils/read-file-as-text';

import FilePicker from './FilePicker';

const CloudUploadIcon = styled(BaseCloudUploadIcon)`
  margin-left: 10px;
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

const TrackSelector = ({ className, onChange }) => (
  <FilePicker
    className={className}
    accept=".igc"
    label={(
      <>
        Upload IGC Track
        <CloudUploadIcon />
      </>
      )}
    onChange={async (event) => {
      if (!event.target.files.length) {
        return;
      }
      try {
        // Allow async access to the event
        event.persist();

        const file = event.target.files[0];
        const content = await readFileAsText(file);

        const track = content.join('\n');
        const parsedTrack = IGCParser.parse(track);

        const startTimestamp = parsedTrack.fixes[0].timestamp;
        const endTimestamp = parsedTrack.fixes[parsedTrack.fixes.length - 1].timestamp;

        // Clear file
        event.target.value = '';

        onChange({
          track,
          parsedTrack,
          date: parsedTrack.date,
          duration: (endTimestamp - startTimestamp) / 1000,
        });
      } catch (error) {
        console.error('Failed to parse file.');
      }
    }}
  />
);

TrackSelector.defaultProps = {
  className: '',
  onChange: () => undefined,
};

export default TrackSelector;
