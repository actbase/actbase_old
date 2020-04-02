import { TextInputProps, StyleProp, TextStyle } from 'react-native';

export type ValidateMode = 'focus' | 'blur' | 'while-editing' | 'always' | 'submit' | 'never';
export type ClearButtonMode = 'never' | 'while-editing' | 'unless-editing' | 'always';

export interface InputProps extends TextInputProps {
  type?: string;
  tpl?: string;
  name?: string;
  initValue?: string;
  style?: StyleProp<TextStyle>;
  leftDeco?: React.ReactElement;
  rightDeco?: React.ReactElement;
  hintStyle?: StyleProp<TextStyle>;

  validateMode?: ValidateMode;
  validators?: Validator | Validator[];

  readonly?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  clearButtonMode?: ClearButtonMode;

  placeholder?: string;

  hint?: string;
}

export interface Validator {
  (value: any, values?: any): ValidateResult;
}

export interface ValidateResult {
  level?: string;
  message?: string;
}
