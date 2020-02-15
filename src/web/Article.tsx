import * as React from 'react';

export interface ArticleProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  style?: any;
}

const Article: React.FC<ArticleProps> = props => {
  return <Article {...props} />;
};

export default Article;
