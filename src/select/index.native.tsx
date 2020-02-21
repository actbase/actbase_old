import React, { useContext, useRef } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { isArray } from 'lodash';
import { Validator } from '../inputs/index.props';
import useStyles from '../apps/styles';
import { ABContext, measure, MeasureResult } from '../apps/utils';
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
  children?: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
}

const STYLE_GROUP_NAME = 'ab-select';

const Select = React.memo((props: SelectProps) => {
  // const formContext = useContext(FormContext);
  const styles = useStyles(STYLE_GROUP_NAME);
  const abContext = useContext(ABContext);

  const anim = React.useRef(new Animated.Value(0));
  const optionListView = useRef<React.ReactNode>();

  const children = isArray(props.children) ? props.children : [props.children];
  const options: OptionProps[] = props.options || children.map(element => ({ value: element?.props.value, text: element?.props.children }));

  const inputRef = useRef<any>();
  const { tpl, style } = props;

  let suffix = '';
  if (tpl && styles[`${STYLE_GROUP_NAME}-tpl-${tpl}`]) {
    suffix = `-tpl-${tpl}`;
  }

  const classes = [`${STYLE_GROUP_NAME}${suffix}`];

  let className = classes.concat(classes.map(v => v.substring(1)));
  const elementStyle = StyleSheet.flatten(className.map(v => styles[v]).concat([style]));

  const handleRelease = (option?: any) => {
    console.log(option);
    abContext.detach?.(optionListView.current);
  };

  const handlePress = async () => {
    if (!abContext || !abContext.attach) return;

    const offsets: MeasureResult = await measure(inputRef.current);

    const maxHeight = anim.current.interpolate({
      inputRange: [0, 1],
      outputRange: [offsets.height, 200],
    });

    optionListView.current = (
      <>
        <TouchableOpacity style={{ flex: 1 }} onPress={handleRelease} />
        <View style={{ position: 'absolute', top: offsets.pageY + 38 + 5, left: offsets.pageX }}>
          <Animated.ScrollView
            style={{ width: offsets.width, minHeight: offsets.height, maxHeight, backgroundColor: '#fff', borderWidth: 1, borderRadius: 4, borderColor: '#ddd' }}
          >
            {options.map(option => (
              <TouchableOpacity onPress={() => handleRelease(option)} style={{ height: 40, justifyContent: 'center', paddingHorizontal: 10 }}>
                <Text>{option.text}</Text>
              </TouchableOpacity>
            ))}
          </Animated.ScrollView>
        </View>
      </>
    );

    abContext.attach(optionListView.current);

    console.log(offsets);
    //
    // const child: AbsoluteComponent = {
    //   child: (
    //
    //   ),
    //   x: offsets.pageX,
    //   y: offsets.pageY + 38 + 5,
    // };
    // console.log(child);
    // abContext.addComponent(child);
  };

  console.log(styles[`${STYLE_GROUP_NAME}${suffix}-arrow`]);

  return (
    <TouchableOpacity ref={e => (inputRef.current = e)} activeOpacity={1} onPress={handlePress} style={elementStyle}>
      <Text style={{ flex: 1 }}>aaa</Text>
      <Image source={require('../../assets/arrow_down.png')} style={{ width: 20, height: 20 }} />
    </TouchableOpacity>
  );
});

export default Select;
