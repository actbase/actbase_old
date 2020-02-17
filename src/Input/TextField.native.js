import React, { useCallback, useContext, useRef, useState } from 'react';

import { StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import { isEqual, omit, pick } from 'lodash';
import { FormContext } from '../Form';
import { TEXT_STYLE_NAMES } from '../App/utils';
import useStyles from '../App/styles';

const STYLE_GROUP_NAME = 'ab-input-text';

const marginStyle = ['margin', 'marginHorizontal', 'marginVertical', 'marginTop', 'marginLeft', 'marginRight', 'marginBottom'];

const propTemplate = {
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

const TextField = React.forwardRef((props, ref) => {
  const {
    type,
    tpl,
    style,
    name,
    onChangeText,
    leftDeco,
    rightDeco,
    focusStyle,
    onBlur,
    onFocus,
    disabled,
    multiline,
    clearButtonMode,
    readonly,
    ...oProps
  } = props;

  const fname = useRef();
  const inputRef = useRef();
  const formContext = useContext(FormContext);
  const [text, setText] = useState(props?.value || '');
  const styles = useStyles(STYLE_GROUP_NAME);

  const [extraProps, setExtraProps] = useState({});

  let suffix = '';
  if (tpl && styles[`${STYLE_GROUP_NAME}-tpl-${tpl}`]) {
    suffix = `-tpl-${tpl}`;
  }

  const classes = [`${STYLE_GROUP_NAME}${suffix}`];

  const [focused, setFocused] = useState(false);
  if (focused) classes.push(`${STYLE_GROUP_NAME}${suffix}-focused`);
  if (disabled) classes.push(`${STYLE_GROUP_NAME}${suffix}-disabled`);
  if (multiline) classes.push(`${STYLE_GROUP_NAME}${suffix}-multiline`);

  const handleChangeText = text => {
    onChangeText && onChangeText(text);
    setText?.(text);
  };

  const setProps = useCallback(
    props => {
      if (!isEqual(props, extraProps)) {
        setExtraProps(p => ({ ...p, ...props }));
      }
    },
    [extraProps],
  );

  const getValue = () => {
    return text;
  };

  const handleRef = el => {
    inputRef.current = el;
    formContext.subscribe?.(fname, el, {
      name,
      setProps,
      getValue,
      hasError: () => false,
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
    });

    if (typeof ref === 'function') {
      ref(el);
    } else if (ref && Object.keys(ref).indexOf('current') >= 0) {
      ref.current = el;
    }
  };

  const handleClear = props => {
    inputRef.current?.clear();
    setText('');
  };

  const containerStyle = [],
    inputStyle = [props.inputStyle];
  if (focused) {
    containerStyle.push(focusStyle);
    inputStyle.push(pick(StyleSheet.flatten(focusStyle), TEXT_STYLE_NAMES));
  }

  let className = classes.concat(classes.map(v => v.substring(1)));

  const elementStyle = StyleSheet.flatten(className.map(v => styles[v]).concat([style]));

  //clearButtonMode !== 'never'

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
          onFocus={e => {
            setFocused(true);
            onFocus && onFocus(e);
          }}
          onBlur={e => {
            setFocused(false);
            onBlur && onBlur(e);
          }}
          editable={!disabled}
          multiline={multiline}
          clearButtonMode={'never'}
          {...propTemplate[type]}
          {...extraProps}
          {...oProps}
        />
        {!!text && focused && (
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
      {!!props?.hint && (
        <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
          <Text style={{ fontSize: 12, color: '#db2929' }}>{props?.hint}</Text>
        </View>
      )}
    </View>
  );
});

export default TextField;
