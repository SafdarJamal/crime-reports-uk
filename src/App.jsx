import React, { Component, Fragment } from 'react';
import Header from './components/Header.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Header />
      </Fragment>
    );
  }
}

export default App;
