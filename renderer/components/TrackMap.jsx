// @flow
import React, { useMemo, useRef, useEffect } from 'react';
import styled from 'styled-components';

import BaseButton from '@material-ui/core/Button';

import useFitBounds from '../hooks/map/use-fit-bounds';
import useRenderPolyline from '../hooks/map/use-render-polyline';
import useRenderMarker from '../hooks/map/use-render-marker';

import calculateBounds from '../utils/map/calculate-bounds';

import DefaultIcon from './map-icons/DefaultIcon';
import LandingIcon from './map-icons/LandingIcon';

import BaseMap from './BaseMap';

const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const Map = styled(BaseMap)`
  outline: none;
  width: 100%;
  height: 100%;

  z-index: 10;
`;

const MapActions = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;

  z-index: 15;

`;

const Button = styled(BaseButton)`
  & + button {
    margin-left: 5px;
  }
`;

// type PointShape = {
//   id: string,
//   name: string,
//   latlng: [number, number],
// };
// type Props = {
//   className: string,
//   gpsTrack?: {
//     fixes: {
//       latitude: number,
//       longitude: number,
//     }[],
//   },
//   launch?: PointShape,
//   nearLaunches: Array<PointShape>,
//   onLaunchChange: Function,
//   landing?: PointShape,
//   nearLandings: Array<PointShape>,
//   onLandingChange: Function,
// };

const TrackMap = ({
  className,
  gpsTrack,
  isOpen,
  onChangeIsOpen,
}) => {
  const mapRef = useRef();
  const flightTrack = useMemo(() => {
    if (!gpsTrack || !gpsTrack.fixes) {
      return;
    }
    return gpsTrack.fixes.map(point => {
      return [point.latitude, point.longitude];
    });
}, [JSON.stringify(gpsTrack)]); // eslint-disable-line react-hooks/exhaustive-deps
  const bounds = useMemo(() => calculateBounds(flightTrack), [flightTrack]);

  useRenderPolyline(mapRef, flightTrack);
  useRenderMarker(mapRef, flightTrack[0], DefaultIcon, 'Launch');
  useRenderMarker(mapRef, flightTrack[flightTrack.length - 1], LandingIcon, 'Landing');

  useFitBounds(mapRef, flightTrack);

  useEffect(() => {
    const map = mapRef.current;

    map.invalidateSize();
    map.fitBounds(bounds, { padding: [10, 10] });
  }, [isOpen])

  return (
    <Container className={className}>
      <MapActions>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            const map = mapRef.current;

            map.invalidateSize();
            map.fitBounds(bounds, { padding: [10, 10] });
          }}
          >
            Center
        </Button>

        <Button
          size="small"
          variant="contained"
          onClick={onChangeIsOpen}
        >
          {isOpen ? 'Reduce Map' : 'Enlarge Map'}
        </Button>
      </MapActions>
      <Map
        id="TrackMap"
        ref={mapRef}
        initialCenter={undefined}
      />
    </Container>
  );
};

TrackMap.defaultProps = {
  className: '',
  nearLaunches: [],
  onLaunchChange: () => undefined,
  nearLandings: [],
  onLandingChange: () => undefined,
};

export default TrackMap;
