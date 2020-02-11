/// <reference types="react" />
import { View as RNView, Text as RNText } from 'react-native';
export { default as Button } from './Button/index.native';
export { default as Form } from './Form/index.native';
export { default as Input } from './Input/index.native';
export declare const Div: typeof RNView;
export declare const View: typeof RNView;
export declare const Header: typeof RNView;
export declare const Footer: typeof RNView;
export declare const Section: typeof RNView;
export declare const Aside: typeof RNView;
export declare const Article: typeof RNView;
export declare const Text: typeof RNText;
export declare const ActBase: {
    (RootComponent: any, overrideStyle: any): (props: any) => JSX.Element;
    styles: {};
};
export default ActBase;
