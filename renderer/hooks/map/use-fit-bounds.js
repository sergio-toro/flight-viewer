// @flow
import { useEffect, useMemo } from 'react';

import calculateBounds from '../../utils/map/calculate-bounds';
// type LatLngShape = [number, number];
// type ObjectLatLngShape = {
//   latlng: LatLngShape,
// };
export default function useFitBounds(
  mapRef,
  ...latLngParams/* : Array<
    null | typeof undefined | LatLngShape | ObjectLatLngShape | Array<any>
  > */
) {
  const mapBounds = useMemo(
    () => calculateBounds(latLngParams),
    [...latLngParams], // eslint-disable-line react-hooks/exhaustive-deps
  );

  useEffect(() => {
    if (!mapRef.current || !mapBounds.length) {
      return;
    }
    console.log('[useFitBounds] map.fitBounds() called');
    const map = mapRef.current;
    map.fitBounds(mapBounds, { padding: [10, 10] });
  }, [JSON.stringify(mapBounds), mapRef]); // eslint-disable-line react-hooks/exhaustive-deps
}
