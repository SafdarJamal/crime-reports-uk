import React, { Component, Fragment } from 'react';
import Header from './components/Header.jsx';
import SelectInput from './components/SelectInput.jsx';
import PrimaryButton from './components/PrimaryButton.jsx';
import DataTable from './components/DataTable.jsx';

import { Pane } from 'evergreen-ui';

import categories from './apis/categories';
import forces from './apis/forces';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categoryOptions: null,
      forceOptions: null
    };
  }

  componentDidMount() {
    categories().then(value1 => {
      forces().then(value2 => {
        this.setState({ categoryOptions: value1, forceOptions: value2 });
        // console.log(value);
      });
    });
  }

  render() {
    const { categoryOptions, forceOptions } = this.state;
    return (
      <Fragment>
        <Header />
        <Pane
          elevation={1}
          marginTop={25}
          height={240}
          width="100%"
          // display="flex"
          paddingRight={25}
          paddingLeft={25}
          background="tint2"
          alignItems="center"
          justifyContent="center"
          border="default"
        >
          <SelectInput
            options={categoryOptions}
            default="Select Crime Category"
          />
          <SelectInput options={forceOptions} default="Select Police Force" />
          <PrimaryButton />
        </Pane>
        <DataTable />
      </Fragment>
    );
  }
}

export default App;
