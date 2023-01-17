import React from 'react';
import { StyleSheet, View, Modal, ModalProps } from 'react-native';

interface InstagramModalProps extends ModalProps {
  children: React.ReactElement
}

const InstagramModal: React.FC<InstagramModalProps> = ({children, ...props}) => {
  return (
    <Modal animationType="slide" transparent={false} {...props}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default InstagramModal;
