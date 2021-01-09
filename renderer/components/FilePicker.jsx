import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const HiddenInput = styled.input`
  display: none;
`;

// type Props = {
//   onChange: Function,
//   className: string,
//   accept: string,
//   label: React$Node
// };

const FilePicker = ({
  className, 
  label,
  accept,
  onChange,
  ...props
}) => (
  <>
    <HiddenInput
      accept={accept}
      id="outlined-button-file"
      type="file"
      onChange={onChange}
      {...props}
    />
    <label htmlFor="outlined-button-file">
      <Button className={className} color="primary" variant="outlined" component="span">
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
