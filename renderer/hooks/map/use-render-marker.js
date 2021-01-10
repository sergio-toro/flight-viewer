import { useEffect } from 'react';
import L from 'leaflet';

export default function useRenderMarker(
  mapRef,
  latLngPoints, /* ?: Array<[number, number]> */
  Icon,
  title,
) {
  useEffect(() => {
    if (!mapRef.current || !latLngPoints) {
      return;
    }
    const map = mapRef.current;

    const iconOptions = { title, riseOnHover: true };
    const marker = L.marker(latLngPoints, {
      icon: Icon(iconOptions),
    });

    marker.bindTooltip(title);
    marker.addTo(map);
    return () => {
      marker.remove();
    };
  }, [latLngPoints, mapRef]);
}
