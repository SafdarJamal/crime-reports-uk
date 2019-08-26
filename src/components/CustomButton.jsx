import React from 'react';
import { Button, majorScale } from 'evergreen-ui';

function CustomButton(props) {
  const { text, type, intent, marginBottom, iconBefore, onClick } = props;

  return (
    <Button
      appearance={type}
      intent={intent}
      marginBottom={marginBottom}
      height={majorScale(5)}
      iconBefore={iconBefore}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default CustomButton;
