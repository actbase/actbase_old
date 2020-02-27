import * as React from 'react';
import forIn from 'lodash/forIn';
import isEqual from 'lodash/isEqual';
import View from '../web/View';
import { measure } from '../common/utils';

export interface FormProps {
  style?: any;
  output: 'json' | 'FormData';
  onSubmit?: (data: FormData | FormJson) => void;
  onError?: (data: any) => void;
  onLayout?: (event: { nativeEvent: { layout: { x: number; y: number; width: number; height: number } } }) => void;
}

export interface FormContextArgs {
  subscribe?: (oRef: React.MutableRefObject<number>, input: any, options: ChildOption) => void;
  unsubscribe?: (oRef: React.MutableRefObject<number>) => void;
  submit?: () => any;
}

export interface FormJson {
  [key: string]: any;
}

export interface Children {
  [key: string]: {
    input: any;
    options: {
      name?: string;
      focus?: () => void;
      blur?: () => void;
      setProps: (data: ChildExtraProps) => void;
      getValue: () => any;
      onValidate: (value: any, values: any) => FieldError;
    };
    area: number;
  };
}

export interface ChildOption {
  name?: string;
  setProps?: any;
  getValue?: any;
  onValidate?: any;
  focus?: any;
  blur?: any;
}

export interface ChildExtraProps {
  returnKeyType?: string;
  onSubmitEditing?: any;
  submitting?: boolean;
  submited?: boolean;
  hint?: string;
  error?: 'success' | 'warn' | 'error';
}

export interface FieldError {
  level?: 'success' | 'warn' | 'error';
  message?: string;
}

export const FormContext = React.createContext<FormContextArgs>({});

const Form: React.FC<FormProps> = (props: FormProps): React.ReactElement => {
  const items = React.useRef<Children>({});
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
      const args: ChildExtraProps = {};
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
    const elements = Object.values(items?.current).filter(v => !!v.options?.name);

    let formErrors: FieldError[] = [];
    const params: FormJson = {};
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
        const error: FieldError = opt.onValidate?.(opt.getValue(), params[opt.name]);
        if (error && (!error.level || error.level === 'error')) {
          formErrors.push(error);
        }
      }
    });

    if (formErrors.length > 0) {
      await props?.onError?.(formErrors);
    } else {
      forIn(items?.current, v => {
        v.options?.setProps?.({ submitting: true });
      });

      let result: FormJson | FormData = params;
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
      await props?.onSubmit?.(result);
    }

    forIn(items?.current, v => {
      v.options?.setProps?.({ submitting: false, submited: true });
    });
  }, []);

  const value = { subscribe, unsubscribe, submit };
  return (
    <FormContext.Provider value={value}>
      <View onLayout={handleLayout} {...oProps} />
    </FormContext.Provider>
  );
};

export default Form;
