// @flow
import { useRef, useEffect } from 'react';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

import { MAP_TILER_KEY } from '../../utils/constants';

const defaultInitialOptions = {
  center: [0, 0],
  zoom: 1,
};

export default function useMap(
  mapRoot,
  options,
  initialOptions = defaultInitialOptions,
)/* : [{ current: L.map }]  */ {
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current || !mapRoot.current) {
      return;
    }

    try {
      const map = L.map(mapRoot.current, {
        center: initialOptions.center,
        zoom: initialOptions.zoom,
      });
      mapRef.current = map;

      L.tileLayer(
        `https://api.maptiler.com/maps/topo/{z}/{x}/{y}.png?key=${MAP_TILER_KEY}`,
        {
          tileSize: 512,
          zoomOffset: -1,
          minZoom: 1,
          attribution:
            '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
          crossOrigin: true,
        },
      ).addTo(map);
    } catch (error) {
      console.error('Failed to initialize the map', error);
    }
  }, [mapRoot]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    console.log('[useMap] options changed', options.center, options.zoom);
    const map = mapRef.current;
    if (options.center && options.zoom) {
      map.setView(options.center, options.zoom);
    } else {
      if (options.center) {
        map.panTo(options.center);
      }
      if (options.zoom) {
        map.setZoom(options.zoom);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options)]);

  return [mapRef];
}
