import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';

// type Props = {
//   onChange: Function,
//   className: string,
//   accept: string,
//   label: React$Node
// };
const FilePicker = ({
  className,
  style,
  label,
  accept,
  multiple = false,
  onChange,
}) => (
  <>
    <input
      accept={accept}
      id="outlined-button-file"
      type="file"
      onChange={onChange}
      multiple={multiple}
      style={{ display: 'none' }}
    />
    <label htmlFor="outlined-button-file" style={style}>
      <Button 
        className={className}
        color="primary"
        variant="contained"
        component="span"
      >
        {label}
      </Button>
    </label>
  </>
);

FilePicker.defaultProps = {
  className: '',
  label: 'Upload',
  onChange: () => undefined,
};

export default FilePicker;
