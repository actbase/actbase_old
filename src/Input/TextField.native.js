import React, { useContext, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { isEqual, omit, pick } from 'lodash';
import { FormContext } from '../Form/index.native';
import { ABContext, TEXT_STYLE_NAMES } from '../App/utils.native';

const STYLE_GROUP_NAME = 'ab-input-text';

const marginStyle = [
  'margin',
  'marginHorizontal',
  'marginVertical',
  'marginTop',
  'marginLeft',
  'marginRight',
  'marginBottom',
];

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
    ...oProps
  } = props;

  const context = useContext(ABContext);
  const formContext = useContext(FormContext);
  const [text, setText] = useState(props?.value || '');
  const styles = context.styles;

  const [extraProps, setExtraProps] = useState({});

  let suffix = '';
  if (type && styles[`${STYLE_GROUP_NAME}-type-${type}`]) {
    suffix = `-type-${type}`;
  }

  const classes = [`${STYLE_GROUP_NAME}${suffix}`];

  const [focused, setFocused] = useState(false);
  if (focused) classes.push(`${STYLE_GROUP_NAME}${suffix}-focused`);
  if (disabled) classes.push(`${STYLE_GROUP_NAME}${suffix}-disabled`);
  if (multiline) classes.push(`${STYLE_GROUP_NAME}${suffix}-multiline`);

  const handleChangeText = text => {
    onChangeText && onChangeText(text);
    setText?.(text);
    formContext?.onChangeText && formContext?.onChangeText(name, text);
  };

  const handleProps = props => {
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

  // if (props.multiline) {
  //   inputStyle.push({
  //     height: StyleSheet.flatten(style).height || '100%',
  //     textAlignVertical: 'top',
  //     paddingTop: 10,
  //     paddingHorizontal: 10,
  //     paddingBottom: 10,
  //   });
  // }
  //

  let className = classes.concat(classes.map(v => v.substring(1)));

  const elementStyle = StyleSheet.flatten(
    className.map(v => styles[v]).concat([style]),
  );

  console.log(elementStyle);

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
          ref={el =>
            formContext.addTarget &&
            formContext.addTarget(name, el, handleProps)
          }
          onChangeText={handleChangeText}
          style={[
            { flex: 1, height: elementStyle?.height },
            pick(elementStyle, TEXT_STYLE_NAMES),
          ]}
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
          {...propTemplate[type]}
          {...extraProps}
          {...oProps}
        />
        {!!text && !disabled && false && (
          <TouchableOpacity activeOpacity={1} style={styles['ab-input-clear']}>
            <View
              style={{
                position: 'absolute',
                transform: [{ rotateZ: '45deg' }],
                width: 2,
                height: 8,
                backgroundColor: styles['ab-input-clear'].color,
              }}
            />
            <View
              style={{
                position: 'absolute',
                transform: [{ rotateZ: '-45deg' }],
                width: 2,
                height: 8,
                backgroundColor: styles['ab-input-clear'].color,
              }}
            />
          </TouchableOpacity>
        )}
        {rightDeco}
      </View>
      {/*<View>*/}
      {/*  <Text>아이디 혹은 비밀번호가 올바르지 않습니다.</Text>*/}
      {/*</View>*/}
    </View>
  );
});

export default TextField;
