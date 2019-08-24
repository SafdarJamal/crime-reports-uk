import React from 'react';
import { Select } from 'evergreen-ui';

function CustomSelect(props) {
  const { height, width, marginTop, name, onChange } = props;

  return (
    <Select
      height={height}
      width={width}
      marginTop={marginTop}
      onChange={event => onChange(name, event.target.value)}
    >
      {props.children}
    </Select>
  );
}

export default CustomSelect;
