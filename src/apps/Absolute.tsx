import * as React from 'react';
import View from '../web/View';
import { useContext } from 'react';
import { ABContext } from '../common/utils';

interface AbsoluteProps {
  isVisible: boolean;
  children: React.ReactNode;
  left?: number;
  top?: number;
  onClose?: () => void;
}

const Absolute: React.FC<AbsoluteProps> = (props: AbsoluteProps) => {
  const { isVisible } = props;
  const context = useContext(ABContext);
  // const idx = useRef<number | undefined>(-1);
  console.log('Absolute...' + isVisible, context);

  // React.useEffect(() => {
  //   if (typeof idx.current === 'number' && idx.current >= 0) {
  //     context.detach?.(idx.current);
  //   }
  //   if (isVisible) {
  //     const el = (
  //       <>
  //         <TouchableOpacity onPress={onClose} style={{ backgroundColor: '#0f0', width: '100%', height: '100%' }} />
  //         <View style={{ position: 'absolute', left, top }}>{children}</View>
  //       </>
  //     );
  //     idx.current = context.attach?.(el);
  //   }
  // }, [isVisible, children, left, top, onClose]);
  //
  // React.useEffect(() => {
  //   return () => {
  //     if (typeof idx.current === 'number' && idx.current >= 0) {
  //       context.detach?.(idx.current);
  //     }
  //   };
  // }, []);

  return <View />;
};

export default React.memo(Absolute, () => {
  return true;
});
