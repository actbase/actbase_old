import React, { useContext, useEffect, useRef } from 'react';
import { FormContext } from '../Form';

const HiddenField = props => {
  const { name, value } = props;

  const fname = useRef();
  const formContext = useContext(FormContext);

  useEffect(() => {
    formContext.subscribe?.(fname, null, {
      name,
      getValue: () => value,
    });

    return () => {
      formContext.unsubscribe?.(fname);
    };
  }, []);

  return null;
};

export default HiddenField;
