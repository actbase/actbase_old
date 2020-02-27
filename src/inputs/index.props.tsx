import { TextInputProps } from 'react-native';

export interface InputProps extends TextInputProps {
  type: string;
  tpl?: string;
  name?: string;
  value?: any;
  style?: any;
  onChangeText?: any;
  leftDeco?: any;
  rightDeco?: any;
  hintStyle?: any;

  onFocus?: any;
  onBlur?: any;
  validateMode?: 'focus' | 'blur' | 'while-editing' | 'always' | 'submit' | 'never';
  validators?: Validator | Validator[];

  readonly?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  clearButtonMode?: 'never' | 'while-editing' | 'unless-editing' | 'always';

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
