import React from 'react';

const ABApp = (RootComponent) => (props) => {
  return (
    <React.Fragment>
      <RootComponent {...props} />
    </React.Fragment>
  );
};

export default ABApp;
