import IGCParser from 'igc-parser';
import readFileAsText from './read-file-as-text';

export default function parseTrackFiles(files) {
	return Array.from(files).map(async (file) => {
	  try {
		const content = await readFileAsText(file);

		const track = content.join('\n');
		const parsedTrack = IGCParser.parse(track);

		const startTimestamp = parsedTrack.fixes[0].timestamp;
		const endTimestamp = parsedTrack.fixes[parsedTrack.fixes.length - 1].timestamp;

		return {
		  trackId: file.name,
		  track: parsedTrack,
		  date: parsedTrack.date,
		  duration: (endTimestamp - startTimestamp) / 1000,
		};
	  }
	  catch(error) {
		console.error(`FAILED to parse file ${file.name}`, error, file);
		return undefined;
	  }
	});
}
