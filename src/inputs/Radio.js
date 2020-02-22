import React, { useContext } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FormContext } from '../form/Form';
import { ABContext } from '../apps/utils.native';

const Radio = props => {
  const { checked, children, style, ...oProps } = props;

  const abContext = useContext(ABContext);
  const formContext = useContext(FormContext);

  // return (
  //   <TouchableOpacity {...props}>
  //     {checked && (
  //       <View
  //         style={{
  //           backgroundColor: colors.green_blue,
  //           width: 7,
  //           height: 7,
  //           borderRadius: 7 / 2,
  //         }}
  //       />
  //     )}
  //   </TouchableOpacity>
  // );
  return null;
};

export default Radio;
