import * as React from 'react';

export interface HeaderProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  style?: any;
}

const Header: React.FC<HeaderProps> = props => {
  return <header {...props} />;
};

export default Header;
