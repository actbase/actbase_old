import * as React from 'react';
import { Animated, Keyboard, KeyboardEvent, LayoutAnimation, Platform } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

export interface KeyboardSpacerProps {
  safety?: boolean;
  excludeHeight?: boolean;
}

export interface KeyboardSpacerProviderProps {
  noSpaceHeight?: number;
}

export type KeyboardSpacerContextType = {
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  height: number;
};

export const KeyboardSpacerContext = React.createContext<KeyboardSpacerContextType | null>(null);

export function useKeyboardSpacer(): KeyboardSpacerContextType {
  const keyboard = React.useContext(KeyboardSpacerContext);
  if (keyboard === null) {
    throw new Error(
      'No keyboard value available. Make sure you are rendering `<KeyboardSpacerProvider>` at the top of your app.',
    );
  }
  return keyboard;
}

export const KeyboardSpacerProvider: React.FC<KeyboardSpacerProviderProps> = ({ children, noSpaceHeight }) => {
  const [height, setHeight] = React.useState<number>(noSpaceHeight || 0);

  return <KeyboardSpacerContext.Provider value={{ height, setHeight }}>{children}</KeyboardSpacerContext.Provider>;
};

export const KeyboardSpacer = ({ safety = true, excludeHeight = false }: KeyboardSpacerProps) => {
  const KeyboardHeight = React.useRef(new Animated.Value(0)).current;
  const safe = useSafeArea();

  const { height } = useKeyboardSpacer();

  React.useEffect(() => {
    const createLayoutAnimation = (e: KeyboardEvent) => ({
      duration: e.duration,
      create: {
        type: LayoutAnimation.Types[e.easing],
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        type: LayoutAnimation.Types[e.easing],
      },
      delete: {
        type: LayoutAnimation.Types[e.easing],
        property: LayoutAnimation.Properties.scaleXY,
      },
    });
    const updateKeyboardSpace = (e: KeyboardEvent) => {
      if (!e.endCoordinates || !e.startCoordinates) {
        return;
      }
      LayoutAnimation.configureNext(createLayoutAnimation(e));
      KeyboardHeight.setValue(
        e.endCoordinates.height - (safety ? safe?.bottom || 0 : 0) - (excludeHeight ? height : 0),
      );
    };

    const resetKeyboardSpace = (e: KeyboardEvent) => {
      if (!e.endCoordinates || !e.startCoordinates) {
        return;
      }

      LayoutAnimation.configureNext(createLayoutAnimation(e));
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
  }, [KeyboardHeight, excludeHeight, height, safe, safety]);
  return <Animated.View style={{ height: KeyboardHeight, backgroundColor: 'transparent' }} />;
};

export function withKeyboardSpacer<T>({
  safety = true,
  excludeHeight = false,
}: KeyboardSpacerProps): (Component: React.ComponentType<T>) => React.FC<T> {
  return Component => props => (
    <>
      <Component {...props} />
      <KeyboardSpacer {...{ safety, excludeHeight }} />
    </>
  );
}

export default {
  KeyboardSpacerContext,
  useKeyboardSpacer,
  KeyboardSpacerProvider,
  KeyboardSpacer,
  withKeyboardSpacer,
};
