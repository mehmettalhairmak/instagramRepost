import { DefaultTFuncReturn } from 'i18next';
import React from 'react';
import { Pressable, StyleSheet, Text, PressableProps } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface ButtonProps {
  status?: 'save';
  text?: string | DefaultTFuncReturn;
  textColor?: string;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({
  status = '',
  text = '',
  textColor = 'white',
  onPress,
}) => {
  const getButtonColor = (status: string) => {
    switch (status) {
      case 'save':
        return '#ADA2FF';
      default:
        return 'white';
    }
  };

  return (
    <Pressable
      style={[styles.container, { backgroundColor: getButtonColor(status) }]}
      onPress={onPress}>
      <Text style={[styles.buttonText, { color: textColor }]}>{text}</Text>
    </Pressable>
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

export default Button;
