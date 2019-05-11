import React from 'react';
import { Pane, Heading, Avatar } from 'evergreen-ui';

function Header() {
  return (
    <Pane
      elevation={1}
      display="flex"
      padding={16}
      marginTop={10}
      background="overlay"
      borderRadius={3}
    >
      <Pane flex={1} alignItems="center" display="flex">
        <Avatar name="Crime Reports" size={40} marginRight={12} />
        <Heading size={600} color="white">
          Open Data about Crime and Policing in England
        </Heading>
      </Pane>
    </Pane>
  );
}

export default Header;
