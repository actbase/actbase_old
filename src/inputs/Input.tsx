import React from 'react';
import TextInput from '../textinput/TextInput';
import Hidden from './Hidden';
import { InputProps } from './res/types';
import { TextInput as RNTextInput } from 'react-native';

const INPUT_TYPES: { [key: string]: any } = {
  hidden: Hidden,
};

const Input = React.forwardRef<RNTextInput, InputProps>((props, ref) => {
  const Element = INPUT_TYPES[props?.type?.toLowerCase() || ''];
  if (Element) {
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
