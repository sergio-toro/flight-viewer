// @flow
import { useEffect, useMemo } from 'react';

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
  const mapBounds = useMemo(() => {
    const bounds = [];
    latLngParams.forEach(param => {
      // drop null and undefined
      if (!param) {
        return;
      }

      if (typeof param === 'object' && param.latlng) {
        bounds.push(param.latlng);
        return;
      }

      // drop any non array value
      if (!Array.isArray(param) || !param.length) {
        return;
      }

      // handle [{ latlng: [lat, lng]}, ...] and [[lat, lng], ...]
      if (typeof param[0] === 'object' || Array.isArray(param[0])) {
        // $FlowFixM e
        param.forEach(row => {
          bounds.push(row.latlng ? row.latlng : row);
        });
        return;
      }

      // handle single [lat, lng]
      bounds.push(param);
    });
    return bounds;
  }, [...latLngParams]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!mapRef.current || !mapBounds.length) {
      return;
    }
    console.log('[useFitBounds] map.fitBounds() called');
    const map = mapRef.current;
    map.fitBounds(mapBounds, { padding: [5, 5] });
  }, [JSON.stringify(mapBounds), mapRef]); // eslint-disable-line react-hooks/exhaustive-deps
}
