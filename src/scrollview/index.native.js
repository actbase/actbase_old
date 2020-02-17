import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  Platform,
  ScrollView as RNScrollView,
} from 'react-native';
import { measure } from '../apps/utils';

const { height } = Dimensions.get('screen');

const ScrollView = props => {
  let animated = null;

  const refObject = useRef({
    scroll: null,
    container: null,
  }).current;
  const [focusItem, setFocusItem] = useState(null);
  const [footDimen, setFootDimen] = useState(0);

  const keyboardHeight = useRef(new Animated.Value(0)).current;

  const handleKDS = async e => {
    if (refObject?.scroll) {
      const posScroll = await measure(refObject?.scroll);
      const bottom = height - (posScroll.pageY + posScroll.height);
      const toValue = e.endCoordinates.height - bottom;
      setFootDimen(toValue);
      if (animated) {
        animated.stop();
        animated = null;
      }
      keyboardHeight.setValue(toValue > 0 ? toValue : 0);
    }
  };

  const handleKWH = e => {
    if (animated) {
      animated.stop();
      animated = null;
    }
    animated = Animated.timing(keyboardHeight, {
      duration: e.duration,
      toValue: 0,
    });
    animated.start();
  };

  const handleKDH = () => {
    if (animated) {
      animated.stop();
      animated = null;
    }
    keyboardHeight.setValue(0);
  };

  useEffect(() => {
    if (!focusItem || !footDimen) {
      return;
    }
    measure(refObject?.scroll)
      .then(async posScroll => {
        if (focusItem && refObject?.container) {
          const offsetY = (props?.offsetY || 0) + 50;
          const posContainer = await measure(refObject?.container);
          const posFocus = await measure(focusItem);
          const offset = posScroll.pageY - posContainer.pageY;
          const y = posFocus.pageY - posScroll.pageY;

          if (y < 0) {
            refObject?.scroll?.scrollTo({
              y: offset + y - 30,
              animated: true,
            });
          } else {
            const nowY = posFocus.pageY - posScroll.pageY + offsetY;
            if (nowY > posScroll.height - footDimen) {
              const moveY = offset + (nowY - (posScroll.height - footDimen));
              refObject?.scroll?.scrollTo({ y: moveY, animated: true });
            }
          }
        }
      })
      .catch(e => {});
  }, [focusItem, footDimen]);

  useEffect(() => {
    const listeners = [];
    if (Platform.OS === 'ios') {
      listeners.push(Keyboard.addListener('keyboardWillShow', handleKDS));
      listeners.push(Keyboard.addListener('keyboardWillHide', handleKWH));
    }
    listeners.push(Keyboard.addListener('keyboardDidShow', handleKDS));
    listeners.push(Keyboard.addListener('keyboardDidHide', handleKDH));

    return () => {
      listeners.forEach(listener => listener?.remove && listener?.remove());
    };
  }, []);

  const {
    keyboardShouldPersistTaps,
    onFocus,
    onBlur,
    children,
    ...oProps
  } = props;

  const Element = props?.onScroll ? Animated.ScrollView : RNScrollView;
  return (
    <Element
      ref={e => {
        if (e) {
          refObject.scroll = props?.onScroll ? e.getNode() : e;
        }
      }}
      {...oProps}
      onFocus={e => {
        setFocusItem(e.target);
        onFocus && onFocus(e);
      }}
      onBlur={e => {
        setFocusItem(null);
        onBlur && onBlur(e);
      }}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'handled'}
    >
      <Animated.View
        ref={e => (refObject.container = e?.getNode?.())}
        style={{ flexGrow: 1, marginBottom: keyboardHeight }}
      >
        {children}
      </Animated.View>
    </Element>
  );
};

export default ScrollView;
