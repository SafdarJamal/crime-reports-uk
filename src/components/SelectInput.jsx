import React from 'react';
import { Select } from 'evergreen-ui';

function SelectInput(props) {
  // console.log(props.options);
  const { options, selected, handleClick1, handleClick2 } = props;
  if (handleClick1) {
  }
  return (
    <Select
      width="100%"
      marginTop={25}
      height={50}
      onChange={event => alert(event.target.value)}
    >
      <option value="Please select one!" checked>
        {selected}
      </option>
      {options &&
        options.map(item => <option value={item.url}>{item.name}</option>)}
    </Select>
  );
}

export default SelectInput;
