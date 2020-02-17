import * as React from 'react';
import jss from 'jss';
import { enableStyles, styles } from './styles.data';

const applyedStyles: { [key: string]: any } = {};

const applyStyle = (name: string): void => {
  enableStyles.push(name);
  if (!applyedStyles[name]) {
    const sheet = jss.createStyleSheet(styles[name], { meta: name }).attach();
    applyedStyles[name] = sheet;
  }
};

const removeStyle = (name: string): void => {
  enableStyles.splice(enableStyles.indexOf(name), 1);
};

const useStyles = (name: string): any => {
  React.useEffect(() => () => removeStyle(name), []);
  applyStyle(name);
  return applyedStyles[name];
};

export default useStyles;
