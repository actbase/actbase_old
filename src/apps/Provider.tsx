import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { ABContext, ContextArgs } from '../common/utils';
import { setOverride } from './ResourceManager';
import View from '../web/View';

const ABApp = (props: any) => {
  const [nodeIdx, setNodeIdx] = React.useState();
  console.log('nodeIdx', nodeIdx);
  const nodes = React.useRef<React.ReactNode[]>([]);

  const { styles, assets } = props;
  useEffect(() => {
    setOverride('styles', styles);
    setOverride('assets', assets);
  }, [styles, assets]);

  const attach = (node: React.ReactNode, idx?: number | undefined): number => {
    if (idx) {
      nodes.current.splice(idx - 1);
    }

    nodes.current = [...nodes?.current, node];

    const nidx = nodes.current.length;
    setNodeIdx(nidx);
    return nidx;
  };

  const detach = (arg: React.ReactNode | number) => {
    if (typeof arg === 'number') {
      const index = arg;
      if (index >= 0) {
        const items = [...nodes.current];
        items.splice(index - 1);

        nodes.current = items;
        const idx = nodes.current.length;
        setNodeIdx(idx);
      }
    }
  };

  const pop = React.useCallback(() => {
    // return absoluteManager.current?.pop();
    // nodes.current?.splice(nodes.current?.length - 2, 1);
    // setNodeSize(nodes.current.length);
  }, []);

  const value: ContextArgs = useMemo(() => ({ attach, detach, pop }), []);

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
