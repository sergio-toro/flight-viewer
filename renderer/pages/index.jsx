/* global-s ipcRenderer */
import React, { useRef, useState } from 'react';

import TrackPicker from '../components/TrackPicker';
import TrackCard from '../components/TrackCard';

export default function Home() {
  const trackListRef = useRef({});
  const [tracks, setTracks] = useState([]);
  return (
    <>
      <TrackPicker
        onChange={({
          track, date, duration, ...rest
        }) => {
          const trackId = `${date}-${duration}`;
          trackListRef.current[trackId] = {
            trackId, track, date, duration,
          };

          setTracks([...tracks, trackId]);
          // console.log('hello world track', { track, date, duration, rest });
        }}
      />

      {tracks && tracks.map((trackId) => {
        const item = trackListRef.current[trackId];
        return (
          <TrackCard date={item.date} track={item.track} />
        );
      })}
    </>
  );
}
