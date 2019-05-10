import React, { Component } from 'react';
import { Pane, Button, Heading, majorScale, BackButton } from 'evergreen-ui';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Pane display="flex" padding={16} background="tint2" borderRadius={3}>
        <Pane flex={1} alignItems="center" display="flex">
          <Heading size={600}>Left Aligned</Heading>
        </Pane>
        <Pane>
          {/* Below you can see the marginRight property on a Button. */}
          <Button marginRight={16} height={majorScale(5)}>
            Button
          </Button>
          <Button marginRight={16} appearance="primary" intent="success">
            Primary Button
          </Button>
          <Button appearance="primary" iconBefore="search">
            Primary Button
          </Button>
          <BackButton marginLeft={16}>Back</BackButton>
        </Pane>
      </Pane>
    );
  }
}

export default App;
