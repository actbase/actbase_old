import * as React from 'react';

export interface FooterProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  style?: any;
}

const Footer: React.FC<FooterProps> = props => {
  return <footer {...props} />;
};

export default Footer;
