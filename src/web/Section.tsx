import * as React from 'react';

const Section: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>> = props => {
  return <section {...props} />;
};

export default Section;
