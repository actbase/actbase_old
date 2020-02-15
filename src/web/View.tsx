import * as React from 'react';

const View: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = props => {
  return <div {...props} />;
};

export default View;
