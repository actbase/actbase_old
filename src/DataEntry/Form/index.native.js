import React, { useCallback, useRef, useState } from 'react';
import { findNodeHandle, View } from 'react-native';
import { measure } from '../../App/utils';
import { forIn, isEqual } from 'lodash';

export const FormContext = React.createContext({});

const Form = props => {
  const elements = useRef({});
  const [data, setData] = useState({});
  const [lastLayout, setLastLayout] = useState({});
  const { onLayout, ...oProps } = props;

  const addTarget = useCallback((name, input, fn) => {
    elements.current[name] = { name, input, fn };
  }, []);

  const handleLayout = async e => {
    onLayout && onLayout(e);
    const { width, height } = e.nativeEvent.layout;
    const pos = { width, height };
    if (isEqual(lastLayout, pos)) return;
    setLastLayout(pos);

    for (let key of Object.keys(elements?.current)) {
      const el = elements?.current[key];
      const pos = await measure(findNodeHandle(el.input));
      const area = parseFloat(
        `${Math.floor(pos.pageY)}.${Math.floor(pos.pageX)}`,
      );
      elements.current[key].area = area;
    }

    const items = Object.values(elements.current);
    items
      ?.sort((a, b) => (a.area > b.area ? 1 : a.area < b.area ? -1 : 0))
      ?.map((v, index) => {
        const args = {};
        if (items.length - 1 <= index) {
          args.returnKeyType = 'done';
        } else {
          args.returnKeyType = 'next';
          args.onSubmitEditing = items[index + 1].input?.focus;
        }
        v.fn(args);
      });
  };

  const onChangeText = useCallback((name, value) => {
    setData(state => {
      state[name] = value;
      return state;
    });
  }, []);

  const submit = input => {
    let result = data;
    if (props.output === 'FormData') {
      result = new FormData();
      forIn(data, (value, name) => result.append(name, `${value}`));
    }
    props?.onSubmit?.(result);
  };

  const value = { addTarget, onChangeText, submit };
  return (
    <FormContext.Provider value={value}>
      <View onLayout={handleLayout} {...oProps} />
    </FormContext.Provider>
  );
};

export default Form;
