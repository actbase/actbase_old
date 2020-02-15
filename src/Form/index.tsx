import React, { useCallback, useRef, useState } from 'react';
import { forIn, isEqual } from 'lodash';
import View from '../web/View';
import { measure } from '../App/utils';

export interface FormProps {
  style?: any;
  output: 'json' | 'FormData';
  onSubmit: any;
  onLayout: any;
}

export const FormContext = React.createContext({});

const Form: React.FC<FormProps> = (props: FormProps): React.ReactElement => {
  const items = useRef<any>({});
  const index = useRef<number>(0);
  const subscribe = useCallback((oRef, input, options) => {
    let name = oRef.current;
    if (!name) {
      name = `FormField_${index.current}`;
      oRef.current = name;
      index.current = index.current + 1;
    }
    items.current[name] = { input, options };
  }, []);

  const unsubscribe = useCallback(oRef => {
    let name = oRef.current;
    delete items.current[name];
  }, []);

  const [lastLayout, setLastLayout] = useState({});
  const { onLayout, ...oProps } = props;

  const handleLayout = useCallback(async e => {
    onLayout && onLayout(e);
    const { width, height } = e.nativeEvent.layout;
    const pos = { width, height };
    if (isEqual(lastLayout, pos)) return;
    setLastLayout(pos);

    for (let key of Object.keys(items?.current)) {
      const el = items?.current[key];
      if (el.input) {
        const pos = await measure(el.input);
        const area = parseFloat(`${Math.floor(pos?.pageY)}.${Math.floor(pos?.pageX)}`);
        items.current[key].area = area;
      }
    }

    const elements = Object.values(items.current)
        // @ts-ignore
      ?.filter(v => !!v.options.focus)
      ?.sort((a: any, b: any) => (a.area > b.area ? 1 : a.area < b.area ? -1 : 0));

    elements?.forEach((v: any, index: number) => {
      const args: any = {};
      if (elements.length - 1 <= index) {
        args.returnKeyType = 'done';
        args.onSubmitEditing = submit;
      } else {
        args.returnKeyType = 'next';
        // @ts-ignore
        args.onSubmitEditing = elements[index + 1].options.focus;
      }
      v.options?.setProps?.(args);
    });
  }, []);

  const submit = useCallback(async () => {
    const elements = Object.values(items?.current).filter(v => {
      // @ts-ignore
      v.options?.setProps?.({ submitting: true });
      // @ts-ignore
      return !!v.options?.name;
    });

    const params: any = {};
    elements.forEach(v => {
      // @ts-ignore
      const opt = v.options;
      if (params[opt.name] === undefined) {
        params[opt.name] = opt.getValue();
      } else if (params[opt.name]?.push !== undefined) {
        params[opt.name].push(opt.getValue());
      } else if (params[opt.name] !== null && result[opt.name] !== undefined) {
        const values = [...params[opt.name], opt.getValue()];
        params[opt.name] = values;
      }
    });

    let result = params;
    if (props.output === 'FormData') {
      result = new FormData();
      forIn(params, (value, name) => {
        if (value?.push) {
          value?.forEach((v: any) => result.append(name, `${v}`));
        } else {
          result.append(name, `${value}`);
        }
      });
    }

    const o = await props?.onSubmit?.(result);

    forIn(items?.current, v => {
      v.options?.setProps?.({ submitting: false });
    });

    return o;
  }, []);

  const value = { subscribe, unsubscribe, submit };
  return (
    <FormContext.Provider value={value}>
      <View onLayout={handleLayout} {...oProps} />
    </FormContext.Provider>
  );
};

export default Form;
