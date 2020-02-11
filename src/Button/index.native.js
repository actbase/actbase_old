import React, { useCallback, useContext, useState } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ABContext, TEXT_STYLE_NAMES } from '../App/utils';
import { FormContext } from '../Form/index.native';
import { omit, pick } from 'lodash';

const STYLE_GROUP_NAME = 'ab-button';

const Button = props => {
  const {
    size,
    type,
    style,
    children,
    disabled,
    onPress,
    onPressIn,
    onPressOut,
    forceInset,
    ...oProps
  } = props;

  const context = useContext(ABContext);
  const formContext = useContext(FormContext);
  const styles = context.styles;

  let suffix = '';
  if (type && styles[`${STYLE_GROUP_NAME}-type-${type}`]) {
    suffix = `-type-${type}`;
  }

  const classes = [`${STYLE_GROUP_NAME}${suffix}`];

  const [press, setPress] = useState(false);
  if (press) classes.push(`${STYLE_GROUP_NAME}${suffix}-press`);

  const [hover, setHover] = useState(false);
  if (hover) classes.push(`${STYLE_GROUP_NAME}${suffix}-hover`);

  if (disabled) classes.push(`${STYLE_GROUP_NAME}${suffix}-disabled`);

  const handlePressIn = useCallback(e => {
    onPressIn && onPressIn(e);
    setPress(true);
  }, []);

  const handlePressOut = useCallback(e => {
    onPressOut && onPressOut(e);
    setPress(false);
  }, []);

  const [process, setProcess] = useState(0);
  const handleClick = useCallback(
    e => {
      if (process > 0) return;
      setProcess(1);
      try {
        let isPromise = false;
        if (onPress) {
          const o = onPress && onPress();
          if (o instanceof Promise) {
            isPromise = true;
            setProcess(2);
            o.then(() => {
              setProcess(0);
            }).catch(e => {
              setProcess(0);
              console.warn(e);
            });
          }
        } else if (formContext?.submit) {
          const o = formContext?.submit && formContext?.submit();
          if (o instanceof Promise) {
            isPromise = true;
            setProcess(2);
            o.then(() => {
              setProcess(0);
            }).catch(e => {
              setProcess(0);
              console.warn(e);
            });
          }
        }

        if (!isPromise) setTimeout(() => setProcess(0), 200);
      } catch (e) {
        console.warn(e);
        setProcess(0);
      }
    },
    [process],
  );

  let className = classes.concat(classes.map(v => v.substring(1)));

  const elementStyle = StyleSheet.flatten(
    className.map(v => styles[v]).concat([style]),
  );

  let contents = children;
  if (process === 2) {
    contents = <ActivityIndicator />;
  } else if (typeof contents === 'string') {
    contents = (
      <Text style={pick(elementStyle, TEXT_STYLE_NAMES)}>{props.children}</Text>
    );
  }

  let Element1 = View;
  let Element2 = View;
  let args = {};
  let coverStyle = elementStyle;
  let innerStyle = {};

  if (forceInset) {
    Element1 = SafeAreaView;
    Element2 = View;
    coverStyle = omit(elementStyle, [
      'height',
      'minHeight',
      'maxHeight',
      'borderRadius',
    ]);
    innerStyle = pick(elementStyle, [
      'height',
      'minHeight',
      'maxHeight',
      'alignItems',
      'justifyContent',
    ]);
  }

  return (
    <TouchableWithoutFeedback
      onPress={handleClick}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={process > 0 || disabled}
      {...oProps}
    >
      <Element1 style={coverStyle} {...args}>
        <Element2 style={innerStyle} children={contents} />
      </Element1>
    </TouchableWithoutFeedback>
  );
};

export default Button;
