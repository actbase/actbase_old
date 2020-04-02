import * as React from 'react';
import { useEffect, useMemo } from 'react';
import { ABContext, ContextArgs } from '../common/utils';
import { setOverride } from './ResourceManager';
import View from '../web/View';
import { StyleSheet } from 'react-native';

const ABApp = (props: any) => {
  const [, setNodeIdx] = React.useState();
  const [dimen, setDimen] = React.useState({});
  const nodes = React.useRef<React.ReactNode[]>([]);

  const { styles, assets } = props;
  useEffect(() => {
    setOverride('styles', styles);
    setOverride('assets', assets);
  }, [styles, assets]);

  const value: ContextArgs = useMemo(
    () => ({
      dimen,
      attach: (node: React.ReactNode, idx?: number): number => {
        if (idx) {
          nodes.current[idx - 1] = node;
        } else {
          nodes.current = [...nodes?.current, node];
        }

        const nidx = nodes.current.length;
        setNodeIdx({ nidx: nidx });
        return idx || nidx;
      },
      detach: (arg: React.ReactNode | number): void => {
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
    [dimen],
  );

  return (
    <ABContext.Provider value={value}>
      <View
        onLayout={({ nativeEvent }) => {
          setDimen({ height: nativeEvent?.layout.height, y: nativeEvent?.layout.y });
        }}
        style={{ flex: 1 }}
      >
        {props.children}
        {nodes.current?.map((node, index) => (
          <View key={`${index}`} style={StyleSheet.absoluteFill}>
            {node}
          </View>
        ))}
      </View>
    </ABContext.Provider>
  );
};

export default React.memo(ABApp);
