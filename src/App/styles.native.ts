import transform from 'css-to-react-native-transform';
import { assign } from 'lodash';
import buttonStyle from '../Button/styles.css';
import inputStyle from '../Input/styles.css';
import selectStyle from '../Select/styles.css';
import layoutStyle from '../Layout/styles.css';

export interface StyleType {
  [key: string]: any;
}

const styles: StyleType = {};
assign(styles, transform(buttonStyle));
assign(styles, transform(inputStyle));
assign(styles, transform(selectStyle));
assign(styles, transform(layoutStyle));

export default styles;
