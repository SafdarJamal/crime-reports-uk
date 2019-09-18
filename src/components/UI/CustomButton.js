import React from 'react';
import { Button, majorScale } from 'evergreen-ui';

const CustomButton = props => {
  const { text, type, marginBottom, iconBefore, onClick } = props;

  return (
    <Button
      appearance={type}
      marginBottom={marginBottom}
      height={majorScale(5)}
      iconBefore={iconBefore}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
