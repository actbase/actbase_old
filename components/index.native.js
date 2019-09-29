import { View, Text as RNText } from 'react-native';

export const ActBase = require('./ABApp').default;

export const Div = View;
export const View = View;
export const Header = View;
export const Footer = View;
export const Section = View;
export const Aside = View;
export const Article = View;
export const Text = RNText;

export const Button = require('./Button').default;


export default ActBase;
