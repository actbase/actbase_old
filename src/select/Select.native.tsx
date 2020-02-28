import * as React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import omit from 'lodash/omit';

import { ABContext, MARGIN_STYLES, TEXT_STYLE_NAMES } from '../common/utils.native';
import getResource from '../common/res.native';

import { FormContext } from '../form/Form';
import { ExtraProps } from '../form/res/types';

import { OptionProps, SelectProps } from './res/types';
import useError from '../inputs/useError';
import Absolute from '../apps/Absolute';

const STYLE_GROUP_NAME = 'ab-select';

const Select = (props: SelectProps) => {
  const { name, tpl, style, placeholder, value, validators, hintStyle } = props;

  /** Form Context Sync **/
  const formContext = React.useContext(FormContext);
  const [error, onValidate] = useError(validators);

  const nameRef = React.useRef<number>(0);
  const nodeRef = React.useRef<any>();

  const handleRef = (el: any) => {
    nodeRef.current = el;
    formContext.subscribe?.(nameRef, el, {
      name,
      getValue,
      setProps,
      onValidate,
    });
  };

  React.useEffect(() => {
    if (props.validateMode === 'always') {
      onValidate(selected?.value, null);
    }
    return () => formContext.unsubscribe?.(nameRef);
  }, []);

  const [extraProps, setExtraProps] = React.useState<ExtraProps>({});
  const setProps = React.useCallback(
    (props: ExtraProps) => {
      if (!isEqual(props, extraProps)) {
        setExtraProps(p => ({ ...p, ...props }));
      }
    },
    [extraProps],
  );
  /** Form Context Sync **/

  const children = isArray(props.children) ? props.children : [props.children];
  const options: OptionProps[] =
    props.options || children.map(element => ({ value: element?.props.value, view: element?.props.children }));

  const [data, setData] = React.useState<OptionProps | null | undefined>();
  const selected = options?.find(v => v?.value === value) || data;

  const getValue = React.useCallback(() => {
    return selected?.value;
  }, [selected]);

  /*** style dimensions ***/
  const classNames = [`${STYLE_GROUP_NAME}`];
  const hitClassNames = [`${STYLE_GROUP_NAME}-hint`];

  /*** event listener ***/
  const handlePress = () => {};

  /*** to Render ***/
  const abContext = React.useContext(ABContext);
  const r = getResource(STYLE_GROUP_NAME);

  const elementStyle = StyleSheet.flatten(
    classNames.map(v => [r.styles[v], r.styles[`${v}-tpl-${tpl}`]]).concat([style]),
  );
  const hintElStyle = StyleSheet.flatten(
    hitClassNames.map(v => [r.styles[v], r.styles[`${v}-tpl-${tpl}`]]).concat([hintStyle]),
  );

  console.log(setData, abContext);
  //, transform: [{ rotateZ }]
  return (
    <View style={pick(elementStyle, MARGIN_STYLES)}>
      <TouchableOpacity
        ref={handleRef}
        activeOpacity={1}
        onPress={handlePress}
        style={omit(elementStyle, MARGIN_STYLES)}
      >
        <View style={{ flex: 1 }}>
          {!selected?.value ? (
            <Text>{placeholder}</Text>
          ) : typeof selected.view === 'string' ? (
            <Text>{selected.view}</Text>
          ) : (
            selected.view
          )}
        </View>
        <Animated.Image source={require('./res/arrow_down.png')} style={{ width: 20, height: 20 }} />
      </TouchableOpacity>
      <Absolute isVisible={false}>
        <View style={{ width: 200, height: 200, backgroundColor: '#F00', alignItems: 'center', justifyContent: 'center' }}>
          <Text>22222</Text>
        </View>
      </Absolute>
      {(!!error || !!props?.hint) && (
        <View style={omit(hintElStyle, TEXT_STYLE_NAMES)}>
          <Text style={pick(hintElStyle, TEXT_STYLE_NAMES)}>{error?.message || props?.hint}</Text>
        </View>
      )}
    </View>
  );

  //
  // const anim = React.useRef(new Animated.Value(0));
  // const optionListView = React.useRef<React.ReactNode>();
  //
  //
  //
  // let suffix = '';
  // if (tpl && styles[`${STYLE_GROUP_NAME}-tpl-${tpl}`]) {
  //   suffix = `-tpl-${tpl}`;
  // }
  //
  //
  //
  // const handleRelease = (option?: any) => {
  //   Animated.timing(anim.current, {
  //     toValue: 0,
  //     duration: 150,
  //   }).start(() => {
  //     abContext.detach?.(optionListView.current);
  //   });
  //
  //   if (option?.value) {
  //     setData(option);
  //   }
  // };
  //
  // const handlePress = async () => {
  //   if (!abContext || !abContext.attach) return;
  //
  //   const offsets: MeasureResult = await measure(nodeRef.current);
  //   const translateY = anim.current.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: [-20, 0],
  //   });
  //
  //   optionListView.current = (
  //     <>
  //       <TouchableOpacity style={{ flex: 1 }} onPress={handleRelease} />
  //       <View style={{ position: 'absolute', top: offsets.pageY + 38 + 5, left: offsets.pageX }}>
  //         <Animated.ScrollView
  //           style={{
  //             width: offsets.width,
  //             minHeight: offsets.height,
  //             opacity: anim.current,
  //             maxHeight: 200,
  //             backgroundColor: '#fff',
  //             borderWidth: 1,
  //             borderRadius: 4,
  //             borderColor: '#ddd',
  //             transform: [{ translateY }],
  //           }}
  //         >
  //           {options.map((option, index) => (
  //             <TouchableOpacity
  //               key={`${option.value}${index}`}
  //               onPress={() => handleRelease(option)}
  //               style={{ height: 40, justifyContent: 'center', paddingHorizontal: 10 }}
  //             >
  //               {typeof option.view === 'string' ? <Text>{option.view}</Text> : option.view}
  //             </TouchableOpacity>
  //           ))}
  //         </Animated.ScrollView>
  //       </View>
  //     </>
  //   );
  //
  //   abContext.attach(optionListView.current);
  //   Animated.timing(anim.current, {
  //     toValue: 1,
  //     duration: 200,
  //   }).start();
  // };
  //
  // const rotateZ = anim.current.interpolate({
  //   inputRange: [0, 1],
  //   outputRange: ['0deg', '-180deg'],
  // });
  //
  // const getValue = React.useCallback(() => {
  //   return selected?.value;
  // }, [selected]);
  //
  //
  //
};

Select.defaultProps = {
  tpl: 'default',
};

export default React.memo(Select);
