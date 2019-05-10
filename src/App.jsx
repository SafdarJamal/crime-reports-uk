import React, { Component, Fragment } from 'react';
import Header from './components/Header.jsx';
import SelectInput from './components/SelectInput.jsx';
import PrimaryButton from './components/PrimaryButton.jsx';
import DataTable from './components/DataTable.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Header />
        <SelectInput />
        <SelectInput />
        <PrimaryButton />
        <DataTable />
      </Fragment>
    );
  }
}

export default App;
