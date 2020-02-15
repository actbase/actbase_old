import * as React from 'react';

export interface ViewProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  style?: any;
  onLayout?: (event: { nativeEvent: { layout: { x: number; y: number; width: number; height: number } } }) => void;
}

const View: React.FC<ViewProps> = props => {
  return <div {...props} />;
};

export default View;
