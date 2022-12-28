import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default Button = ({ status, textColor, text, onPress }) => {
  const getButtonColor = status => {
    switch (status) {
      case 'save':
        return '#ADA2FF';
      default:
        return 'white';
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: getButtonColor(status) }]}
      onPress={onPress}>
      <Text style={[styles.buttonText, { color: textColor ?? 'white' }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp(80),
    height: hp(8),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: hp(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: hp(4),
  },
  buttonText: {
    fontFamily: 'Roboto-Bold',
  },
});
