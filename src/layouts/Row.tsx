import * as React from 'react';
import { isArray } from 'lodash';
import View from '../web/View';
import getResource from '../common/res.native';

export type RowAligns = 'top' | 'middle' | 'bottom' | 'stretch';
export type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between';

export interface RowProps {
  gutter: [number, number] | number;
  align?: RowAligns;
  justify?: RowJustify;
  style?: any;
}

export interface RowContextProps {
  gutter: [number, number];
}

export const STYLE_GROUP_NAME = 'ab-layout';
export const RowContext: React.Context<RowContextProps> = React.createContext<RowContextProps>({
  gutter: [10, 10],
});

const Row: React.FC<RowProps> = (props: RowProps): React.ReactElement => {
  const { style, align, justify, ...oProps } = props;

  const r = getResource(STYLE_GROUP_NAME);
  const gutter: [number, number] = isArray(props.gutter) ? props.gutter : [props.gutter, props.gutter];

  const extStyle = {
    marginLeft: -(gutter[0] / 2),
    marginRight: -(gutter[0] / 2),
    marginTop: -(gutter[1] / 2),
    marginBottom: -(gutter[1] / 2),
    alignItems: r.styles.alignItems,
    justifyContent: r.styles.justifyContent,
  };

  if (props.align === 'top') {
    extStyle.alignItems = 'flex-start';
  } else if (props.align === 'middle') {
    extStyle.alignItems = 'center';
  } else if (props.align === 'bottom') {
    extStyle.alignItems = 'flex-end';
  } else if (props.align === 'stretch') {
    extStyle.alignItems = 'stretch';
  }

  if (props.justify === 'start') {
    extStyle.justifyContent = 'flex-start';
  } else if (props.justify === 'center') {
    extStyle.justifyContent = 'center';
  } else if (props.justify === 'end') {
    extStyle.justifyContent = 'flex-end';
  } else if (props.justify) {
    extStyle.justifyContent = props.justify;
  }

  return (
    <RowContext.Provider value={{ gutter: gutter }}>
      <View style={style}>
        <View style={[r.styles[`${STYLE_GROUP_NAME}-row`], extStyle]} {...oProps} />
      </View>
    </RowContext.Provider>
  );
};

Row.defaultProps = {
  gutter: [10, 10],
};

export default Row;
