import React from 'react';
import { Pane, Spinner } from 'evergreen-ui';

function Loader() {
  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      height={450}
    >
      <Spinner size={100} />
    </Pane>
  );
}

export default Loader;
