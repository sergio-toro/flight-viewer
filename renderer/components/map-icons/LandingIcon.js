// @flow
import L from 'leaflet';

import markerIcon from '../../public/icons/place-drop.svg';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

export default (options) =>
  L.icon({
    iconUrl: markerIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 37],
    popupAnchor: [12, -23],
    tooltipAnchor: [12, -23],
    shadowUrl: markerShadow,
    // shadowSize: [22, 94],
    shadowAnchor: [13, 41],
    ...options,
  });
