import App from './app/index.native';
import { View as RNView, Text as RNText } from 'react-native';
import transform from 'css-to-react-native-transform';
import { assign } from 'lodash';

let styles = {};

// General
export { default as Button } from './button/index.native';
import buttonStyle from './button/styles.css';
styles = assign(styles, transform(buttonStyle));

export { default as ScrollView } from './scrollview/index.native';

// Data Entry
export { default as Form } from './form/index.native';

export { default as Input } from './input';
import inputStyle from './input/styles.css';
styles = assign(styles, transform(inputStyle));

export { default as Select } from './select/index.native';
import selectStyle from './select/styles.css';
styles = assign(styles, transform(selectStyle));

// Web Migrated
export { default as View } from './html/View.native';

export const Div = RNView;
export const Header = RNView;
export const Footer = RNView;
export const Section = RNView;
export const Aside = RNView;
export const Article = RNView;
export const Text = RNText;

App.styles = styles;
export const ActBase = App;

export default ActBase;
