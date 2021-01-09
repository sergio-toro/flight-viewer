export default function readFileAsText(file/*: File */)/*: Promise<string[]> */ {
  // Always return a Promise
  return new Promise((resolve, reject) => {
    let content = '';
    const reader = new FileReader();
    // Wait till complete
    reader.onloadend = function (e) {
      content = e.target.result;
      const result = content.split(/\r\n|\n/);
      resolve(result);
    };
    // Make sure to handle error states
    reader.onerror = function (e) {
      console.log('readFileAsText', e)
      reject(e);
    };
    reader.readAsText(file);
  });
}
