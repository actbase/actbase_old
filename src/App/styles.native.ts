import { assign } from 'lodash';
import buttonStyle from '../Button/styles.json';
import inputStyle from '../Input/styles.json';
import selectStyle from '../Select/styles.json';
import layoutStyle from '../Layout/styles.json';

export interface StyleType {
  [key: string]: any;
}

const styles: StyleType = {};
assign(styles, buttonStyle);
assign(styles, inputStyle);
assign(styles, selectStyle);
assign(styles, layoutStyle);

export default styles;
