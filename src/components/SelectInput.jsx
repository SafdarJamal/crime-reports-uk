import React from 'react';
import { Select } from 'evergreen-ui';

function SelectInput(props) {
  const { name, selected, options, handleSelect } = props;
  // console.log(options);

  return (
    <Select
      width="100%"
      height={50}
      marginTop={25}
      value=""
      onChange={event => handleSelect(name, event.target.value)}
    >
      <option value="">{selected}</option>
      {options &&
        options.map((item, i) => (
          <option key={i + 1} value={name === 'category' ? item.url : item.id}>
            {item.name}
          </option>
        ))}
    </Select>
  );
}

export default SelectInput;
