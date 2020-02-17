import React from 'react';
import TextField from './TextField';
import Hidden from './Hidden';
import { InputProps } from './index.props';

const INPUT_TYPES: { [key: string]: any } = {
  hidden: Hidden,
};

const Input = React.forwardRef((props: InputProps, ref: any) => {
  if (INPUT_TYPES[props?.type?.toLowerCase()]) {
    const Element = INPUT_TYPES[props?.type];
    return <Element ref={ref} {...props} />;
  } else {
    return <TextField ref={ref} {...props} />;
  }
});

Input.defaultProps = {
  type: 'text',
};

export default Input;
