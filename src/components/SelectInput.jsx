import React from 'react';
import { Select } from 'evergreen-ui';

function SelectInput(props) {
  // console.log(props.options);
  return (
    <Select
      width="100%"
      marginTop={25}
      height={50}
      onChange={event => alert(event.target.value)}
    >
      <option value="foo" checked>
        {props.default}
      </option>
      {props.options &&
        props.options.map((item, i) => (
          <option value={item.name}>{item.name}</option>
        ))}
    </Select>
  );
}

export default SelectInput;
