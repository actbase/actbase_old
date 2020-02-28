import * as React from 'react';
import { ValidateResult, Validator } from './res/types';
import isArray from 'lodash/isArray';

const useError = (validators?: Validator | Validator[]): [ValidateResult | null, (value: any, values: any) => ValidateResult | null] => {
  const [error, setError] = React.useState<ValidateResult | null>(null);

  const onValidate = (value: any, values: any = null) => {
    if (!validators) return null;
    const _validators: Validator[] = isArray(validators) ? validators : [validators];

    let currentError: ValidateResult | null = null;
    for (const validator of _validators) {
      const err = validator(value, values);
      if (err) {
        currentError = err;
        break;
      }
    }
    setError(currentError);
    return currentError;
  };
  return [error, onValidate];
};

export default useError;
