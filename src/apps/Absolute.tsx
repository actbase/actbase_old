import React, { useCallback, useContext, useRef } from 'react';
import { ABContext } from '../common/utils';

interface AbsoluteProps {
  isVisible: boolean;
  name?: string;
  children: React.ReactNode;
  left?: number;
  top?: number;
  onClose?: () => void;
}

const Absolute: React.FC<AbsoluteProps> = (props: AbsoluteProps) => {
  const { isVisible, children } = props;
  const context = useContext(ABContext);
  const idx = useRef<number>(-1);

  const dispose = useCallback(() => {
    if (context.detach && idx.current >= 0) {
      context.detach(idx.current);
      idx.current = -1;
    }
  }, []);

  React.useEffect(() => {
    if (isVisible) {
      if (idx.current < 0) {
        idx.current = context.attach?.(children) || -1;
      } else {
        context.attach?.(children, idx.current);
      }
    } else {
      dispose();
    }
  }, [isVisible, children]);

  React.useEffect(() => dispose, []);
  return <></>;
};

export default Absolute;
