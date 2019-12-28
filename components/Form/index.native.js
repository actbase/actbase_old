import React, { useRef, useState } from 'react';
import { findNodeHandle, View } from 'react-native';
import { measure } from '../utils';

export const FormContext = React.createContext({});

const Form = props => {
  const elements = useRef({});
  const [data, setData] = useState({});
  const { onLayout, ...oProps } = props;

  const addTarget = async (name, input, fn) => {
    elements.current[name] = { input, fn };
  };

  const handleLayout = async e => {
    onLayout && onLayout(e);
    for (let key of Object.keys(elements?.current)) {
      const el = elements?.current[key];
      const pos = await measure(findNodeHandle(el.input));
      const area = parseFloat(
        `${Math.floor(pos.pageX)}.${Math.floor(pos.pageY)}`,
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

  const onChangeText = (name, value) => {
    setData(state => {
      state[name] = value;
      return state;
    });
  };

  const onSubmit = input => {
  };

  const value = { addTarget, onChangeText, onSubmit };
  return (
    <FormContext.Provider value={value}>
      <View onLayout={handleLayout} {...oProps} />
    </FormContext.Provider>
  );
};

export default Form;
