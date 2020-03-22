import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { ABContext, ContextArgs } from '../common/utils';
import { setOverride } from './ResourceManager';
import View from '../web/View';

const ABApp = (props: any) => {
  const [, setNodeIdx] = React.useState();
  const nodes = React.useRef<React.ReactNode[]>([]);

  const { styles, assets } = props;
  useEffect(() => {
    setOverride('styles', styles);
    setOverride('assets', assets);
  }, [styles, assets]);

  const value: ContextArgs = useMemo(
    () => ({
      attach: (node: React.ReactNode, idx?: number | undefined): number => {
        if (idx) {
          nodes.current[idx - 1] = node;
        } else {
          nodes.current = [...nodes?.current, node];
        }

        const nidx = nodes.current.length;
        setNodeIdx({ nidx: nidx });
        return idx || nidx;
      },
      detach: (arg: React.ReactNode | number) => {
        const index = typeof arg === 'number' ? arg : nodes.current.indexOf(arg);
        if (index >= 0) {
          const items = [...nodes.current];
          items.splice(index - 1, items.length - index + 1);
          nodes.current = items;
          const idx = nodes.current.length;
          setNodeIdx({ nidx: idx });
        }
      },
      pop: () => {
        // return absoluteManager.current?.pop();
        // nodes.current?.splice(nodes.current?.length - 2, 1);
        // setNodeSize(nodes.current.length);
      },
    }),
    [],
  );

  return (
    <ABContext.Provider value={value}>
      <>
        {props.children}
        {nodes.current?.map((node, index) => (
          <View key={`${index}`} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            {node}
          </View>
        ))}
      </>
    </ABContext.Provider>
  );
};

export default React.memo(ABApp);
