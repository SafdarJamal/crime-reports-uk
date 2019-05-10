import React, { Component } from 'react';
import { Button } from 'evergreen-ui';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Button>Hello World</Button>
      </div>
    );
  }
}

export default App;
