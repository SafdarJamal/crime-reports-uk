import React from 'react';
import { Button, majorScale } from 'evergreen-ui';

function PrimaryButton(props) {
  return (
    <Button
      appearance="primary"
      marginTop={25}
      height={majorScale(5)}
      iconBefore="search"
      onClick={props.getData}
    >
      Search
    </Button>
  );
}

export default PrimaryButton;
