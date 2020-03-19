import * as React from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import isArray from 'lodash/isArray';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import omit from 'lodash/omit';

import { MARGIN_STYLES, TEXT_STYLE_NAMES } from '../common/utils.native';
import getResource from '../common/res.native';

import { FormContext } from '../form/Form';
import { ExtraProps } from '../form/res/types';

import { OptionProps, SelectProps } from './res/types';
import useError from '../inputs/useError';
import Absolute from '../apps/Absolute';
import { getWindowSize, measure } from '../common/utils';

export interface OffsetProps {
  left: number;
  top: any;
  bottom: any;
  width: number;
  height: number;
  reverse: boolean;
}

const STYLE_GROUP_NAME = 'ab-select';

const COVER_STYLES = [
  'borderWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth',
  'borderColor',
  'borderLeftColor',
  'borderRightColor',
  'borderTopColor',
  'borderBottomColor',
  'borderRadius',
  'backgroundColor',
];

const Select = (props: SelectProps) => {
  const { name, tpl, style, placeholder, value, initValue, validators, hintStyle, onChangeValue } = props;

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

  const [data, setData] = React.useState<OptionProps | null | undefined>(
    options?.find(v => v?.value === value || v?.value === initValue),
  );
  const selected = options?.find(v => v?.value === value) || data;

  const getValue = React.useCallback(() => {
    return selected?.value;
  }, [selected]);

  /*** style dimensions ***/
  const classNames = [`${STYLE_GROUP_NAME}`];
  const hitClassNames = [`${STYLE_GROUP_NAME}-hint`];

  /*** event listener ***/
  const [offsets, setOffsets] = React.useState<OffsetProps | null>(null);
  const handlePress = async () => {
    const size = await getWindowSize();
    const pos = await measure(nodeRef.current);

    const offsets: OffsetProps = {
      top: (pos?.pageY || 0) + (pos?.height || 0) + 5,
      bottom: 'auto',
      left: pos?.pageX,
      width: pos?.width,
      height: pos?.height,
      reverse: false,
    };

    if (size.height - pos.pageY < 200 + pos.height) {
      offsets.reverse = true;
      offsets.top = 'auto'; //pos.pageY;// - (200 + pos.height + 5);
      offsets.bottom = size.height - pos.pageY + 5;
    }

    setOffsets(offsets);
    Animated.timing(anim.current, {
      toValue: 1,
      duration: 200,
    }).start();
  };
  const handleRelease = (option?: any) => {
    Animated.timing(anim.current, {
      toValue: 0,
      duration: 150,
    }).start(() => {
      setOffsets(null);
    });

    if (option?.value) {
      setData(option);
      onChangeValue?.(option);
    }
  };

  /*** to Render ***/
  const anim = React.useRef(new Animated.Value(0));
  const r = getResource(STYLE_GROUP_NAME);

  const elementStyle = StyleSheet.flatten(
    classNames.map(v => [r.styles[v], r.styles[`${v}-tpl-${tpl}`]]).concat([style]),
  );

  const hintElStyle = StyleSheet.flatten(
    hitClassNames.map(v => [r.styles[v], r.styles[`${v}-tpl-${tpl}`]]).concat([hintStyle]),
  );

  const rotateZ = anim.current.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-180deg'],
  });

  const translateY = anim.current.interpolate({
    inputRange: [0, 1],
    outputRange: offsets?.reverse ? [20, 0] : [-20, 0],
  });

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
            <Text
              style={[
                r.styles[`${STYLE_GROUP_NAME}-placeholder`],
                r.styles[`${STYLE_GROUP_NAME}-placeholder-tpl-${tpl}`],
              ]}
            >
              {placeholder}
            </Text>
          ) : typeof selected.view === 'string' ? (
            <Text style={pick(elementStyle, TEXT_STYLE_NAMES)}>{selected.view}</Text>
          ) : (
            selected.view
          )}
        </View>
        <Animated.Image
          source={{ uri: r.assets[`${STYLE_GROUP_NAME}-arrow-image`] }}
          style={[
            r.styles[`${STYLE_GROUP_NAME}-arrow`],
            r.styles[`${STYLE_GROUP_NAME}-arrow-tpl-${tpl}`],
            { transform: [{ rotateZ }] },
          ]}
        />
      </TouchableOpacity>
      <Absolute isVisible={offsets !== null}>
        <>
          <TouchableOpacity style={[StyleSheet.absoluteFill]} onPress={handleRelease} />
          <View
            style={{
              position: 'absolute',
              top: offsets?.top,
              bottom: offsets?.bottom,
              left: offsets?.left,
            }}
          >
            <Animated.ScrollView
              style={[
                pick(elementStyle, COVER_STYLES),
                {
                  width: offsets?.width,
                  minHeight: offsets?.height,
                  transform: [{ translateY }],
                  opacity: anim.current,
                  maxHeight: 200,
                },
              ]}
            >
              {options.map((option, index) => (
                <TouchableOpacity
                  key={`${option.value}${index}`}
                  onPress={() => handleRelease(option)}
                  style={{ height: 40, justifyContent: 'center', paddingHorizontal: 10 }}
                >
                  {typeof option.view === 'string' ? <Text>{option.view}</Text> : option.view}
                </TouchableOpacity>
              ))}
            </Animated.ScrollView>
          </View>
        </>
      </Absolute>
      {(!!error || !!props?.hint) && (
        <View style={omit(hintElStyle, TEXT_STYLE_NAMES)}>
          <Text style={pick(hintElStyle, TEXT_STYLE_NAMES)}>{error?.message || props?.hint}</Text>
        </View>
      )}
    </View>
  );
};

Select.defaultProps = {
  tpl: 'default',
};

export default React.memo(Select);
