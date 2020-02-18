import React, { useContext } from 'react';
import View from '../web/View';
import { isArray } from 'lodash';
import { Validator } from '../inputs/index.props';
import { ABContext } from '../apps/utils';
import { TouchableOpacity } from 'react-native';

export interface SelectProps {
  name?: string;
  tpl?: string;
  value?: any;
  style?: any;

  hintStyle?: any;

  validateMode?: 'focus' | 'blur' | 'while-editing' | 'always' | 'submit' | 'never';
  validators?: Validator | Validator[];

  readonly?: boolean;
  disabled?: boolean;

  hint?: string;
  options?: OptionProps[];
  children?: React.ComponentType<OptionProps> | React.ComponentType<OptionProps>[];
}

export interface OptionProps {
  value?: any;
  children?: any;
  text?: string;
}

const Select = React.memo((props: SelectProps) => {
  const abContext = useContext(ABContext);
  const children = isArray(props.children) ? props.children : [props.children];
  // @ts-ignore
  const options: OptionProps[] = props.options || children.map(({ props }) => ({ value: props?.value, text: props?.children }));

  console.log(options);

  const handlePress = async () => {
    alert('a');


    // @ts-ignore
    abContext?.addComponent({
      child: <View style={{ width: 100, height: 100, backgroundColor: '#F00' }}></View>,
      x: 10,
      y: 10,
    });
  };

  return <TouchableOpacity onPress={handlePress} {...props} />;
});

export default Select;
