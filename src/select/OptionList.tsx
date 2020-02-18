import * as React from 'react';
import { Animated, Text, TouchableOpacity } from 'react-native';
import { MeasureResult } from '../apps/utils';

export interface OptionProps {
  value?: any;
  children?: any;
  text?: string;
}

export interface OptionListProps {
  options: OptionProps[];
  offsets: MeasureResult;
}

const OptionList: React.FC<OptionListProps> = (props: OptionListProps) => {
  const anim = React.useRef(new Animated.Value(0));

  const { offsets } = props;

  React.useEffect(() => {
    Animated.timing(anim.current, {
      toValue: 1,
      duration: 200,
    }).start();
  }, []);

  const maxHeight = anim.current.interpolate({
    inputRange: [0, 1],
    outputRange: [offsets.height, 200],
  });

  return (
    <Animated.ScrollView
      style={{ width: offsets.width, minHeight: offsets.height, maxHeight, backgroundColor: '#fff', borderWidth: 1, borderRadius: 4, borderColor: '#ddd' }}
    >
      {props.options.map(option => (
        <TouchableOpacity style={{ height: 40, justifyContent: 'center', paddingHorizontal: 10 }}>
          <Text>{option.text}</Text>
        </TouchableOpacity>
      ))}
    </Animated.ScrollView>
  );
};

export default OptionList;
