import { assign } from 'lodash';
import buttonStyle from '../Button/styles.css';
import inputStyle from '../Input/styles.css';
import selectStyle from '../Select/styles.css';
import layoutStyle from '../Layout/styles.css';

export interface StyleType {
  [key: string]: any;
}

const styles: StyleType = {};
assign(styles, buttonStyle);
assign(styles, inputStyle);
assign(styles, selectStyle);
assign(styles, layoutStyle);

export default styles;
