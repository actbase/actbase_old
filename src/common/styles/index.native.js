import transform from 'css-to-react-native-transform';

import buttonStyle from './button.css';
import inputStyle from './input.css';
import selectStyle from './select.css';
import layoutStyle from './layout.css';

const styles = {
  ...transform(buttonStyle),
  ...transform(inputStyle),
  ...transform(selectStyle),
  ...transform(layoutStyle),
};

export default styles;
