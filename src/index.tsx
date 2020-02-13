import * as React from 'react';
import App from './app';
import _Button from './button/index';

export const ActBase = App;

export const Div: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) =>
  <div {...props} />;
export const View: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = (props) =>
  <div {...props} />;
export const Header: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>> = (props) =>
  <header {...props} />;
export const Footer: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>> = (props) =>
  <footer {...props} />;
export const Section: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>> = (props) =>
  <section {...props} />;
export const Aside: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>> = (props) =>
  <aside {...props} />;
export const Article: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>> = (props) =>
  <article {...props} />;
export const Text: React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>> = (props) =>
  <span {...props} />;

// General
export const Button = _Button;

// Layout

// Navigation

// Data Entry

// Data Display

// Feedback

// Other

export default ActBase;
