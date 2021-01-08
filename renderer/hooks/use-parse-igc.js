import { useMemo } from 'react';
import IGCParser from 'igc-parser';

export default function useParseIgc(igcTrack) {
  return useMemo(() => igcTrack && IGCParser.parse(igcTrack), [igcTrack]);
}
