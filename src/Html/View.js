import React from 'react';

const View = React.memo(props => {
  return <div {...props} />;
});

export default View;
