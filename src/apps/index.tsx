import * as React from 'react';
import { useCallback, useRef } from 'react';

import { ABContext, ContextArgs } from './utils';
import { setOverrideStyle } from './styles.data';
import View from '../web/View';

const ABApp = (RootComponent: React.ComponentType, overrideStyle: object): React.FC => {
  setOverrideStyle(overrideStyle);

  const HoC = (props: any): React.ReactElement => {
    const nodes = useRef<React.ReactNode[]>([]);
    const setNodeSize = React.useState<number>(0)[1];

    const attach = useCallback((node: React.ReactNode) => {
      nodes.current.push(node);
      setNodeSize(nodes.current.length);
    }, []);

    const detach = useCallback((node: React.ReactNode) => {
      const index = nodes.current.indexOf(node);
      if (index >= 0) {
        nodes.current?.splice(index, 1);
      }
      setNodeSize(nodes.current.length);
    }, []);

    const pop = useCallback(() => {
      nodes.current?.splice(nodes.current?.length - 2, 1);
      setNodeSize(nodes.current.length);
    }, []);

    const value: ContextArgs = { attach, detach, pop };
    return (
      <ABContext.Provider value={value}>
        <>
          <RootComponent {...props} />
          {nodes?.current?.map(node => (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>{node}</View>
          ))}
        </>
      </ABContext.Provider>
    );
  };

  return HoC;
};

export default ABApp;
