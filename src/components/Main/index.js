import React from 'react';
import PropTypes from 'prop-types';
import {
  Pane,
  // Alert,
  Select,
  Paragraph,
  Button,
  SearchIcon,
  majorScale
} from 'evergreen-ui';

const Main = ({
  categories,
  forces,
  category,
  force,
  date,
  setCategory,
  setForce,
  setDate,
  handleSearch,
  categoryIsInvalid,
  forceIsInvalid,
  // setCategoryIsInvalid,
  // setForceIsInvalid,
  isFetching
}) => {
  const years = [2017, 2018, 2019, 2020];
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

  const dates = [];

  for (let i = 0; i < years.length; i++) {
    for (let j = years[i] === 2017 ? 8 : 0; j < months.length; j++) {
      dates.unshift({
        key: `${months[j]} ${years[i]}`,
        value: `${years[i]}-${j + 1}`
      });
    }
  }

  dates.splice(0, 4);

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
          value={category}
          onChange={event => setCategory(event.target.value)}
          isInvalid={categoryIsInvalid}
          disabled={isFetching}
        >
          <option value="">Select Crime Category (Required)</option>
          {categories.map((category, i) => (
            <option key={i + 1} value={category.url}>
              {category.name}
            </option>
          ))}
        </Select>

        <Select
          required
          height={50}
          width="100%"
          marginBottom={25}
          name="force"
          value={force}
          onChange={event => setForce(event.target.value)}
          isInvalid={forceIsInvalid}
          disabled={isFetching}
        >
          <option value="">Select Police Force (Required)</option>
          {forces.map((force, i) => (
            <option key={i + 1} value={force.id}>
              {force.name}
            </option>
          ))}
        </Select>

        <Select
          height={50}
          width="100%"
          name="date"
          value={date}
          onChange={event => setDate(event.target.value)}
          disabled={isFetching}
        >
          {dates.map((date, i) => (
            <option key={i} value={date.value}>
              {date.key}
            </option>
          ))}
        </Select>

        <Paragraph size={500} marginTop={10} marginBottom={25}>
          Limit results to a specific month.
        </Paragraph>

        <Button
          appearance="primary"
          iconBefore={SearchIcon}
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
  categories: PropTypes.array.isRequired,
  forces: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  force: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  setForce: PropTypes.func.isRequired,
  setDate: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  categoryIsInvalid: PropTypes.bool.isRequired,
  forceIsInvalid: PropTypes.bool.isRequired,
  setCategoryIsInvalid: PropTypes.func.isRequired,
  setForceIsInvalid: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired
};

export default Main;
