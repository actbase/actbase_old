import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import isArray from 'lodash/isArray';
import { ValidateResult, Validator } from '../inputs/types';
import useStyles from '../apps/styles';
import { ABContext, MARGIN_STYLES, measure, MeasureResult, TEXT_STYLE_NAMES } from '../common/utils';
import { ChildExtraProps, FormContext } from '../form/Form';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import { OptionProps, SelectProps } from './types';

const STYLE_GROUP_NAME = 'ab-select';

const Select = React.memo((props: SelectProps) => {
  const formContext = useContext(FormContext);
  const styles = useStyles(STYLE_GROUP_NAME);
  const abContext = useContext(ABContext);

  const anim = React.useRef(new Animated.Value(0));
  const optionListView = useRef<React.ReactNode>();

  const children = isArray(props.children) ? props.children : [props.children];
  const options: OptionProps[] =
    props.options || children.map(element => ({ value: element?.props.value, view: element?.props.children }));

  const inputRef = useRef<any>();
  const { name, tpl, style, placeholder, value, validators, hintStyle } = props;
  const [selected, setSelected] = useState<OptionProps | null | undefined>(options?.find(v => v?.value === value));

  const [extraProps, setExtraProps] = useState<ChildExtraProps>({});
  const setProps = useCallback(
    (props: ChildExtraProps) => {
      if (!isEqual(props, extraProps)) {
        setExtraProps(p => ({ ...p, ...props }));
      }
    },
    [extraProps],
  );

  let suffix = '';
  if (tpl && styles[`${STYLE_GROUP_NAME}-tpl-${tpl}`]) {
    suffix = `-tpl-${tpl}`;
  }

  const classes = [`${STYLE_GROUP_NAME}${suffix}`];
  const hitClasses = [`${STYLE_GROUP_NAME}${suffix}-hint`];

  let className = classes.concat(classes.map(v => v.substring(1)));
  const elementStyle = StyleSheet.flatten(className.map(v => styles[v]).concat([style]));

  const handleRelease = (option?: any) => {
    Animated.timing(anim.current, {
      toValue: 0,
      duration: 150,
    }).start(() => {
      abContext.detach?.(optionListView.current);
    });

    if (option?.value) {
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
                key={`${option.value}${index}`}
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
      duration: 200,
    }).start();
  };

  const [error, setError] = useState<ValidateResult | null>(null);

  const onValidate = (value: any) => {
    if (!validators) return null;
    const _validators: Validator[] = isArray(validators) ? validators : [validators];

    let currentError: ValidateResult | null = null;
    for (const validator of _validators) {
      const err = validator(value);
      if (err) {
        currentError = err;
        break;
      }
    }

    setError(currentError);
    return currentError;
  };

  const rotateZ = anim.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  const getValue = useCallback(() => {
    return selected?.value;
  }, [selected]);

  const nameRef = useRef<number>(0);
  useEffect(() => {
    if (props.validateMode === 'always') {
      onValidate(selected?.value);
    }
    return () => formContext.unsubscribe?.(nameRef);
  }, []);

  const handleRef = (el: any) => {
    inputRef.current = el;
    formContext.subscribe?.(nameRef, el, {
      name,
      setProps,
      getValue,
      onValidate,
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
    });
  };

  const hintElStyle = StyleSheet.flatten(hitClasses.map(v => styles[v]).concat([hintStyle]));
  const eProps: ChildExtraProps = {
    hint: extraProps.hint || props.hint,
    error: extraProps.error,
    submited: extraProps.submited || false,
  };

  return (
    <View style={pick(elementStyle, MARGIN_STYLES)}>
      <TouchableOpacity
        ref={handleRef}
        activeOpacity={1}
        onPress={handlePress}
        style={omit(elementStyle, MARGIN_STYLES)}
      >
        <View style={{ flex: 1 }}>
          {!selected?.value ? (
            <Text>{placeholder}</Text>
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
      {(!!error || !!eProps?.hint) && (
        <View style={omit(hintElStyle, TEXT_STYLE_NAMES)}>
          <Text style={pick(hintElStyle, TEXT_STYLE_NAMES)}>{error?.message || eProps?.hint}</Text>
        </View>
      )}
    </View>
  );
});

export default Select;
