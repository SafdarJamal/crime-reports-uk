import React from 'react';
import { Pane, Heading, Avatar } from 'evergreen-ui';

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
    </Pane>
  );
}

export default Header;
