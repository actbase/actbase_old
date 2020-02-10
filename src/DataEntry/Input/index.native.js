import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { isEqual, pick } from 'lodash';
import { FormContext } from '../Form/index.native';
import { ABContext, TEXT_STYLE_NAMES } from '../../App/utils.native';

const STYLE_GROUP_NAME = 'ab-input';

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderColor: '#e2e4ec',
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    fontSize: 20,
    lineHeight: 24,
    paddingTop: 0,
    paddingBottom: 0,
    flex: 1,
  },
});

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

const Input = props => {
  const {
    type,
    style,
    name,
    onChangeText,
    leftDeco,
    rightDeco,
    focusStyle,
    onBlur,
    onFocus,
    disabled,
    ...oProps
  } = props;

  const context = useContext(ABContext);
  const formContext = useContext(FormContext);
  // const styles = context.styles;

  const [extraProps, setExtraProps] = useState({});


  let suffix = '';
  if (type && styles[`${STYLE_GROUP_NAME}-type-${type}`]) {
    suffix = `-type-${type}`;
  }

  const classes = [`${STYLE_GROUP_NAME}${suffix}`];

  const [focused, setFocused] = useState(false);
  if (focused) classes.push(`${STYLE_GROUP_NAME}${suffix}-focused`);

  if (disabled) classes.push(`${STYLE_GROUP_NAME}${suffix}-disabled`);


  const handleChangeText = text => {
    onChangeText && onChangeText(text);
    formContext?.onChangeText && formContext?.onChangeText(name, text);
  };

  const handleProps = props => {
    console.log(props);
    if (!isEqual(props, extraProps)) {
      setExtraProps(p => ({ ...p, ...props }));
    }
  };

  const containerStyle = [],
    inputStyle = [props.inputStyle];
  if (focused) {
    containerStyle.push(focusStyle);
    inputStyle.push(pick(StyleSheet.flatten(focusStyle), TEXT_STYLE_NAMES));
  }

  if (props.multiline) {
    inputStyle.push({
      height: StyleSheet.flatten(style).height || '100%',
      textAlignVertical: 'top',
      paddingTop: 10,
      paddingHorizontal: 10,
      paddingBottom: 10,
    });
  }

  const containerStyle2 = {};

  if (disabled) {
    containerStyle2.backgroundColor = colors.very_light_pink;
  }

  let className = classes.concat(classes.map(v => v.substring(1)));

  const elementStyle = StyleSheet.flatten(
    className.map(v => styles[v]).concat([style]),
  );


  return (
    <View
      style={[
        styles.container,
        style,
        StyleSheet.flatten(containerStyle),
        containerStyle2,
      ]}
    >
      {leftDeco}
      <TextInput
        ref={el => formContext.addTarget && formContext.addTarget(name, el, handleProps)}
        onChangeText={handleChangeText}
        style={[styles.input, pick(style, TEXT_STYLE_NAMES), inputStyle]}
        onFocus={e => {
          setFocused(true);
          onFocus && onFocus(e);
        }}
        onBlur={e => {
          setFocused(false);
          onBlur && onBlur(e);
        }}
        editable={!disabled}
        {...propTemplate[type]}
        {...extraProps}
        {...oProps}
      />
      {rightDeco}
    </View>
  );
};

export default Input;
