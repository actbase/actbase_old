import React, {useCallback, useContext, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {omit, pick} from 'lodash';
import styles from './styles.css';
import {ABContext, TEXT_STYLE_NAMES} from '../utils';

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

  const classes = [`_${STYLE_GROUP_NAME}`];
  const context = useContext(ABContext);

  const [press, setPress] = useState(false);
  if (press) classes.push(`_${STYLE_GROUP_NAME}-press`);

  const [hover, setHover] = useState(false);
  if (hover) classes.push(`_${STYLE_GROUP_NAME}-hover`);

  if (disabled) classes.push(`_${STYLE_GROUP_NAME}-disabled`);

  if (['xs', 'lg'].indexOf(size) >= 0)
    classes.push(`_${STYLE_GROUP_NAME}-size-${size}`);

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
        const o = onPress && onPress();
        if (o instanceof Promise) {
          setProcess(2);
          o.then(() => {
            setProcess(0);
          }).catch(e => {
            setProcess(0);
            console.warn(e);
          });
        } else {
          setTimeout(() => setProcess(0), 200);
        }
      } catch (e) {
        console.warn(e);
        setProcess(0);
      }
    },
    [process],
  );

  let className = classes.concat(classes.map(v => v.substring(1)));
  if (type) {
    const ix = STYLE_GROUP_NAME.length + 1;
    className = className.concat(
      classes.map(v => `${STYLE_GROUP_NAME}-${type}${v.substring(ix)}`),
    );
  }

  const elementStyle = StyleSheet.flatten(
    className.map(v => context.theme[v] || styles[v]).concat([style]),
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
      'justifyContent'
    ]);
  }

  return (
    <TouchableWithoutFeedback
      onPress={handleClick}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={process > 0 || disabled}
      {...oProps}>
      <Element1 style={coverStyle} {...args}>
        <Element2 style={innerStyle} children={contents} />
      </Element1>
    </TouchableWithoutFeedback>
  );
};

export default Button;
