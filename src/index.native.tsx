import App from './App/index.native';
import { View as RNView, Text as RNText } from 'react-native';
import transform from 'css-to-react-native-transform';
import { assign } from 'lodash';

let styles = {};

// General
export { default as Button } from './Button/index.native';
import buttonStyle from './Button/styles.css';
styles = assign(styles, transform(buttonStyle));

// Data Entry
export { default as Form } from './DataEntry/Form/index.native';

// Web Migrated
export const Div = RNView;
export const View = RNView;
export const Header = RNView;
export const Footer = RNView;
export const Section = RNView;
export const Aside = RNView;
export const Article = RNView;
export const Text = RNText;

App.styles = styles;
export const ActBase = App;

// Layout

// Navigation

// Data Display

// Feedback

// Other

export default ActBase;
