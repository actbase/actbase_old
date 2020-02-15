import * as React from 'react';
import { assign, forIn } from 'lodash';

import { ABContext, ContextArgs } from './utils';
import originStyle from './styles';

const ABApp = (RootComponent: React.ComponentType, overrideStyle: object): React.FC => {
  const styles = { ...originStyle };
  forIn(overrideStyle, (value, key) => {
    styles[key] = assign(styles[key], value);
  });

  const value: ContextArgs = { styles };
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
