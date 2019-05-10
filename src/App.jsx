import React, { Component, Fragment } from 'react';
import Header from './components/Header.jsx';
import SelectInput from './components/SelectInput.jsx';

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
      </Fragment>
    );
  }
}

export default App;
