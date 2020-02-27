import React, { ReactNode, useContext, useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity, ViewProps } from 'react-native';
import { ABContext, getWindowSize } from '../apps/utils';

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

const Modal = React.memo((props: ModalProps) => {
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
        // <>
        //   <View style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
        //   </View>
        //
        //   {/*      transform: [{ translateY }],*/}
        //   {/*    {options.map((option, index) => (*/}
        //   {/*      <TouchableOpacity*/}
        //   {/*        key={`${option.value}${index}`}*/}
        //   {/*        onPress={() => handleRelease(option)}*/}
        //   {/*        style={{ height: 40, justifyContent: 'center', paddingHorizontal: 10 }}*/}
        //   {/*      >*/}
        //   {/*        {typeof option.view === 'string' ? <Text>{option.view}</Text> : option.view}*/}
        //   {/*      </TouchableOpacity>*/}
        //   {/*    ))}*/}
        // </>
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

  return null;
});

export default Modal;
