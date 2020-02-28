import React from 'react';
import TextInput from '../textinput/TextInput';
import Hidden from './Hidden';
import { InputProps } from './res/types';

const INPUT_TYPES: { [key: string]: any } = {
  hidden: Hidden,
};

const Input = React.forwardRef((props: InputProps, ref: any) => {
  if (INPUT_TYPES[props?.type?.toLowerCase()]) {
    const Element = INPUT_TYPES[props?.type];
    return <Element ref={ref} {...props} />;
  } else {
    return <TextInput ref={ref} {...props} />;
  }
});

Input.defaultProps = {
  type: 'text',
  tpl: 'default',
};

export default Input;
