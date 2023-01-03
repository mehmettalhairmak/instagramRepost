import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import CookieManager from '@react-native-cookies/cookies';

const ScreenHeader = ({ title, isBackTrue }) => {
  const navigation = useNavigation();

  const signOut = () => {
    CookieManager.clearAll(true);
    // .then(res => {
    //   setCurrentUser(null);
    // });
  };

  return (
    <View style={styles.container}>
      <View style={{ width: '25%', alignItems: 'center', borderWidth: 1 }}>
        {isBackTrue && (
          <TouchableOpacity
            onPress={() => navigation.canGoBack() && navigation.goBack()}>
            <Ionicons name="chevron-back-sharp" size={hp(4.4)} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ width: '50%', alignItems: 'center', borderWidth: 1 }}>
        <Text
          allowFontScaling={false}
          style={{ fontSize: hp(3), fontFamily: 'Roboto-Bold' }}>
          {title}
        </Text>
      </View>
      <View style={{ width: '25%', alignItems: 'center', borderWidth: 1 }}>
        {!isBackTrue && (
          <TouchableOpacity onPress={signOut}>
            <MaterialCommunityIcons name="logout" size={hp(4.4)} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: hp(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp(2),
  },
});

export default ScreenHeader;
