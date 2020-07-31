import React from 'react';
import PropTypes from 'prop-types';
import {
  Pane,
  // Alert,
  Select,
  Paragraph,
  Button,
  majorScale
} from 'evergreen-ui';

const Main = ({
  categoryOptions,
  forceOptions,
  setCategory,
  setForce,
  setYear,
  setMonth,
  handleSearch,
  categoryIsInvalid,
  forceIsInvalid,
  // setCategoryIsInvalid,
  // setForceIsInvalid,
  isFetching
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
      padding={25}
      background="tint2"
      border={true}
      borderRadius={8}
    >
      <form onSubmit={handleSearch}>
        {/* {categoryIsInvalid && (
          <Alert
            intent="danger"
            title="Please select crime category!"
            marginBottom={25}
            isRemoveable={true}
            onRemove={() => setCategoryIsInvalid(false)}
          />
        )}

        {forceIsInvalid && (
          <Alert
            intent="danger"
            title="Please select police force!"
            marginBottom={25}
            isRemoveable={true}
            onRemove={() => setForceIsInvalid(false)}
          />
        )} */}

        <Select
          required
          height={50}
          width="100%"
          marginBottom={25}
          name="category"
          onChange={event => setCategory(event.target.value)}
          isInvalid={categoryIsInvalid}
          disabled={isFetching}
        >
          <option value="">Select Crime Category (Required)</option>
          {categoryOptions.map((item, i) => (
            <option key={i + 1} value={item.url}>
              {item.name}
            </option>
          ))}
        </Select>

        <Select
          required
          height={50}
          width="100%"
          marginBottom={25}
          name="force"
          onChange={event => setForce(event.target.value)}
          isInvalid={forceIsInvalid}
          disabled={isFetching}
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
          width="100%"
          marginBottom={25}
          name="year"
          onChange={event => setYear(event.target.value)}
          disabled={isFetching}
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
          width="100%"
          name="month"
          onChange={event => setMonth(event.target.value)}
          disabled={isFetching}
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
          disabled={isFetching}
        >
          {isFetching ? 'Searching...' : 'Search'}
        </Button>
      </form>
    </Pane>
  );
};

Main.propTypes = {
  categoryOptions: PropTypes.array.isRequired,
  forceOptions: PropTypes.array.isRequired,
  setCategory: PropTypes.func.isRequired,
  setForce: PropTypes.func.isRequired,
  setYear: PropTypes.func.isRequired,
  setMonth: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  categoryIsInvalid: PropTypes.bool.isRequired,
  forceIsInvalid: PropTypes.bool.isRequired,
  setCategoryIsInvalid: PropTypes.func.isRequired,
  setForceIsInvalid: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default Main;
