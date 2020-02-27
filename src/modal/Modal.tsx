import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import { ABContext, getWindowSize } from '../common/utils';

export interface ModalProps extends ViewProps {
  children: ReactNode;
  isVisible: boolean;
  onModalShow: () => void;
  onModalWillShow: () => void;
  onModalHide: () => void;
  onModalWillHide: () => void;
  onBackButtonPress: () => void;
  onBackdropPress: () => void;
}

const Modal = (props: ModalProps) => {
  const { isVisible, children, onBackdropPress } = props;
  const abContext = useContext(ABContext);
  const viewRef = useRef<ReactNode | null>(null);
  const anim = React.useRef(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      const size = getWindowSize();
      const opacity = anim.current;
      const translateY = anim.current.interpolate({
        inputRange: [0, 1],
        outputRange: [size.height, 0],
      });

      viewRef.current = (
        <Animated.ScrollView
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', opacity }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Animated.View
            style={{
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
              transform: [{ translateY }],
            }}
          >
            <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onBackdropPress} />
            {children}
          </Animated.View>
        </Animated.ScrollView>
      );
      abContext?.attach?.(viewRef.current);
      Animated.timing(anim.current, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else if (!isVisible && viewRef.current) {
      Animated.timing(anim.current, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        abContext.detach?.(viewRef.current);
      });
    }
  }, [isVisible]);

  useEffect(() => {
    console.log('children change..')
    const size = getWindowSize();
    const opacity = anim.current;
    const translateY = anim.current.interpolate({
      inputRange: [0, 1],
      outputRange: [size.height, 0],
    });

    viewRef.current = (
      <Animated.ScrollView
        style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', opacity }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Animated.View
          style={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ translateY }],
          }}
        >
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onBackdropPress} />
          {children}
        </Animated.View>
      </Animated.ScrollView>
    );
  }, [children]);

  return null;
};

export default Modal;
