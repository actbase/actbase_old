import React from 'react';
import { StyleSheet } from 'react-native';
import { ABContext } from './utils.native';
import { forIn, assign } from 'lodash';

const ABApp = (RootComponent, overrideStyle) => props => {
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
