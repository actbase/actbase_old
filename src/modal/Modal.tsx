import React, { ReactNode, useContext, useEffect } from 'react';
import { ViewProps } from 'react-native';
import { ABContext } from '../apps/utils';

export interface ModalProps extends ViewProps {
  children: ReactNode;
  isVisible: boolean;
  onModalShow: () => void;
  onModalWillShow: () => void;
  onModalHide: () => void;
  onModalWillHide: () => void;
  onBackButtonPress: () => void;
  onBackdropPress: () => void;
}

const Modal = React.memo((props: ModalProps) => {
  const { isVisible } = props;
  const abContext = useContext(ABContext);

  useEffect(() => {

    console.log(abContext);

  }, [isVisible]);

  return null;
});

export default Modal;
