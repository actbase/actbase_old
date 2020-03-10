import * as React from 'react';
import forIn from 'lodash/forIn';
import isEqual from 'lodash/isEqual';
import View from '../web/View';
import { measure } from '../common/utils';
import { Children, ExtraProps, FieldError, FormContextArgs, FormJson, FormProps } from './res/types';

export const FormContext = React.createContext<FormContextArgs>({});

const Form = React.forwardRef((props: FormProps, onRef: any) => {
  const items = React.useRef<Children>({});
  const index = React.useRef<number>(0);
  const subscribe = React.useCallback((oRef, node, options) => {
    let name = oRef.current;
    if (!name) {
      name = `FormField_${index.current}`;
      oRef.current = name;
      index.current = index.current + 1;
    }
    items.current[name] = { node, options, area: 0 };
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
      if (el.node) {
        const pos = await measure(el.node);
        const area = -parseFloat(`${Math.floor(pos?.pageY)}.${Math.floor(pos?.pageX)}`);
        items.current[key].area = area;
      }
    }

    const elements = Object.values(items.current)
      ?.filter(v => !!v.options.focus)
      ?.sort((a, b) => (a.area < b.area ? 1 : a.area > b.area ? -1 : 0));

    elements?.forEach((v: any, index: number) => {
      const args: ExtraProps = {};
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

  const submit = async () => {
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
          params[opt.name] = [...params[opt.name], opt.getValue()];
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
      v.options?.setProps?.({ submitting: false, submitted: true });
    });
  };

  const refObject = {
    submit,
  };

  if (typeof onRef === 'function') {
    onRef?.(refObject);
  } else if (onRef && Object.keys(onRef).indexOf('current') >= 0) {
    onRef.current = refObject;
  }

  const value = { subscribe, unsubscribe, submit };
  return (
    <FormContext.Provider value={value}>
      <View onLayout={handleLayout} {...oProps} />
    </FormContext.Provider>
  );
});

export default Form;
