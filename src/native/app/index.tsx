import React from 'react';
import { StyleSheet } from 'react-native';
import { ABContext } from './utils';
import { forIn, assign } from 'lodash';

const ABApp = (
  RootComponent: React.FC<any>,
  overrideStyle: object | null,
): React.FC<any> => (props: any) => {
  const value = React.useMemo(() => {
    const styles = ABApp.styles;
    forIn(overrideStyle, (value, key) => {
      styles[key] = assign(styles[key], value);
    });
    return { styles: StyleSheet.create(styles) };
  }, []);

  return (
    <ABContext.Provider value={value}>
      <>
        <RootComponent {...props} />
      </>
    </ABContext.Provider>
  );
};
ABApp.styles = {};

export default ABApp;
