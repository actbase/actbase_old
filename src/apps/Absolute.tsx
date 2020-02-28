import * as React from 'react';
import { useContext, useRef } from 'react';
import { ABContext } from '../common/utils';

interface AbsoluteProps {
  isVisible: boolean;
  children: React.ReactNode;
}

const Absolute = React.memo((props: AbsoluteProps) => {
  const { isVisible, children } = props;
  const context = useContext(ABContext);
  const idx = useRef<number | undefined>(-1);

  React.useEffect(() => {
    if (typeof idx.current === 'number' && idx.current >= 0) {
      context.detach?.(idx.current);
    }
    if (isVisible) {
      idx.current = context.attach?.(children);
    }
  }, [isVisible, children]);

  React.useEffect(() => {
    return () => {
      if (typeof idx.current === 'number' && idx.current >= 0) {
        context.detach?.(idx.current);
      }
    };
  }, []);

  return null;
});

export default Absolute;
