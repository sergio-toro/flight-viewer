// @flow
import React, { forwardRef, useEffect, useRef } from 'react';
import styled from 'styled-components';

import useMap from '../hooks/map/use-map';

const Container = styled.div`
  width: 100%;
  min-height: 200px;
`;

// type Props = {
//   id: string,
//   className: string,
//   forwardedRef: any,
//   initialCenter: [number, number],
//   initialZoom: number,
//   center?: [number, number],
//   zoom?: number,
// };

const BaseMap = ({
  id,
  className,
  initialCenter,
  initialZoom,
  center,
  zoom,
  forwardedRef,
}) => {
  const rootRef = useRef();
  const [mapRef] = useMap(
    rootRef,
    {
      center,
      zoom,
    },
    { center: initialCenter, zoom: initialZoom },
  );
  useEffect(() => {
    if (mapRef.current && forwardedRef && !forwardedRef.current) {
      forwardedRef.current = mapRef.current;
    }
  }, [forwardedRef, mapRef]);
  return <Container id={id} ref={rootRef} className={className} />;
};

BaseMap.defaultProps = {
  center: undefined,
  initialCenter: [0, 0],
  initialZoom: 1,
};

export default forwardRef/* <Props, any> */((props, ref) => (
  <BaseMap {...props} forwardedRef={ref} />
));
