import React from 'react';
import { View } from 'react-native';

const Row = React.memo(props => {
  return <View {...props} />;
});

export default Row;
