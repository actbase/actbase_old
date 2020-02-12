import React from 'react';
import TextField from './TextField.native';

const INPUT_TYPES = {
  checkbox: null,
  radio: null,
  hidden: null,
};

const Input = React.forwardRef((props, ref) => {
  if (INPUT_TYPES[props?.type]) {
    const Element = INPUT_TYPES[props?.type];
    return <Element ref={ref} {...props} />;
  } else {
    return <TextField ref={ref} {...props} />;
  }
});

export default Input;
