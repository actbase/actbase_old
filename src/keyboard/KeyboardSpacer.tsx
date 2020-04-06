import * as React from 'react';
import { Animated, Keyboard, KeyboardEvent, LayoutAnimation, Platform } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

const KeyboardSpacer = () => {
  const KeyboardHeight = React.useRef<Animated.Value>(new Animated.Value(0)).current;
  const safe = useSafeArea();

  React.useEffect(() => {
    const updateKeyboardSpace = (e: KeyboardEvent) => {
      if (!e.endCoordinates || !e.startCoordinates) {
        return;
      }
      LayoutAnimation.configureNext(LayoutAnimation.create(e.duration, LayoutAnimation.Types[e.easing]));
      KeyboardHeight.setValue(e.endCoordinates.height - (safe.bottom || 0));
    };

    const resetKeyboardSpace = (e: KeyboardEvent) => {
      LayoutAnimation.configureNext(LayoutAnimation.create(e.duration, LayoutAnimation.Types[e.easing]));
      KeyboardHeight.setValue(0);
    };

    const updateListener = Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const resetListener = Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';
    const listeners = [
      Keyboard.addListener(updateListener, updateKeyboardSpace),
      Keyboard.addListener(resetListener, resetKeyboardSpace),
    ];

    return () => {
      listeners.forEach(l => {
        l.remove();
      });
    };
  }, []);
  return <Animated.View style={{ height: KeyboardHeight }} />;
};

export default KeyboardSpacer;
