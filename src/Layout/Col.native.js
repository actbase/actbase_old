import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ABContext } from '../App/utils.native';
import { RowContext } from './Row.native';

const STYLE_GROUP_NAME = 'ab-layout';

const Col = props => {
  const { xs, sm, md, lg, xlg, children } = props;

  const { width } = Dimensions.get('screen');
  const context = useContext(ABContext);
  const rowContext = useContext(RowContext);
  const styles = context.styles;

  let ratio = 12;
  if (width <= 576) {
    ratio = xs || sm || md || lg || xlg;
  } else if (width <= 768) {
    ratio = sm || md || lg || xlg;
  } else if (width <= 992) {
    ratio = md || lg || xlg;
  } else if (width <= 1200) {
    ratio = lg || xlg;
  } else {
    ratio = xlg;
  }

  const gap = rowContext.gap || 0;
  const elementStyle = StyleSheet.flatten([
    styles[`${STYLE_GROUP_NAME}-col`],
    {
      width: `${100 * (Math.abs(ratio) / 12)}%`,
      paddingLeft: gap,
      paddingRight: gap,
    },
  ]);

  return <View style={elementStyle}>{children}</View>;
};

Col.propTypes = {
  xs: PropTypes.number,
  sm: PropTypes.number,
  md: PropTypes.number,
  lg: PropTypes.number,
  xlg: PropTypes.number,
};

Col.defaultProps = {
  xlg: 12,
};

export default Col;
