import App from './App/index.native';
import { View as RNView, Text as RNText } from 'react-native';
import transform from 'css-to-react-native-transform';
import { assign } from 'lodash';

let styles = {};

// General
export { default as Button } from './Button/index.native';
import buttonStyle from './Button/styles.css';
styles = assign(styles, transform(buttonStyle));

export { default as ScrollView } from './ScrollView/index.native';

// Data Entry
export { default as Form } from './Form/index.native';

export { default as Input } from './Input';
import inputStyle from './Input/styles.css';
styles = assign(styles, transform(inputStyle));

export { default as Select } from './Select/index.native';
import selectStyle from './Select/styles.css';
styles = assign(styles, transform(selectStyle));

// Layout
export { default as Row } from './Layout/Row.native';
export { default as Col } from './Layout/Col.native';

// Web Migrated
export { default as View } from './Html/View.native';

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

//
// export { default as Actbase } from './native';
// export default Actbase;
