import * as React from 'react';

export interface MeasureResult {
  originX: number;
  originY: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

export interface ScaledSize {
  width: number;
  height: number;
  scale: number;
  fontScale: number;
}

export interface ContextArgs {
  styles?: any;
}

export const ABContext: React.Context<ContextArgs> = React.createContext<ContextArgs>({});

export const measure = (target: number): Promise<MeasureResult | Error | null> => {
  return new Promise((resolve, reject) => {
    if (target) {
      resolve(null);
    } else {
      reject(null);
    }
  });
};

export const getWindowSize = (): ScaledSize => {
  return { width: 0, height: 0, scale: 1, fontScale: 1 };
};

export const TEXT_STYLE_NAMES: string[] = [
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

export const COVER_STYLE_NAMES: string[] = [
  'borderWidth',
  'borderColor',
  'borderRadius',
  'borderTopWidth',
  'borderTopColor',
  'borderLeftWidth',
  'borderLeftColor',
  'borderRightWidth',
  'borderRightColor',
  'borderBottomWidth',
  'borderBottomColor',
  'backgroundColor',
];

export default {
  ABContext,
  measure,
  getWindowSize,
  TEXT_STYLE_NAMES,
  COVER_STYLE_NAMES,
};
