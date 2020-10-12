import React from 'react';
import { Pane, Avatar, Heading } from 'evergreen-ui';
import logo from '../../images/logo.svg';

const Header = () => {
  return (
    <header>
      <Pane
        elevation={1}
        display="flex"
        padding={12}
        background="tint2"
        border={true}
        borderRadius={8}
        alignItems="center"
      >
        <Avatar name="Crime Reports UK" src={logo} size={40} marginRight={12} />
        <Heading size={600}>
          Browse Open Data about Crime and Policing in the UK
        </Heading>
      </Pane>
    </header>
  );
};

export default Header;
