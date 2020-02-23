import * as React from 'react';
import { Dimensions, findNodeHandle, ScaledSize, UIManager } from 'react-native';

export interface AbsoluteComponent {
  child: any;
  x: number;
  y: number;
}

export interface MeasureResult {
  originX: number;
  originY: number;
  width: number;
  height: number;
  pageX: number;
  pageY: number;
}

export interface ContextArgs {
  styles?: any;
}

export const ABContext: React.Context<ContextArgs> = React.createContext<ContextArgs>({});

export const getWindowSize = (): ScaledSize => {
  return Dimensions.get('screen');
};

export const measure = (target: null | number | React.Component<any, any> | React.ComponentClass<any>): Promise<MeasureResult | Error> => {
  return new Promise((resolve, reject) => {
    try {
      const node = findNodeHandle(target);
      if (node === null) throw new Error();
      UIManager.measure(node, (originX: number, originY: number, width: number, oHeight: number, pageX: number, pageY: number) =>
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

export const MARGIN_STYLES: string[] = [
  'margin',
  'marginHorizontal',
  'marginVertical',
  'marginTop',
  'marginLeft',
  'marginRight',
  'marginBottom',
];

export default {
  ABContext,
  getWindowSize,
  measure,
  TEXT_STYLE_NAMES,
  COVER_STYLE_NAMES,
};
