import React, { useContext, useEffect, useRef } from 'react';
import { FormContext } from '../form/Form';
import { InputProps } from './res/types';

const HiddenField = React.memo((props: InputProps) => {
  const { name, value } = props;

  const nameRef = useRef<number>(0);
  const formContext = useContext(FormContext);

  useEffect(() => {
    formContext.subscribe?.(nameRef, null, {
      name,
      getValue: () => value,
    });
    return () => formContext.unsubscribe?.(nameRef);
  }, []);
  return null;
});

export default HiddenField;
