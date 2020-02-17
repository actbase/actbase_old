import React, { useCallback, useContext, useState } from 'react';
import { ABContext, TEXT_STYLE_NAMES } from '../App/utils';
import { omit, pick } from 'lodash';
import withStyles from 'react-jss';

const STYLE_GROUP_NAME = 'ab-button';

const Button = props => {
  const { size, type, style, children, disabled, onPress, onPressIn, onPressOut, forceInset, ...oProps } = props;

  const context = useContext(ABContext);
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

  const elementStyle = StyleSheet.flatten(className.map(v => styles[v]).concat([style]));

  let contents = children;
  if (process === 2) {
    contents = <span />;
  } else if (typeof contents === 'string') {
    contents = <span style={pick(elementStyle, TEXT_STYLE_NAMES)}>{props.children}</span>;
  }

  let Element1 = div;
  let Element2 = div;
  let args = {};
  let coverStyle = elementStyle;
  let innerStyle = {};

  return (
    <button onPress={handleClick} onPressIn={handlePressIn} onPressOut={handlePressOut} disabled={process > 0 || disabled} {...oProps}>
      <Element1 style={coverStyle} {...args}>
        <Element2 style={innerStyle} children={contents} />
      </Element1>
    </button>
  );
};

export default withStyles(styles, { name: 'MuiButton' })(Button);
