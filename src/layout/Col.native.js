import React from 'react';
import { View } from 'react-native';

const Col = React.memo(props => {
  return <View {...props} />;
});

export default Col;
