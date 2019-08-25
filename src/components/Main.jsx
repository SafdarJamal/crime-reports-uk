import React from 'react';
import { Pane, Paragraph } from 'evergreen-ui';

import CustomSelect from './CustomSelect';
import CustomButton from './CustomButton';

function Main(props) {
  const {
    categoryOptions,
    forceOptions,
    handleSelect,
    getCrimeReports
  } = props;

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  const years = [2017, 2018, 2019];
  const date = new Date();

  return (
    <Pane
      elevation={1}
      marginTop={25}
      height={350}
      width="100%"
      paddingRight={25}
      paddingLeft={25}
      background="tint2"
      alignItems="center"
      justifyContent="center"
      border="default"
    >
      <CustomSelect
        height={50}
        width="100%"
        marginTop={25}
        name="category"
        onChange={handleSelect}
      >
        <option value="">Select Crime Category (Required)</option>
        {categoryOptions.map((item, i) => (
          <option key={i + 1} value={item.url}>
            {item.name}
          </option>
        ))}
      </CustomSelect>
      <CustomSelect
        height={50}
        width="100%"
        marginTop={25}
        name="force"
        onChange={handleSelect}
      >
        <option value="">Select Police Force (Required)</option>
        {forceOptions.map((item, i) => (
          <option key={i + 1} value={item.id}>
            {item.name}
          </option>
        ))}
      </CustomSelect>
      <CustomSelect
        height={50}
        width="50%"
        marginTop={25}
        name="year"
        onChange={handleSelect}
      >
        <option value={date.getFullYear()}>Select Year (Optional)</option>
        {years.map((year, i) => (
          <option key={i + 1} value={year}>
            {year}
          </option>
        ))}
      </CustomSelect>
      <CustomSelect
        height={50}
        width="50%"
        marginTop={25}
        name="month"
        onChange={handleSelect}
      >
        <option value={date.getMonth()}>Select Month (Optional)</option>
        {months.map((months, i) => (
          <option key={i + 1} value={i}>
            {months}
          </option>
        ))}
      </CustomSelect>
      <Paragraph size={600} marginTop={10}>
        Limit results to a specific month. The latest month will be shown by
        default
      </Paragraph>
      <CustomButton
        text="Search"
        // type="primary"
        intent="success"
        marginTop={25}
        iconBefore="search"
        onClick={getCrimeReports}
      />
    </Pane>
  );
}

export default Main;
