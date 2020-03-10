import React, { useCallback, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { TEXT_STYLE_NAMES } from '../common/utils';
import { FormContext } from '../form/Form';
import { isEqual, omit, pick } from 'lodash';
import { ExtraProps } from '../form/res/types';
import { ButtonProps } from './res/props';
import getResource from '../common/res.native';

const STYLE_GROUP_NAME = 'ab-button';

const Button: React.FC<ButtonProps> = (iProps: ButtonProps) => {
  const { type, tpl, style, children, disabled, onPressIn, onPressOut, forceInset, ...oProps } = iProps;

  /** Form Context Sync **/
  const formContext = React.useContext(FormContext);

  const nameRef = React.useRef<number>(0);
  const nodeRef = React.useRef<any>();

  const handleRef = (el: any) => {
    nodeRef.current = el;
    if (type !== 'button' && !(oProps.onPress || oProps.onClick)) {
      formContext.subscribe?.(nameRef, el, {
        setProps,
      });
    }
  };

  React.useEffect(() => {
    return () => formContext.unsubscribe?.(nameRef);
  }, []);

  const [extraProps, setExtraProps] = React.useState<ExtraProps>({});
  const setProps = React.useCallback(
    (props: ExtraProps) => {
      if (!isEqual(props, extraProps)) {
        setExtraProps(p => ({ ...p, ...props }));
      }
    },
    [extraProps],
  );
  /** Form Context Sync **/

  /*** style dimensions ***/
  const classNames = [`${STYLE_GROUP_NAME}`];

  /*** event listener ***/
  const [press, setPress] = useState(false);
  if (press) classNames.push(`${STYLE_GROUP_NAME}-press`);
  if (disabled) classNames.push(`${STYLE_GROUP_NAME}-disabled`);

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

    const onPress = props.onPress || props.onClick;
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
  }, [process, formContext]);

  /*** to Render ***/
  const r = getResource(STYLE_GROUP_NAME);
  const elementStyle = StyleSheet.flatten(
    classNames.map(v => [r.styles[v], r.styles[`${v}-tpl-${tpl}`]]).concat([style]),
  );

  const props = { ...oProps, ...extraProps };

  let contents = children;
  if (process === 2 || props?.submitting) {
    contents = <ActivityIndicator color={elementStyle?.color || '#333'} />;
  } else if (typeof contents === 'string') {
    contents = <Text style={pick(elementStyle, TEXT_STYLE_NAMES)}>{children}</Text>;
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

  return (
    <TouchableWithoutFeedback
      ref={handleRef}
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
  tpl: 'default',
  disabled: false,
};

export default Button;
