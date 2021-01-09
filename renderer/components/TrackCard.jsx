import dynamic from 'next/dynamic';
import React from 'react';
import styled from 'styled-components';

import formatDuration from 'date-fns/formatDuration';

import BaseCard from '@material-ui/core/Card';
import BaseCardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// import useParseIgc from '../hooks/use-parse-igc';

const BaseTrackMap = dynamic(() => import("./TrackMap"), { ssr: false });

const Card = styled(BaseCard)`
  display: flex;
  margin-bottom: 30px;
`;

const CardContent = styled(BaseCardContent)`
  min-width: 60%;
`;

const TrackMap = styled(BaseTrackMap)`
  /* max-width: 300px; */
  max-height: 165px;
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

export default function TrackCard({ date, duration, track }) {

  console.log('track!', { track });

  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6" component="h2">
          Track: {date}
        </Typography>
        <Typography gutterBottom variant="body2" component="p">
          Glider: {track.gliderType}<br />
          Duration: {toHHMMSS(duration)}<br />
          GPS points: {track.fixes.length}
        </Typography>
      </CardContent>

      <TrackMap
        gpsTrack={track}
      />
    </Card>
  );
}
