import React from 'react';
import { Select } from 'evergreen-ui';

function SelectInput(props) {
  // console.log(props.options);
  const { options, selected, handleSelect, num } = props;

  return (
    <Select
      width="100%"
      marginTop={25}
      height={50}
      value=""
      onChange={event => handleSelect(event.target.value, num)}
    >
      <option value="">{selected}</option>
      {options &&
        options.map((item, i) => (
          <option key={i + 1} value={num === 1 ? item.url : item.id}>
            {item.name}
          </option>
        ))}
    </Select>
  );
}

export default SelectInput;
