import React from 'react';
import { Pane, Avatar, Heading } from 'evergreen-ui';

const Header = () => {
  return (
    <Pane
      elevation={1}
      display="flex"
      padding={12}
      background="tint2"
      border={true}
      borderRadius={8}
      alignItems="center"
    >
      <Avatar name="Crime Reports" size={40} marginRight={12} />
      <Heading size={600}>
        Open Data about Crime and Policing in England
      </Heading>
    </Pane>
  );
};

export default Header;
