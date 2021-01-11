export default function calculateBounds(latLngParams) {
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
}
