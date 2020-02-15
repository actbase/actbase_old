import * as React from 'react';

export interface SectionProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  style?: any;
}

const Section: React.FC<SectionProps> = props => {
  return <section {...props} />;
};

export default Section;
