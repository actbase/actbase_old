import * as React from 'react';
import { forIn, isEqual } from 'lodash';
import View from '../web/View';
import { measure } from '../App/utils';

export interface FormProps {
  style?: any;
  output: 'json' | 'FormData';
  onSubmit: any;
  onLayout: any;
}

export interface ResultProps {
  returnKeyType?: string;
  onSubmitEditing?: any;
}

export interface ResultData {
  [key: string]: any;
}

export interface FieldItems {
  [key: string]: {
    input: any;
    options: {
      name?: string;
      focus?: boolean;
      setProps: any;
      getValue: any;
    };
    area: number;
  };
}

export const FormContext = React.createContext({});

const Form: React.FC<FormProps> = (props: FormProps): React.ReactElement => {
  const items = React.useRef<FieldItems>({});
  const index = React.useRef<number>(0);
  const subscribe = React.useCallback((oRef, input, options) => {
    let name = oRef.current;
    if (!name) {
      name = `FormField_${index.current}`;
      oRef.current = name;
      index.current = index.current + 1;
    }
    items.current[name] = { input, options, area: 0 };
  }, []);

  const unsubscribe = React.useCallback(oRef => {
    let name = oRef.current;
    delete items.current[name];
  }, []);

  const [lastLayout, setLastLayout] = React.useState({});
  const { onLayout, ...oProps } = props;

  const handleLayout = React.useCallback(async e => {
    onLayout && onLayout(e);
    const { width, height } = e.nativeEvent.layout;
    const pos = { width, height };
    if (isEqual(lastLayout, pos)) return;
    setLastLayout(pos);

    for (let key of Object.keys(items?.current)) {
      const el = items?.current[key];
      if (el.input) {
        const pos = await measure(el.input);
        const area = -parseFloat(`${Math.floor(pos?.pageY)}.${Math.floor(pos?.pageX)}`);
        items.current[key].area = area;
      }
    }

    const elements = Object.values(items.current)
      ?.filter(v => !!v.options.focus)
      ?.sort((a, b) => (a.area < b.area ? 1 : a.area > b.area ? -1 : 0));

    elements?.forEach((v: any, index: number) => {
      const args: ResultProps = {};
      if (elements.length - 1 <= index) {
        args.returnKeyType = 'done';
        args.onSubmitEditing = submit;
      } else {
        args.returnKeyType = 'next';
        args.onSubmitEditing = elements[index + 1].options.focus;
      }
      v.options?.setProps?.(args);
    });
  }, []);

  const submit = React.useCallback(async () => {
    const elements = Object.values(items?.current).filter(v => {
      v.options?.setProps?.({ submitting: true });
      return !!v.options?.name;
    });

    const params: ResultData = {};
    elements.forEach(v => {
      const opt = v.options;
      if (opt?.name) {
        if (params[opt.name] === undefined) {
          params[opt.name] = opt.getValue();
        } else if (params[opt.name]?.push !== undefined) {
          params[opt.name].push(opt.getValue());
        } else if (params[opt.name] !== null && params[opt.name] !== undefined) {
          const values = [...params[opt.name], opt.getValue()];
          params[opt.name] = values;
        }
      }
    });

    let result: ResultData | FormData = params;
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
