import React from 'react';
import PropTypes from 'prop-types';
import {
  Pane,
  Alert,
  Select,
  Paragraph,
  Button,
  majorScale
} from 'evergreen-ui';

const Main = ({
  categoryOptions,
  forceOptions,
  categoryIsInvalid,
  forceIsInvalid,
  setCategory,
  setForce,
  setYear,
  setMonth,
  getCrimeReports
}) => {
  const date = new Date();
  const years = [2020, 2019, 2018, 2017];
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
        <Alert intent="danger" title="Please select crime category!" />
      )}

      {forceIsInvalid && (
        <Alert
          intent="danger"
          title="Please select police force!"
          marginBottom={25}
        />
      )}

      <Select
        height={50}
        width="100%"
        marginBottom={25}
        name="category"
        onChange={event => setCategory(event.target.value)}
      >
        <option value="">Select Crime Category (Required)</option>
        {categoryOptions.map((item, i) => (
          <option key={i + 1} value={item.url}>
            {item.name}
          </option>
        ))}
      </Select>

      <Select
        height={50}
        width="100%"
        marginBottom={25}
        name="force"
        onChange={event => setForce(event.target.value)}
      >
        <option value="">Select Police Force (Required)</option>
        {forceOptions.map((item, i) => (
          <option key={i + 1} value={item.id}>
            {item.name}
          </option>
        ))}
      </Select>

      <Select
        height={50}
        width="50%"
        name="year"
        onChange={event => setYear(event.target.value)}
      >
        <option value={date.getFullYear()}>Select Year (Optional)</option>
        {years.map((year, i) => (
          <option key={i + 1} value={year}>
            {year}
          </option>
        ))}
      </Select>

      <Select
        height={50}
        width="50%"
        name="month"
        onChange={event => setMonth(event.target.value)}
      >
        <option value={date.getMonth() + 1}>Select Month (Optional)</option>
        {months.map((months, i) => (
          <option key={i + 1} value={i + 1}>
            {months}
          </option>
        ))}
      </Select>

      <Paragraph size={500} marginTop={10} marginBottom={25}>
        Limit results to a specific month. The latest month will be shown by
        default.
      </Paragraph>

      <Button
        appearance="primary"
        iconBefore="search"
        height={majorScale(5)}
        onClick={getCrimeReports}
      >
        Search
      </Button>
    </Pane>
  );
};

Main.propTypes = {
  categoryOptions: PropTypes.array.isRequired,
  forceOptions: PropTypes.array.isRequired,
  categoryIsInvalid: PropTypes.bool.isRequired,
  forceIsInvalid: PropTypes.bool.isRequired,
  setCategory: PropTypes.func.isRequired,
  setForce: PropTypes.func.isRequired,
  setYear: PropTypes.func.isRequired,
  setMonth: PropTypes.func.isRequired,
  getCrimeReports: PropTypes.func.isRequired
};

export default Main;
