import React from 'react';
import { ABContext } from './utils';

const ABApp = (RootComponent, theme) => (props) => {
  const value = { theme };
  return (
    <ABContext.Provider value={value}>
      <>
        <RootComponent {...props} />
      </>
    </ABContext.Provider>
  );
};

export default ABApp;
