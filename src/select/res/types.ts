import { InputProps } from '../../inputs/res/types';
import React from 'react';

export interface SelectProps<T> extends InputProps {
  options?: OptionProps<T>[];
  children?: React.ReactElement<OptionProps<T>> | React.ReactElement<OptionProps<T>>[];
  onChangeValue?: (props: OptionProps<T>) => void;
}

export interface OptionProps<T> {
  value?: T;
  children?: React.ReactNode;
  view?: React.ReactNode;
}
