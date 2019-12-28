import React, {useContext, useState, useCallback, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {pick} from 'lodash';
import styles from './styles.css';
import {TEXT_STYLE_NAMES} from '../utils';

const Button = props => {
  const {
    color,
    size,
    theme,
    style,
    children,
    disabled,
    onPress,
    onPressIn,
    onPressOut,
    forceInset,
    ...oProps
  } = props;

  const classes = ['_ab-button'];

  const [press, setPress] = useState(false);
  if (press) classes.push('_ab-button-press');

  const [hover, setHover] = useState(false);
  if (hover) classes.push('_ab-button-hover');

  if (['xs', 'lg', 'xlg'].indexOf(size) >= 0)
    classes.push(`_ab-button-size-${size}`);

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

  const className = classes.concat(classes.map(v => v.substring(1)));
  const elementStyle = StyleSheet.flatten(
    className.map(v => styles[v]).concat([style]),
  );

  let contents = children;
  if (typeof contents === 'string') {
    contents = (
      <Text style={pick(elementStyle, TEXT_STYLE_NAMES)}>{props.children}</Text>
    );
  }

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      onPress={handleClick}
      disabled={process > 0 || disabled}
      style={elementStyle}
      // children={contents}
      {...oProps}>
      {process === 2 ? <ActivityIndicator /> : contents}
    </TouchableOpacity>
  );
};

export default Button;
