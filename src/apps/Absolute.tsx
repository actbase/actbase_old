import React, { useCallback, useContext, useState } from 'react';
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
  const [idx, setIdx] = useState<number>(-1);

  const dispose = useCallback(() => {
    console.log('dispose', idx, props);
    if (context.detach && idx >= 0) {
      context.detach(idx);
    }
  }, [idx]);

  React.useEffect(() => {
    if (isVisible) {
      if (idx < 0) {
        setIdx(context.attach?.(children) || -1);
      } else {
        context.attach?.(children, idx);
      }
    }

    if (isVisible && idx < 0) {
    } else if (!isVisible && idx > 0) {
      dispose();
    }
  }, [isVisible, children, idx]);

  React.useEffect(() => dispose, []);
  return <></>;
};

export default Absolute;
