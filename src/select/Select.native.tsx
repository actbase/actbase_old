import React, { useContext, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import isArray from 'lodash/isArray';
import { Validator } from '../inputs/index.props';
import useStyles from '../apps/styles';
import { ABContext, measure, MeasureResult } from '../apps/utils';

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

export interface OptionProps {
  value?: any;
  children?: React.ReactNode;
  view?: React.ReactNode;
}

const STYLE_GROUP_NAME = 'ab-select';

const Select = React.memo((props: SelectProps) => {
  // const formContext = useContext(FormContext);
  const styles = useStyles(STYLE_GROUP_NAME);
  const abContext = useContext(ABContext);
  const [selected, setSelected] = useState<OptionProps | null>(null);

  const anim = React.useRef(new Animated.Value(0));
  const optionListView = useRef<React.ReactNode>();

  const children = isArray(props.children) ? props.children : [props.children];
  const options: OptionProps[] =
    props.options || children.map(element => ({ value: element?.props.value, view: element?.props.children }));

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
    Animated.timing(anim.current, {
      toValue: 0,
      duration: 200,
    }).start(() => {
      abContext.detach?.(optionListView.current);
    });

    if (option) {
      setSelected(option);
    }
  };

  const handlePress = async () => {
    if (!abContext || !abContext.attach) return;

    const offsets: MeasureResult = await measure(inputRef.current);
    const translateY = anim.current.interpolate({
      inputRange: [0, 1],
      outputRange: [-20, 0],
    });

    optionListView.current = (
      <>
        <TouchableOpacity style={{ flex: 1 }} onPress={handleRelease} />
        <View style={{ position: 'absolute', top: offsets.pageY + 38 + 5, left: offsets.pageX }}>
          <Animated.ScrollView
            style={{
              width: offsets.width,
              minHeight: offsets.height,
              opacity: anim.current,
              maxHeight: 200,
              backgroundColor: '#fff',
              borderWidth: 1,
              borderRadius: 4,
              borderColor: '#ddd',
              transform: [{ translateY }],
            }}
          >
            {options.map((option, index) => (
              <TouchableOpacity
                key={`${index}`}
                onPress={() => handleRelease(option)}
                style={{ height: 40, justifyContent: 'center', paddingHorizontal: 10 }}
              >
                {typeof option.view === 'string' ? <Text>{option.view}</Text> : option.view}
              </TouchableOpacity>
            ))}
          </Animated.ScrollView>
        </View>
      </>
    );

    abContext.attach(optionListView.current);
    Animated.timing(anim.current, {
      toValue: 1,
      duration: 300,
    }).start();
  };

  console.log(styles[`${STYLE_GROUP_NAME}${suffix}-arrow`]);

  const rotateZ = anim.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  return (
    <TouchableOpacity ref={e => (inputRef.current = e)} activeOpacity={1} onPress={handlePress} style={elementStyle}>
      <View style={{ flex: 1 }}>
        {!selected ? (
          <Text>입력하세여</Text>
        ) : typeof selected.view === 'string' ? (
          <Text>{selected.view}</Text>
        ) : (
          selected.view
        )}
      </View>
      <Animated.Image
        source={require('../../assets/arrow_down.png')}
        style={{ width: 20, height: 20, transform: [{ rotateZ }] }}
      />
    </TouchableOpacity>
  );
});

export default Select;
