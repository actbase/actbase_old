import * as React from 'react';

import { ABContext, ContextArgs } from './utils';
import { setOverride } from './styles.data';

const ABApp = (RootComponent: React.ComponentType, overrideStyle: object): React.FC => {
  setOverride(overrideStyle);
  const value: ContextArgs = {};
  const HoC = (props: any): React.ReactElement => {
    return (
      <ABContext.Provider value={value}>
        <>
          <RootComponent {...props} />
        </>
      </ABContext.Provider>
    );
  };

  return HoC;
};

export default ABApp;
