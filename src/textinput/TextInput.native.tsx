import React, { useCallback, useState } from 'react';

import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

import { FormContext } from '../form/Form';
import { MARGIN_STYLES, TEXT_STYLE_NAMES } from '../common/utils';
import { InputProps } from '../inputs/res/types';
import { ExtraProps } from '../form/res/types';
import useError from '../inputs/useError';
import getResource from '../common/res.native';

const STYLE_GROUP_NAME = 'ab-input-text';

const propTemplate: { [key: string]: TextInputProps } = {
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

const TextField = React.forwardRef<TextInput, InputProps>((props, onRef: any) => {
  const {
    type,
    tpl,
    style,
    name,
    value,
    initValue,
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

  /** Form Context Sync **/
  const formContext = React.useContext(FormContext);
  const [error, onValidate] = useError(validators);

  const nameRef = React.useRef<number>(0);
  const nodeRef = React.useRef<TextInput>();

  const handleRef = (el: TextInput) => {
    nodeRef.current = el;

    if (typeof onRef === 'function') {
      onRef(el);
    } else if (onRef && Object.keys(onRef).indexOf('current') >= 0) {
      onRef.current = el;
    }

    formContext.subscribe?.(nameRef, el, {
      name,
      setProps,
      getValue,
      onValidate,
      focus: nodeRef.current?.focus,
      blur: nodeRef.current?.blur,
    });
  };

  React.useEffect(() => {
    if (props.validateMode === 'always') {
      onValidate(text, null);
    }
    return () => formContext.unsubscribe?.(nameRef);
  }, []);

  const [extraProps, setExtraProps] = React.useState<ExtraProps>({});
  const setProps = React.useCallback(
    (props: ExtraProps) => {
      if (!isEqual(props, extraProps)) {
        setExtraProps(p => Object.assign({ ...p, ...props }, multiline ? { onSubmitEditing: () => false } : {}));
      }
    },
    [extraProps, multiline],
  );
  /** Form Context Sync **/

  const [data, setData] = React.useState<string | null | undefined>(value || initValue);
  const text = value || data || '';

  const getValue = React.useCallback(() => {
    return text;
  }, [text]);

  /*** style dimensions ***/
  const classNames = [`${STYLE_GROUP_NAME}`];
  const hitClassNames = [`${STYLE_GROUP_NAME}-hint`];

  if (error) {
    classNames.push(`${STYLE_GROUP_NAME}-error`);
    hitClassNames.push(`${STYLE_GROUP_NAME}-hint-error`);
  }

  const [focused, setFocused] = useState(false);
  if (focused) classNames.push(`${STYLE_GROUP_NAME}-focused`);
  if (disabled) classNames.push(`${STYLE_GROUP_NAME}-disabled`);
  if (multiline) classNames.push(`${STYLE_GROUP_NAME}-multiline`);

  /*** event listener ***/
  const handleChangeText = useCallback(
    (text: string) => {
      onChangeText && onChangeText(text);
      setData?.(text);

      const validateEnabled =
        validateMode === 'always' ||
        validateMode === 'while-editing' ||
        validateMode === 'focus' ||
        (validateMode == 'submit' && extraProps.submitted);
      if (validateEnabled) onValidate(text, null);
    },
    [extraProps, validateMode, onValidate],
  );

  const handleFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(true);
      onFocus && onFocus(e);

      const validateEnabled = validateMode === 'focus';
      if (validateEnabled) onValidate(text, null);
    },
    [text, validateMode, onValidate],
  );

  const handleBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setFocused(false);
      onBlur && onBlur(e);

      const validateEnabled = validateMode === 'blur';
      if (validateEnabled) onValidate(text, null);
    },
    [text, validateMode, onValidate],
  );

  const handleClear = () => {
    nodeRef.current?.clear();
    setData('');
    onChangeText?.('');
  };

  const eProps: ExtraProps = {
    hint: extraProps.hint || props.hint,
    error: extraProps.error,
    submitted: extraProps.submitted || false,
  };

  /*** to Render ***/
  const r = getResource(STYLE_GROUP_NAME);
  const elementStyle = StyleSheet.flatten(
    classNames.map(v => [r.styles[v], r.styles[`${v}-tpl-${tpl}`]]).concat([style]),
  );

  const hintElStyle = StyleSheet.flatten(
    hitClassNames.map(v => [r.styles[v], r.styles[`${v}-tpl-${tpl}`]]).concat([hintStyle]),
  );

  const clearMode1 = focused && clearButtonMode === 'while-editing';
  const clearMode2 = !focused && clearButtonMode === 'unless-editing';
  const clearButtonEnabled = clearButtonMode !== 'never' && (clearButtonMode === 'always' || clearMode1 || clearMode2);

  return (
    <View style={pick(elementStyle, MARGIN_STYLES)}>
      <View
        style={[
          omit(elementStyle, MARGIN_STYLES),
          {
            flexDirection: 'row',
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
          editable={!disabled && !props.readonly && !extraProps.submitting}
          multiline={multiline}
          clearButtonMode={'never'}
          {...(!!type ? propTemplate[type] : {})}
          {...extraProps}
          {...oProps}
          value={text}
        />
        {clearButtonEnabled && (
          <TouchableOpacity onPress={handleClear} activeOpacity={0.2} style={r.styles['ab-input-text-clear']}>
            <View
              style={[
                r.styles['ab-input-text-clear-line'],
                {
                  transform: [{ rotateZ: '45deg' }],
                },
              ]}
            />
            <View
              style={[
                r.styles['ab-input-text-clear-line'],
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
