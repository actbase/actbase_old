import React, { useEffect } from 'react';

import {
  Animated,
  Dimensions,
  findNodeHandle,
  Keyboard,
  Platform,
  ScrollView as RNScrollView,
  UIManager,
} from 'react-native';

const { height } = Dimensions.get('screen');

const measure = (target) => {
  return new Promise((resolve, reject) => {
    try {
      UIManager.measure(target, (originX, originY, width, height, pageX, pageY) => resolve({
        originX,
        originY,
        width,
        height,
        pageX,
        pageY,
      }));
    } catch (e) {
      reject(e);
    }
  });
};

const ScrollView = (props) => {
  let animated = null;
  let focusItem = null;
  const scrollRef = React.createRef();
  const keyboardHeight = new Animated.Value(0);

  const movePosition = async (posScroll, toValue) => {
    if (focusItem) {
      const posContainer = await measure(scrollRef.current.getInnerViewNode());
      const posFocus = await measure(focusItem);
      const offset = posScroll.pageY - posContainer.pageY;
      const y = (posFocus.pageY - posScroll.pageY);

      if (y < 0) {
        scrollRef.current?.scrollTo({ y: (offset + y) - 30, animated: true });
      } else {
        const nowY = posFocus.pageY - posScroll.pageY + 50;
        if (nowY > posScroll.height - toValue) {
          const moveY = offset + (nowY - (posScroll.height - toValue));
          scrollRef.current?.scrollTo({ y: moveY, animated: true });
        }
      }
    }
  };


  const handleKWS = async (e) => {
    const posScroll = await measure(findNodeHandle(scrollRef.current));
    const bottom = height - (posScroll.pageY + posScroll.height);
    const toValue = e.endCoordinates.height - bottom;
    if (animated) {
      animated.stop();
      animated = null;
    }
    keyboardHeight.setValue(toValue);
    await movePosition(posScroll, toValue);
  };

  const handleKWH = (e) => {
    if (animated) animated.stop();
    animated = Animated.timing(keyboardHeight, {
      duration: e.duration,
      toValue: 0,
    });
    animated.start();
  };

  const handleKDS = async (e) => {
    const posScroll = await measure(findNodeHandle(scrollRef.current));
    const bottom = height - (posScroll.pageY + posScroll.height);
    const toValue = e.endCoordinates.height - bottom;
    if (animated) {
      animated.stop();
      animated = null;
    }
    keyboardHeight.setValue(toValue);
    if (Platform.OS === 'android') {
      await movePosition(posScroll, toValue);
    }
  };

  const handleKDH = () => {
    if (animated) {
      animated.stop();
      animated = null;
    }
    keyboardHeight.setValue(0);
  };

  useEffect(() => {
    const listeners = [];
    if (Platform.OS === 'ios') {
      listeners.push(Keyboard.addListener('keyboardWillShow', handleKWS));
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

  const Element = props.onScroll ? Animated.ScrollView : RNScrollView;
  return (
    <Element
      ref={scrollRef}
      {...oProps}
      onFocus={(e) => {
        focusItem = findNodeHandle(e.target);
        onFocus && onFocus(e);
      }}
      onBlur={(e) => {
        focusItem = null;
        onBlur && onBlur(e);
      }}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps || 'handled'}
    >
      {children}
      <Animated.View style={{ height: keyboardHeight }}/>
    </Element>
  );

};

export default ScrollView;


