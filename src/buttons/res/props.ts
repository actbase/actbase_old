import { ABEProps } from '../../apps/res/props';

export interface ButtonProps extends ABEProps {
  type: 'button' | 'submit';
  disabled: boolean;
  onClick?: () => any;
  onPress?: () => any;
  onPressIn?: (e: any) => any;
  onPressOut?: (e: any) => any;
  forceInset: any;
  children?: any;
}
