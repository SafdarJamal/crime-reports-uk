import React from 'react';
import { Pane, Paragraph, Alert } from 'evergreen-ui';

import CustomSelect from '../UI/CustomSelect';
import CustomButton from '../UI/CustomButton';

function Main(props) {
  const {
    categoryOptions,
    forceOptions,
    categoryIsInvalid,
    forceIsInvalid,
    handleSelect,
    getCrimeReports
  } = props;

  const date = new Date();
  const years = [2019, 2018, 2017];
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

  return (
    <Pane
      elevation={1}
      marginTop={25}
      width="100%"
      padding={25}
      background="tint2"
      alignItems="center"
      justifyContent="center"
      border="default"
      borderRadius={8}
    >
      {categoryIsInvalid && (
        <Alert intent="danger" title="Please Select Crime Category !" />
      )}

      {forceIsInvalid && (
        <Alert
          intent="danger"
          title="Please Select Police Force !"
          marginBottom={25}
        />
      )}

      <CustomSelect
        height={50}
        width="100%"
        marginBottom={25}
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
        marginBottom={25}
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

      <CustomSelect height={50} width="50%" name="year" onChange={handleSelect}>
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
        name="month"
        onChange={handleSelect}
      >
        <option value={date.getMonth() + 1}>Select Month (Optional)</option>
        {months.map((months, i) => (
          <option key={i + 1} value={i + 1}>
            {months}
          </option>
        ))}
      </CustomSelect>

      <Paragraph size={500} marginTop={10} marginBottom={25}>
        Limit results to a specific month. The latest month will be shown by
        default
      </Paragraph>

      <CustomButton
        type="primary"
        text="Search"
        marginTop={25}
        iconBefore="search"
        onClick={getCrimeReports}
      />
    </Pane>
  );
}

export default Main;
