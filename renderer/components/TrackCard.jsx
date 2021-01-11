import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import BaseCard from '@material-ui/core/Card';
import BaseCardContent from '@material-ui/core/CardContent';
import BaseButton from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const BaseTrackMap = dynamic(() => import("./TrackMap"), { ssr: false });

const Card = styled(BaseCard)`
  display: flex;
  margin-top: 30px;
`;

const CardContent = styled(BaseCardContent)`
  min-width: 250px;
`;

const TrackMap = styled(BaseTrackMap)`
  width: calc(100% - 250px);
  height: ${({ isOpen }) => isOpen ? '400px' : '200px'};
`;

const Button = styled(BaseButton)`
  margin-top: 10px;

  & + button {
    margin-left: 5px;
  }
`;

function toHHMMSS(secs) {
  var sec_num = parseInt(secs, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
}

export default function TrackCard({
  trackId,
  date,
  duration,
  track,
  onRemove = () => undefined,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          Track: {trackId}
        </Typography>
        <Typography gutterBottom variant="body2" component="p">
          Date: {date}<br />
          Duration: {toHHMMSS(duration)}<br />
          Glider: {track.gliderType}<br />
          GPS points: {track.fixes.length}
        </Typography>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={onRemove}
        >
          Remove
        </Button>
      </CardContent>
      <TrackMap
        isOpen={isOpen}
        onChangeIsOpen={() => setIsOpen(!isOpen)}
        gpsTrack={track}
      />
    </Card>
  );
}
