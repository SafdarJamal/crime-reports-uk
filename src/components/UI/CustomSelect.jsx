import React from 'react';
import { Select } from 'evergreen-ui';

function CustomSelect(props) {
  const { children, height, width, marginBottom, name, onChange } = props;

  return (
    <Select
      height={height}
      width={width}
      marginBottom={marginBottom}
      onChange={event => onChange(name, event.target.value)}
    >
      {children}
    </Select>
  );
}

export default CustomSelect;
