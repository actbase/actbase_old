import * as React from 'react';
import { StyleSheet } from 'react-native';
import { ABContext, ContextArgs } from '../App/utils';
import View from '../web/View';

const STYLE_GROUP_NAME = 'ab-layout';

export const RowContext = React.createContext({});

export interface RowProps {
  gap: number;
  style: any;
}

const Row: React.FC<RowProps> = (props: RowProps): React.ReactElement => {
  const { style, ...oProps } = props;

  const context: ContextArgs = React.useContext(ABContext);
  const styles = context.styles;

  const gap = props.gap || 0;
  // @ts-ignore
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

Row.defaultProps = {
  gap: 10,
};

export default Row;
