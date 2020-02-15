import * as React from 'react';
import { assign, forIn } from 'lodash';

import { ABContext, ContextArgs } from './utils';
import originStyle from '../common/styles';

const ABApp = (
  RootComponent: React.ComponentType,
  overrideStyle: object,
): React.FC => (props: any): React.ReactElement => {
  const value: ContextArgs = React.useMemo((): ContextArgs => {
    const styles = { ...originStyle };
    forIn(overrideStyle, (value, key) => {
      styles[key] = assign(styles[key], value);
    });
    return { styles };
  }, []);

  return (
    <ABContext.Provider value={value}>
      <>
        <RootComponent {...props} />
      </>
    </ABContext.Provider>
  );
};

export default ABApp;
