import React from 'react';

const ABApp = (RootComponent, theme) => (props) => {
  console.log(theme);
  return (
    <>
      <RootComponent {...props} />
    </>
  );
};

export default ABApp;
