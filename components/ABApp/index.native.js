import React from 'react';

const ABApp = (RootComponent) => (props) => {
  return (
    <>
      <RootComponent {...props} />
    </>
  );
};

export default ABApp;
