import React, { Component } from 'react';
import {
  Pane,
  Button,
  Heading,
  majorScale,
  BackButton,
  Avatar
} from 'evergreen-ui';

function Header() {
  return (
    <Pane
      display="flex"
      padding={16}
      marginTop={12}
      background="overlay"
      borderRadius={3}
    >
      <Pane flex={1} alignItems="center" display="flex">
        <Avatar name="Crime App" size={40} marginRight={12} />
        <Heading size={600} color="white">
          Crime Database
        </Heading>
      </Pane>
      {/* <Pane>
          Below you can see the marginRight property on a Button.
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
        </Pane> */}
    </Pane>
  );
}

export default Header;
