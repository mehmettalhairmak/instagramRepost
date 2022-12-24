import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Clipboard from '@react-native-clipboard/clipboard';

const PasteFromClipboardButton = () => {
  useEffect(() => {
    //Clipboard.setString('cp');
  }, []);

  const pasteFromClipboard = async () => {
    const clipboardData = await Clipboard.getString();
    if (clipboardData.includes('https://www.instagram.com/p/')) {
      console.log('this is instagram post link ---> ', clipboardData);
    } else if (clipboardData.includes('https://www.instagram.com/reel/')) {
      console.log('this is instagram reel link ---> ', clipboardData);
    } else {
      console.log('this is not instagram link ---> ', clipboardData);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={pasteFromClipboard}>
      <Text style={styles.buttonText}>Paste Post From Clipboard</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: 'white',
    borderRadius: hp(4),
  },
  buttonText: {
    fontFamily: 'Roboto-Bold',
  },
});

export default PasteFromClipboardButton;
