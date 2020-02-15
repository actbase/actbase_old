import * as React from 'react';

export interface AsideProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  style?: any;
}

const Aside: React.FC<AsideProps> = props => {
  return <Aside {...props} />;
};

export default Aside;
