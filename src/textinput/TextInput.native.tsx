import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { isEqual, isArray, omit, pick } from 'lodash';
import { ChildExtraProps, FormContext } from '../form/Form';
import { TEXT_STYLE_NAMES } from '../apps/utils';
import useStyles from '../apps/styles';
import { InputProps, ValidateResult, Validator } from '../inputs/index.props';

const STYLE_GROUP_NAME = 'ab-input-text';

const marginStyle = ['margin', 'marginHorizontal', 'marginVertical', 'marginTop', 'marginLeft', 'marginRight', 'marginBottom'];

const propTemplate: { [key: string]: any } = {
  email: {
    keyboardType: 'email-address',
    autoCorrect: false,
    autoCapitalize: 'none',
  },
  password: {
    secureTextEntry: true,
    autoCorrect: false,
    autoCapitalize: 'none',
  },
};

const TextField = React.forwardRef((props: InputProps, ref: any) => {
  const formContext = useContext(FormContext);

  const inputRef = useRef<any>();

  const styles = useStyles(STYLE_GROUP_NAME);

  const [extraProps, setExtraProps] = useState<ChildExtraProps>({});
  const setProps = useCallback(
    (props: ChildExtraProps) => {
      if (!isEqual(props, extraProps)) {
        setExtraProps(p => ({ ...p, ...props }));
      }
    },
    [extraProps],
  );

  const {
    type,
    tpl,
    style,
    name,
    onChangeText,
    leftDeco,
    rightDeco,
    onBlur,
    onFocus,
    disabled,
    multiline,
    clearButtonMode,
    validateMode,
    validators,
    hintStyle,
    ...oProps
  } = props;

  const eProps: ChildExtraProps = {
    hint: extraProps.hint || props.hint,
    error: extraProps.error,
    submited: extraProps.submited || false,
  };

  let suffix = '';
  if (tpl && styles[`${STYLE_GROUP_NAME}-tpl-${tpl}`]) {
    suffix = `-tpl-${tpl}`;
  }

  const classes = [`${STYLE_GROUP_NAME}${suffix}`];
  const hitClasses = [`${STYLE_GROUP_NAME}${suffix}-hint`];

  const [focused, setFocused] = useState(false);
  if (focused) classes.push(`${STYLE_GROUP_NAME}${suffix}-focused`);
  if (disabled) classes.push(`${STYLE_GROUP_NAME}${suffix}-disabled`);
  if (multiline) classes.push(`${STYLE_GROUP_NAME}${suffix}-multiline`);

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

  if (error) {
    classes.push(`${STYLE_GROUP_NAME}${suffix}-error`);
    hitClasses.push(`${STYLE_GROUP_NAME}${suffix}-hint-error`);
  }

  const [text, setText] = useState(props?.value || '');
  const handleChangeText = useCallback(
    (text: string) => {
      onChangeText && onChangeText(text);
      setText?.(text);

      const validateEnabled =
        validateMode === 'always' || validateMode === 'while-editing' || validateMode === 'focus' || (validateMode == 'submit' && extraProps.submited);
      if (validateEnabled) onValidate(text);
    },
    [extraProps, validateMode],
  );

  const handleFocus = useCallback(
    (e: any) => {
      setFocused(true);
      onFocus && onFocus(e);

      const validateEnabled = validateMode === 'focus';
      if (validateEnabled) onValidate(text);
    },
    [text, validateMode],
  );

  const handleBlur = useCallback(
    (e: any) => {
      setFocused(false);
      onBlur && onBlur(e);

      const validateEnabled = validateMode === 'blur';
      if (validateEnabled) onValidate(text);
    },
    [text, validateMode],
  );

  const getValue = useCallback(() => {
    return text;
  }, [text]);

  const nameRef = useRef<number>(0);
  useEffect(() => {
    if (props.validateMode === 'always') {
      onValidate(text);
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

    if (typeof ref === 'function') {
      ref(el);
    } else if (ref && Object.keys(ref).indexOf('current') >= 0) {
      ref.current = el;
    }
  };

  const handleClear = () => {
    inputRef.current?.clear();
    setText('');
  };

  let className = classes.concat(classes.map(v => v.substring(1)));
  const elementStyle = StyleSheet.flatten(className.map(v => styles[v]).concat([style]));

  const hintElStyle = StyleSheet.flatten(hitClasses.map(v => styles[v]).concat([hintStyle]));

  const clearMode1 = focused && clearButtonMode === 'while-editing';
  const clearMode2 = !focused && clearButtonMode === 'unless-editing';
  const clearButtonEnabled = clearButtonMode !== 'never' && (clearButtonMode === 'always' || clearMode1 || clearMode2);

  return (
    <View style={pick(elementStyle, marginStyle)}>
      <View
        style={[
          omit(elementStyle, marginStyle),
          {
            alignItems: 'center',
            height: 'auto',
            minHeight: elementStyle?.height,
          },
        ]}
      >
        {leftDeco}
        <TextInput
          ref={handleRef}
          onChangeText={handleChangeText}
          style={[{ flex: 1, height: elementStyle?.height }, pick(elementStyle, TEXT_STYLE_NAMES)]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={!disabled || !props.readonly || !extraProps.submitting}
          multiline={multiline}
          clearButtonMode={'never'}
          {...(!!type ? propTemplate[type] : {})}
          {...extraProps}
          {...oProps}
        />
        {clearButtonEnabled && (
          <TouchableOpacity onPress={handleClear} activeOpacity={0.2} style={styles['ab-input-text-clear']}>
            <View
              style={[
                styles['ab-input-text-clear-line'],
                {
                  transform: [{ rotateZ: '45deg' }],
                },
              ]}
            />
            <View
              style={[
                styles['ab-input-text-clear-line'],
                {
                  transform: [{ rotateZ: '-45deg' }],
                },
              ]}
            />
          </TouchableOpacity>
        )}
        {rightDeco}
      </View>
      {(!!error || !!eProps?.hint) && (
        <View style={omit(hintElStyle, TEXT_STYLE_NAMES)}>
          <Text style={pick(hintElStyle, TEXT_STYLE_NAMES)}>{error?.message || eProps?.hint}</Text>
        </View>
      )}
    </View>
  );
});

TextField.defaultProps = {
  clearButtonMode: 'never',
  validateMode: 'submit',
};

export default TextField;
