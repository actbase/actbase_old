import * as React from 'react';

import { ABContext, AbsoluteComponent, ContextArgs } from './utils';
import { setOverride } from './styles.data';
import { TouchableOpacity, View } from 'react-native';

const ABApp = (RootComponent: React.ComponentType, overrideStyle: object): React.FC => {
  setOverride(overrideStyle);

  const HoC = (props: any): React.ReactElement => {
    const [components, setComponents] = React.useState<AbsoluteComponent[]>([]);

    const addComponent = (data: AbsoluteComponent) => {
      setComponents(v => [...v, data]);
    };

    const popComponent = () => {
      setComponents(v => {
        const data = [...v];
        data.splice(data.length - 1, 1);
        return data;
      });
    };

    const value: ContextArgs = { addComponent };
    return (
      <ABContext.Provider value={value}>
        <>
          <RootComponent {...props} />
          {!!components.length && (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
              <TouchableOpacity style={{ flex: 1 }} onPress={popComponent} />
              {components.map(component => (
                <View style={{ position: 'absolute', top: component.y, left: component.x }}>{component.child}</View>
              ))}
            </View>
          )}
        </>
      </ABContext.Provider>
    );
  };

  return HoC;
};

export default ABApp;
