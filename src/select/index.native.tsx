import React, { useContext, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { isArray } from 'lodash';
import { Validator } from '../inputs/index.props';
import useStyles from '../apps/styles';
import { ABContext, AbsoluteComponent, measure, MeasureResult } from '../apps/utils';
import OptionList, { OptionProps } from './OptionList';

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

const STYLE_GROUP_NAME = 'ab-select';

const Select = React.memo((props: SelectProps) => {
  // const formContext = useContext(FormContext);
  const styles = useStyles(STYLE_GROUP_NAME);
  const abContext = useContext(ABContext);

  const children = isArray(props.children) ? props.children : [props.children];
  // @ts-ignore
  const options: OptionProps[] = props.options || children.map(({ props }) => ({ value: props?.value, text: props?.children }));

  const inputRef = useRef<any>();
  console.log(options);

  const { tpl, style } = props;

  let suffix = '';
  if (tpl && styles[`${STYLE_GROUP_NAME}-tpl-${tpl}`]) {
    suffix = `-tpl-${tpl}`;
  }

  const classes = [`${STYLE_GROUP_NAME}${suffix}`];

  let className = classes.concat(classes.map(v => v.substring(1)));
  const elementStyle = StyleSheet.flatten(className.map(v => styles[v]).concat([style]));

  const handlePress = async () => {
    if (!abContext || !abContext.addComponent) return;

    const offsets: MeasureResult = await measure(inputRef.current);

    const child: AbsoluteComponent = {
      child: <OptionList options={options} offsets={offsets} />,
      x: offsets.pageX,
      y: offsets.pageY,
    };
    abContext.addComponent(child);
  };

  return (
    <TouchableOpacity ref={e => (inputRef.current = e)} activeOpacity={1} onPress={handlePress} style={elementStyle}>
      <Text>aaa</Text>
    </TouchableOpacity>
  );
});

export default Select;
