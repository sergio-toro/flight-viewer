/* global-s ipcRenderer */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button as BaseButton } from '@material-ui/core';

import TrackPicker from '../components/TrackPicker';
import TrackCard from '../components/TrackCard';

const Button = styled(BaseButton)`
  margin-top: 30px;
`;

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

          const updatedTracks = [
            ...parsedTracks.map(({ trackId }) => trackId),
            ...tracks,
          ];

          const filteredTracks = updatedTracks.filter(
            (item, pos) => updatedTracks.indexOf(item) === pos
          );

          setTracks(filteredTracks);
        }}
      />

      {tracks.length > 0 && (
        <Button 
          variant="contained" 
          color="default"
          onClick={() => {
            setTracks([]);
            trackListRef.current = {};
          }}
        >
          Clear tracks
        </Button>
      )}

      {tracks && tracks.map((trackId) => {
        const item = trackListRef.current[trackId];
        return (
          <TrackCard
            key={trackId}
            trackId={item.trackId}
            date={item.date}
            duration={item.duration}
            track={item.track}
            onRemove={() => {
              setTracks(tracks.filter(id => id !== trackId));
              delete trackListRef.current[trackId];
            }}
          />
        );
      })}
    </>
  );
}
