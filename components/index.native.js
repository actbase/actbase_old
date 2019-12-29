import { View as RNView, Text as RNText } from 'react-native';

export const ActBase = require('./App').default;

export const Div = RNView;
export const View = RNView;
export const Header = RNView;
export const Footer = RNView;
export const Section = RNView;
export const Aside = RNView;
export const Article = RNView;
export const Text = RNText;

export const Button = require('./Button').default;


export default ActBase;
