import { createContext } from 'react';
import { UIManager } from 'react-native';

export const ABContext = createContext({});

export const measure = target => {
  return new Promise((resolve, reject) => {
    try {
      UIManager.measure(
        target,
        (originX, originY, width, oHeight, pageX, pageY) =>
          resolve({
            originX,
            originY,
            width,
            height: oHeight,
            pageX,
            pageY,
          }),
      );
    } catch (e) {
      reject(e);
    }
  });
};

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
  measure,
};
