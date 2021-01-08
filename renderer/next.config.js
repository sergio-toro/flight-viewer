const withTM = require('next-transpile-modules')([
  'drei',
  'three',
  'postprocessing',
  'react-three-fiber',
]);

module.exports = withTM();
