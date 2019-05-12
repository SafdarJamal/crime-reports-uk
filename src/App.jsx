import React, { Component, Fragment } from 'react';
import Header from './components/Header.jsx';
import SelectInput from './components/SelectInput.jsx';
import PrimaryButton from './components/PrimaryButton.jsx';
import DataTable from './components/DataTable.jsx';

import { Pane } from 'evergreen-ui';

import crimeCategories from './apis/crimeCategories';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    crimeCategories();
  }
  render() {
    return (
      <Fragment>
        <Header />
        <Pane
          elevation={1}
          marginTop={25}
          height={240}
          // height="26vh"
          width="100%"
          // display="flex"
          paddingRight={25}
          paddingLeft={25}
          background="tint2"
          alignItems="center"
          justifyContent="center"
          border="default"
        >
          <SelectInput />
          <SelectInput />
          <PrimaryButton />
        </Pane>
        <DataTable />
      </Fragment>
    );
  }
}

export default App;
