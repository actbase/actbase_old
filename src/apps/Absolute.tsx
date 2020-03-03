import React, { useCallback, useContext, useRef } from 'react';
import isEqual from 'lodash/isEqual';
import View from '../web/View';
import { ABContext } from '../common/utils';

interface AbsoluteProps {
  isVisible: boolean;
  children: React.ReactNode;
  left?: number;
  top?: number;
  onClose?: () => void;
}

const Absolute: React.FC<AbsoluteProps> = (props: AbsoluteProps) => {
  const { isVisible, children, left, top, onClose } = props;
  const context = useContext(ABContext);
  const idx = useRef<number | undefined>(-1);

  const dispose = useCallback(() => {
    if (context.detach && typeof idx.current === 'number' && idx.current >= 0) {
      context.detach(idx.current);
    }
  }, []);

  React.useEffect(() => {
    dispose();

    if (isVisible) {
      idx.current = context.attach?.(children);
    }
  }, [isVisible, children, left, top, onClose]);

  React.useEffect(() => dispose, []);
  return <View />;
};

Absolute.defaultProps = {
  left: 0,
  top: 0,
};

export default React.memo(Absolute, (prevProps, nextProps) => {
  return isEqual(prevProps, nextProps);
});
