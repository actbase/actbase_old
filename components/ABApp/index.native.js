import React from 'react';
import { ABContext } from '../utils';

const ABApp = (RootComponent, theme) => (props) => {
  console.log(theme);
  return (
    <ABContext.Provider value={{ theme }}>
      <RootComponent {...props} />
    </ABContext.Provider>
  );
};

export default ABApp;
