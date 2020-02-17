import PropTypes from 'prop-types';
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { ABContext, TEXT_STYLE_NAMES } from '../App/utils';
import { FormContext } from '../Form';
import { isEqual, omit, pick } from 'lodash';
import useStyles from '../App/styles';

const STYLE_GROUP_NAME = 'ab-button';

const Button = React.memo(props => {
  const { type, tpl, style, children, disabled, onPress, onPressIn, onPressOut, forceInset, ...oProps } = props;

  const styles = useStyles(STYLE_GROUP_NAME);

  const fname = useRef(null);
  const context = useContext(ABContext);
  const formContext = useContext(FormContext);
  // const styles = context.styles;

  const [extraProps, setExtraProps] = useState({});

  let suffix = '';
  if (tpl && styles[`${STYLE_GROUP_NAME}-tpl-${tpl}`]) {
    suffix = `-tpl-${tpl}`;
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

  const setProps = props => {
    if (!isEqual(props, extraProps) && type === 'submit') {
      setExtraProps(p => ({ ...p, ...props }));
    }
  };

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

  const elementStyle = StyleSheet.flatten(className.map(v => styles[v]).concat([style]));

  let contents = children;
  if (process === 2 || (extraProps?.submitting && !onPress)) {
    contents = <ActivityIndicator />;
  } else if (typeof contents === 'string') {
    contents = <Text style={pick(elementStyle, TEXT_STYLE_NAMES)}>{props.children}</Text>;
  }

  let Element1 = View;
  let Element2 = View;
  let args = {};
  let coverStyle = elementStyle;
  let innerStyle = {};

  if (forceInset) {
    Element1 = SafeAreaView;
    Element2 = View;
    coverStyle = omit(elementStyle, ['height', 'minHeight', 'maxHeight', 'borderRadius']);
    innerStyle = pick(elementStyle, ['height', 'minHeight', 'maxHeight', 'alignItems', 'justifyContent']);
  }

  useEffect(() => () => formContext.unsubscribe?.(fname), []);

  return (
    <TouchableWithoutFeedback
      ref={el => formContext.subscribe?.(fname, el, { setProps })}
      onPress={handleClick}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={process > 0 || disabled || extraProps?.submitting}
      {...oProps}
    >
      <Element1 style={coverStyle} {...args}>
        <Element2 style={innerStyle} children={contents} />
      </Element1>
    </TouchableWithoutFeedback>
  );
});

Button.propTypes = {
  type: PropTypes.oneOf(['button', 'submit']),
  ...View.propTypes,
};

Button.defaultProps = {
  type: 'submit',
};

export default Button;
