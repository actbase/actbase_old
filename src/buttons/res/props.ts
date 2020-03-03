
export interface ButtonProps {
  type: 'button' | 'submit';
  tpl?: string;
  disabled: boolean;
  onPress?: () => any;
  onClick?: () => any;
  onPressIn?: (e: any) => any;
  onPressOut?: (e: any) => any;
  forceInset: any;
  style?: any;
  children?: any;
}
