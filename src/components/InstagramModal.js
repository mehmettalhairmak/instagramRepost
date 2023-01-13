import React from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const InstagramModal = props => {
  return (
    <Modal animationType="slide" transparent={false} {...props}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        {props.children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default InstagramModal;
