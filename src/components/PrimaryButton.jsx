import React from 'react';
import { Button, majorScale } from 'evergreen-ui';

function PrimaryButton() {
  return (
    <Button
      appearance="primary"
      marginTop={25}
      height={majorScale(5)}
      iconBefore="search"
    >
      Primary Button
    </Button>
  );
}

export default PrimaryButton;
