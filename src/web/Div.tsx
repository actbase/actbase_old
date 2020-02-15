import * as React from 'react';

export interface DivProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  style?: any;
}

const Div: React.FC<DivProps> = props => {
  return <div {...props} />;
};

export default Div;
