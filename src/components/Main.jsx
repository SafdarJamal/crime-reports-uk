import React from 'react';
import { Pane } from 'evergreen-ui';

import SelectInput from './SelectInput';
import PrimaryButton from './PrimaryButton';

function Main(props) {
  const {
    categoryOptions,
    forceOptions,
    handleSelect,
    getCrimeReports
  } = props;

  return (
    <Pane
      elevation={1}
      marginTop={25}
      height={240}
      width="100%"
      paddingRight={25}
      paddingLeft={25}
      background="tint2"
      alignItems="center"
      justifyContent="center"
      border="default"
    >
      <SelectInput
        options={categoryOptions}
        selected="Select Crime Category"
        handleSelect={handleSelect}
        name="category"
      />
      <SelectInput
        options={forceOptions}
        selected="Select Police Force"
        handleSelect={handleSelect}
        name="force"
      />
      <PrimaryButton getCrimeReports={getCrimeReports} />
    </Pane>
  );
}

export default Main;
