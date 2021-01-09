// @flow
import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';

import useFitBounds from '../hooks/map/use-fit-bounds';
// import useRenderLaunches from '../hooks/map/useRenderLaunches';
// import useRenderLandings from '../hooks/map/useRenderLandings';
import useRenderPolyline from '../hooks/map/use-render-polyline';

import BaseMap from './BaseMap';

const MapContainer = styled(BaseMap)`
  width: 100%;
  height: 350px;
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
  // launch,
  // nearLaunches,
  // onLaunchChange,
  // landing,
  // nearLandings,
  // onLandingChange,
}) => {
  // const selectedLaunchId = launch && launch.id;
  // const selectedLandingId = landing && landing.id;
  const mapRef = useRef();
  const flightTrack = useMemo(() => {
    if (!gpsTrack || !gpsTrack.fixes) {
      return;
    }
    return gpsTrack.fixes.map(point => {
      return [point.latitude, point.longitude];
    });
  }, [JSON.stringify(gpsTrack)]); // eslint-disable-line react-hooks/exhaustive-deps

  // useRenderLaunches(
  //   mapRef,
  //   onLaunchChange,
  //   selectedLaunchId,
  //   launch,
  //   nearLaunches
  // );
  // useRenderLandings(
  //   mapRef,
  //   onLandingChange,
  //   selectedLandingId,
  //   landing,
  //   nearLandings
  // );
  useFitBounds(
    mapRef,
    // launch,
    // nearLaunches,
    // landing,
    // nearLandings,
    flightTrack,
  );
  useRenderPolyline(mapRef, flightTrack);

  return (
    <MapContainer
      id="TrackMap"
      className={className}
      ref={mapRef}
      initialCenter={
        undefined
        // (launch && launch.latlng) || (landing && landing.latlng) || undefined
      }
    />
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
