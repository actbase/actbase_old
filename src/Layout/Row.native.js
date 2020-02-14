import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ABContext } from '../App/utils.native';

const STYLE_GROUP_NAME = 'ab-layout';

export const RowContext = React.createContext({});

const Row = props => {
  const { style, ...oProps } = props;

  const context = useContext(ABContext);
  const styles = context.styles;

  const gap = props.gap || 0;
  const elementStyle = StyleSheet.flatten([
    styles[`${STYLE_GROUP_NAME}-row`],
    {
      marginLeft: -(gap / 2),
      marginRight: -(gap / 2),
    },
  ]);

  return (
    <RowContext.Provider value={{ gap }}>
      <View style={style}>
        <View style={elementStyle} {...oProps} />
      </View>
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
