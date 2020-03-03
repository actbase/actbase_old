import { InputProps } from '../../inputs/res/types';
import React from 'react';

export interface SelectProps extends InputProps {
  options?: OptionProps[];
  children?: React.ReactElement<OptionProps> | React.ReactElement<OptionProps>[];
  onChangeValue?: (props: OptionProps) => void;
}

export interface OptionProps {
  value?: any;
  children?: React.ReactNode;
  view?: React.ReactNode;
}
