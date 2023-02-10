import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import CookieManager from '@react-native-cookies/cookies';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../navigation/StackNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch } from '../hooks';
import { setAuthUser } from '../redux/slices/authUser/authUserSlice';

interface ScreenHeaderProps {
  title: string;
  isBackTrue?: boolean;
  favoritePlace?: boolean;
  favoriteProcess?: ()=>void;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  isBackTrue = false,
  favoritePlace = false,
  favoriteProcess,
}) => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const signOut = async () => {
    await AsyncStorage.removeItem('@currentUser');
    CookieManager.clearAll(true).then(res => {
      dispatch(setAuthUser({ access_token: '', user_id: '' }));
      navigation.navigate('LoginScreen');
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '25%',
          alignItems: 'flex-start',
        }}>
        {isBackTrue && (
          <TouchableOpacity
            onPress={() => navigation.canGoBack() && navigation.goBack()}>
            <Ionicons name="chevron-back-sharp" size={hp(4.4)} />
          </TouchableOpacity>
        )}
      </View>
      <View style={{ width: '50%', alignItems: 'center' }}>
        <Text
          allowFontScaling={false}
          style={{ fontSize: hp(3), fontFamily: 'Roboto-Bold' }}>
          {title}
        </Text>
      </View>
      <View
        style={{
          width: '25%',
          alignItems: 'flex-end',
        }}>
        {!isBackTrue && (
          <TouchableOpacity onPress={signOut}>
            <MaterialCommunityIcons name="logout" size={hp(4.4)} />
          </TouchableOpacity>
        )}
        {favoritePlace && (
          <TouchableOpacity onPress={favoriteProcess}>
            <MaterialIcons name="favorite-outline" size={hp(4)} />
            
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
