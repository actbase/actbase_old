import React from 'react';

const ScrollView = ({children}) => {
  return (
    <div style={{overflowY: 'scroll'}}>
      {children}
    </div>
  )
}

export default ScrollView;
