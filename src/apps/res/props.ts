export interface ABEProps {
  tpl?: string;
  style?: { [key: string]: string | number | undefined };
  testID?: string;
}

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

export interface ScaledSize {
  width: number;
  height: number;
  scale: number;
  fontScale: number;
}
