import { createContext } from 'react';

export const ABContext = createContext({});

export const TEXT_STYLE_NAMES = [
  'color',
  'fontFamily',
  'fontSize',
  'fontStyle',
  'fontWeight',
  'fontVariant',
  'textShadowOffset',
  'textShadowRadius',
  'textShadowColor',
  'letterSpacing',
  'lineHeight',
  'textAlign',
  'textAlignVertical',
  'includeFontPadding',
  'textDecorationLine',
  'textDecorationStyle',
  'textDecorationColor',
  'textTransform',
  'writingDirection',
];

export default {
  ABContext,
  TEXT_STYLE_NAMES,
};
