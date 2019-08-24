import React from 'react';
import { Button, majorScale } from 'evergreen-ui';

function CustomButton(props) {
  const { text, type, intent, marginTop, iconBefore, onClick } = props;

  return (
    <Button
      appearance={type}
      intent={intent}
      marginTop={marginTop}
      height={majorScale(5)}
      iconBefore={iconBefore}
      onClick={onClick}
    >
      {text}
    </Button>
  );
}

export default CustomButton;
