import React, { useCallback, useMemo, useRef, useState } from 'react';
import { findNodeHandle, View } from 'react-native';
import { measure } from '../App/utils.native';
import { forIn, isEqual } from 'lodash';

export const FormContext = React.createContext({});

const Form = React.memo(props => {
  const buttons = useRef([]);
  const elements = useRef({});
  const [data, setData] = useState({});
  const [lastLayout, setLastLayout] = useState({});
  const { onLayout, ...oProps } = props;

  const addTarget = useCallback((name, input, fn) => {
    elements.current[name] = { name, input, fn };
  }, []);

  const addSubmit = useCallback((index, input, fn) => {
    if (index < 0 || index === undefined) {
      index = buttons.current?.length;
    }
    buttons.current[index] = { input, fn };
    return index;
  }, []);

  const handleLayout = useCallback(async e => {
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
          args.onSubmitEditing = submit;
        } else {
          args.returnKeyType = 'next';
          args.onSubmitEditing = items[index + 1].input?.focus;
        }
        v.fn(args);
      });
  }, []);

  const onChangeText = useCallback((name, value) => {
    setData(state => {
      state[name] = value;
      return state;
    });
  }, []);

  const submit = useCallback(async () => {
    let result = data;
    if (props.output === 'FormData') {
      result = new FormData();
      forIn(data, (value, name) => result.append(name, `${value}`));
    }

    forIn(buttons.current, el => el.fn({ submitting: true }));
    const o = await props?.onSubmit?.(result);
    forIn(buttons.current, el => el.fn({ submitting: false }));

    return o;
  }, []);

  const value = { addTarget, addSubmit, onChangeText, submit };
  return (
    <FormContext.Provider value={value}>
      <View onLayout={handleLayout} {...oProps} />
    </FormContext.Provider>
  );
});

export default Form;
