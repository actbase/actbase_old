import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, ViewProps, BackHandler } from 'react-native';
import { getWindowSize } from '../common/utils';
import Absolute from '../apps/Absolute';

export interface ModalProps extends ViewProps {
  isVisible: boolean;
  onModalShow?: () => void;
  onModalWillShow?: () => void;
  onModalHide?: () => void;
  onModalWillHide?: () => void;
  onBackButtonPress?: () => void;
  onBackdropPress?: () => void;
}

const Modal: React.FC<ModalProps> = props => {
  const { isVisible, children, onBackdropPress, onBackButtonPress } = props;
  const anim = React.useRef<Animated.Value>(new Animated.Value(0));
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isVisible) {
      setVisible(true);
      Animated.timing(anim.current, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else if (!isVisible) {
      Animated.timing(anim.current, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
      });
    }
  }, [isVisible]);

  const size = getWindowSize();
  const opacity = anim.current;
  const translateY = anim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [size.height, 0],
  });

  React.useEffect(() => {
    if (onBackButtonPress) BackHandler.addEventListener('hardwareBackPress', onBackButtonPress);
    return () => {
      if (onBackButtonPress) BackHandler.removeEventListener('hardwareBackPress', onBackButtonPress);
    };
  }, [onBackButtonPress]);

  return (
    <Absolute isVisible={visible}>
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
    </Absolute>
  );
};

Modal.defaultProps = {
  onBackButtonPress: () => false,
};

export default Modal;
