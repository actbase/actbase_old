import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ABContext } from '../App/utils.native';

const STYLE_GROUP_NAME = 'ab-layout';

export const RowContext = React.createContext({});

const Row = props => {
  const { children } = props;

  const context = useContext(ABContext);
  const styles = context.styles;

  const gap = props.gap || 0;
  const elementStyle = StyleSheet.flatten([
    styles[`${STYLE_GROUP_NAME}-row`],
    {
      marginLeft: -gap,
      marginRight: -gap,
    },
  ]);

  return (
    <RowContext.Provider value={{ gap }}>
      <View style={elementStyle}>{children}</View>
    </RowContext.Provider>
  );
};

Row.propTypes = {
  gap: PropTypes.number,
};

Row.defaultProps = {
  gap: 10,
};

export default Row;
