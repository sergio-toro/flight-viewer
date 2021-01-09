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
        onChange={(parsedTracks) => {
          parsedTracks.forEach((track) => {
            trackListRef.current[track.trackId] = track;
          });
          
          setTracks([...tracks, ...parsedTracks.map(({ trackId }) => trackId)]);
        }}
      />

      {tracks && tracks.map((trackId) => {
        const item = trackListRef.current[trackId];
        return (
          <TrackCard 
            key={trackId}
            date={item.date}
            duration={item.duration}
            track={item.track}
          />
        );
      })}
    </>
  );
}
