import * as React from 'react';
import { ReturnKeyTypeOptions } from 'react-native';
import { ValidateResult } from '../../inputs/res/types';

export interface FormProps {
  style?: any;
  output: 'json' | 'FormData';
  onSubmit?: (data: FormData | FormJson) => void;
  onError?: (data: any) => void;
  onLayout?: (event: { nativeEvent: { layout: { x: number; y: number; width: number; height: number } } }) => void;
}

export interface FormContextArgs {
  subscribe?: (oRef: React.MutableRefObject<number>, node: React.ReactNode, options: ChildOption) => void;
  unsubscribe?: (oRef: React.MutableRefObject<number>) => void;
  submit?: () => any;
}

export interface FormJson {
  [key: string]: any;
}

export interface Children {
  [key: string]: {
    node: React.ReactNode;
    options: ChildOption;
    area: number;
  };
}

export interface ChildOption {
  name?: string;
  focus?: () => void;
  blur?: () => void;
  setProps?: (data: ExtraProps) => void;
  getValue?: () => any;
  onValidate?: (value: any, values: any) => ValidateResult | null;
}

export interface ExtraProps {
  returnKeyType?: ReturnKeyTypeOptions;
  // onSubmitEditing?: (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void;
  nextElement?: ChildOption;
  submitting?: boolean;
  submitted?: boolean;
  hint?: string;
  error?: 'success' | 'warn' | 'error';
}

export interface FieldError {
  level?: 'success' | 'warn' | 'error';
  message?: string;
}
