import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ScreenHeader = ({ title, isBackTrue }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ width: '15%' }}>
        {isBackTrue && (
          <TouchableOpacity
            onPress={() => navigation.canGoBack() && navigation.goBack()}>
            <Ionicons name="chevron-back-sharp" size={hp(4.4)} />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          width: '70%',
          alignItems: 'center',
        }}>
        <Text
          allowFontScaling={false}
          style={{ fontSize: hp(3), fontFamily: 'Roboto-Bold' }}>
          {title}
        </Text>
      </View>
      <View style={{ width: '15%', height: '100%' }} />
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
