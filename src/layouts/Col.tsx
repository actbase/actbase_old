import React, { useContext } from 'react';
import { getWindowSize } from '../common/utils';
import { RowContext } from './Row';
import View from '../web/View';
import useStyles from '../apps/styles';

export interface ColProps {
  span: number | 'auto' | 'none';
  xs?: number | 'auto' | 'none';
  sm?: number | 'auto' | 'none';
  md?: number | 'auto' | 'none';
  lg?: number | 'auto' | 'none';
  xlg?: number | 'auto' | 'none';
  style?: any;
}

const STYLE_GROUP_NAME = 'ab-layout';

const Col: React.FC<ColProps> = (props: ColProps): React.ReactElement => {
  const { xs, sm, md, lg, xlg, span, ...oProps } = props;

  const { width } = getWindowSize();
  const rowContext = useContext(RowContext);
  const styles = useStyles(STYLE_GROUP_NAME);

  let ratio;
  if (width <= 576) {
    ratio = xs || sm || md || lg || xlg || span;
  } else if (width <= 768) {
    ratio = sm || md || lg || xlg || span;
  } else if (width <= 992) {
    ratio = md || lg || xlg || span;
  } else if (width <= 1200) {
    ratio = lg || xlg || span;
  } else {
    ratio = xlg || span;
  }

  let extraStyle: { [key: string]: any } = {};
  if (typeof ratio === 'number') {
    extraStyle.width = `${100 * (Math.abs(ratio) / 12)}%`;
    extraStyle.maxWidth = `${100 * (Math.abs(ratio) / 12)}%`;
    extraStyle.flexGrow = 1;
  } else if (ratio === 'auto') {
    extraStyle.flex = 1;
  }

  const gutterH = rowContext.gutter[0] || 0;
  const gutterV = rowContext.gutter[1] || 0;

  return (
    <View
      style={[
        styles[`${STYLE_GROUP_NAME}-col`],
        {
          ...extraStyle,
          paddingLeft: gutterH / 2,
          paddingRight: gutterH / 2,
          paddingTop: gutterV / 2,
          paddingBottom: gutterV / 2,
        },
      ]}
    >
      <View {...oProps} />
    </View>
  );
};

Col.defaultProps = {
  span: 'none',
};

export default Col;
