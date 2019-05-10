import React from 'react';
import { Select } from 'evergreen-ui';

function SelectInput() {
  return (
    <Select
      width="100%"
      marginTop={25}
      height={50}
      onChange={event => alert(event.target.value)}
    >
      <option value="foo" checked>
        Foo
      </option>
      <option value="bar">Bar</option>
    </Select>
  );
}

export default SelectInput;
