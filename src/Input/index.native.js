import React from 'react';
import TextField from './TextField.native';

const INPUT_TYPES = {
  checkbox: null,
  radio: null,
  hidden: null,
};

const Input = props => {
  if (INPUT_TYPES[props?.type]) {
    const Element = INPUT_TYPES[props?.type];
    return <Element {...props} />;
  } else {
    return <TextField {...props} />;
  }
};

export default Input;
