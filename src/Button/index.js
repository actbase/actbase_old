import React, { useCallback, useContext, useState } from 'react';
import { ABContext } from '../App/utils';

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

  let Element1 = View;
  let Element2 = View;
  let args = {};
  let coverStyle = elementStyle;
  let innerStyle = {};

  return <button></button>;
};

export default Button;
