import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { TEXT_STYLE_NAMES } from '../App/utils';
import { FormContext } from '../Form';
import { isEqual, omit, pick } from 'lodash';
import useStyles from '../App/styles';

const STYLE_GROUP_NAME = 'ab-button';

export interface ButtonProps {
  type: 'button' | 'submit';
  tpl?: string;
  disabled: boolean;
  onPress?: () => any;
  onClick?: () => any;
  onPressIn?: (e: any) => any;
  onPressOut?: (e: any) => any;
  forceInset: any;
  style?: any;
  children?: any;
}

export interface ButtonExtraProps {
  submitting?: boolean;
}

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  const { type, tpl, style, children, disabled, onPress, onPressIn, onPressOut, forceInset, ...oProps } = props;

  const styles = useStyles(STYLE_GROUP_NAME);
  const nameRef = useRef<number>(0);

  const formContext = useContext(FormContext);

  const [extraProps, setExtraProps] = useState<ButtonExtraProps>({});
  const setProps = useCallback(
    (props: ButtonExtraProps) => {
      if (!isEqual(props, extraProps) && type === 'submit') {
        setExtraProps(p => ({ ...p, ...props }));
      }
    },
    [extraProps],
  );

  let suffix = '';
  if (tpl && styles[`${STYLE_GROUP_NAME}-tpl-${tpl}`]) {
    suffix = `-tpl-${tpl}`;
  }
  const classes = [`${STYLE_GROUP_NAME}${suffix}`];

  const [press, setPress] = useState(false);
  if (press) classes.push(`${STYLE_GROUP_NAME}${suffix}-press`);
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
  const handleClick = useCallback(() => {
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
  }, [process]);

  let className = classes.concat(classes.map(v => v.substring(1)));

  const elementStyle = StyleSheet.flatten(className.map(v => styles[v]).concat([style]));

  let contents = children;
  if (process === 2 || (extraProps?.submitting && !onPress)) {
    contents = <ActivityIndicator />;
  } else if (typeof contents === 'string') {
    contents = <Text style={pick(elementStyle, TEXT_STYLE_NAMES)}>{props.children}</Text>;
  }

  let Element1: any = View;
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

  useEffect(() => () => formContext.unsubscribe?.(nameRef), []);

  return (
    <TouchableWithoutFeedback
      ref={el => formContext.subscribe?.(nameRef, el, { setProps })}
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
};

Button.defaultProps = {
  type: 'submit',
  disabled: false,
};

export default Button;
