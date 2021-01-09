import { useEffect } from 'react';
import L from 'leaflet';

export default function useRenderPolyline(
  mapRef,
  latLngPoints, /* ?: Array<[number, number]> */
) {
  useEffect(() => {
    if (!mapRef.current || !latLngPoints) {
      return;
    }
    console.log('[useRenderPolyline] rendered polyline');
    const map = mapRef.current;
    const polyline = L.polyline(latLngPoints, { color: 'red' }).addTo(map);

    return () => {
      polyline.remove();
    };
  }, [latLngPoints, mapRef]);
}
