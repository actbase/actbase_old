import * as React from 'react';
import { ABContext, ContextArgs } from '../common/utils';
// import { OverrideData, setOverride } from './styles.data';
import View from '../web/View';

const ABApp = React.memo((props: any) => {
  const nodes = React.useRef<React.ReactNode[]>([]);
  const setNodeSize = React.useState<number>(0)[1];

  console.log('ABApp...');

  // setOverride(override);

  const attach = React.useCallback((node: React.ReactNode) => {
    nodes.current.push(node);
    setNodeSize(nodes.current.length);
    return nodes.current.length;
  }, []);

  const detach = React.useCallback((node: React.ReactNode) => {
    const index = nodes.current.indexOf(node);
    if (index >= 0) {
      nodes.current?.splice(index, 1);
    }
    setNodeSize(nodes.current.length);
  }, []);

  const replace = React.useCallback((node: React.ReactNode, index: number) => {
    nodes.current?.splice(index, 1, node);
    setNodeSize(nodes.current.length);
  }, []);

  const pop = React.useCallback(() => {
    nodes.current?.splice(nodes.current?.length - 2, 1);
    setNodeSize(nodes.current.length);
  }, []);

  const value: ContextArgs = { attach, detach, replace, pop };

  return (
    <ABContext.Provider value={value}>
      <>
        {props.children}
        {nodes?.current?.map((node, index) => (
          <View key={`${index}`} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            {node}
          </View>
        ))}
      </>
    </ABContext.Provider>
  );
});

//
// const ABApp = (RootComponent: React.ComponentType, override: OverrideData): React.FC => {
//   setOverride(override);
//
//   const HoC = (props: any): React.ReactElement => {
//     const nodes = useRef<React.ReactNode[]>([]);
//     const setNodeSize = React.useState<number>(0)[1];
//
//     const attach = useCallback((node: React.ReactNode) => {
//       nodes.current.push(node);
//       setNodeSize(nodes.current.length);
//     }, []);
//
//     const detach = useCallback((node: React.ReactNode) => {
//       const index = nodes.current.indexOf(node);
//       if (index >= 0) {
//         nodes.current?.splice(index, 1);
//       }
//       setNodeSize(nodes.current.length);
//     }, []);
//
//     const pop = useCallback(() => {
//       nodes.current?.splice(nodes.current?.length - 2, 1);
//       setNodeSize(nodes.current.length);
//     }, []);
//
//     const value: ContextArgs = { attach, detach, pop };
//     return (
//       <ABContext.Provider value={value}>
//         <>
//           <RootComponent {...props} />
//           {nodes?.current?.map((node, index) => (
//             <View key={`${index}`} style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
//               {node}
//             </View>
//           ))}
//         </>
//       </ABContext.Provider>
//     );
//   };
//
//   return HoC;
// };
//
export default ABApp;
