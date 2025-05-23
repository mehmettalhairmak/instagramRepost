import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import InstagramLogin from 'react-native-instagram-login';
import {
  INSTAGRAM_APP_ID,
  INSTAGRAM_APP_SECRET,
  REDIRECT_URL,
} from '../constants/instagram';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';
import i18next from 'i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import { checkIsDebug } from '../constants/general';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  selectAuthUser,
  setAuthUser,
} from '../redux/slices/authUser/authUserSlice';

const LoginScreen = () => {
  let isDebug: boolean;
  const insRef = useRef<any>();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(selectAuthUser);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  useEffect(() => {
    (async () => {
      try {
        const currentUserString = await AsyncStorage.getItem('@currentUser');
        if (currentUserString !== null) {
          const currentUser = JSON.parse(currentUserString);
          const availableLoginTimeLimit = currentUser.availableLoginTimeLimit;
          if (moment().isBefore(availableLoginTimeLimit)) {
            dispatch(setAuthUser(currentUser));
          }
        }
      } catch (error) {
        console.log('AsyncStorage LoginScreen GetItem Error ---> ', error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const result = await checkIsDebug();
      isDebug = result.isDebug;
      if (authUser.access_token !== '') {
        if (isDebug) {
          console.log('debug mode');
          navigation.navigate('PlaceListScreen');
        } else {
          navigation.navigate('HomeScreen');
        }
      }
    })();
  }, [authUser]);

  const onLoginSuccess = async (user: any) => {
    let storageLoginData = user;

    let availableLoginTimeLimit = moment().add(1, 'hour');
    storageLoginData.availableLoginTime = availableLoginTimeLimit;
    try {
      await AsyncStorage.setItem(
        '@currentUser',
        JSON.stringify(storageLoginData),
      );
    } catch (error) {
      console.log('AsyncStorage LoginScreen SetItem Error ---> ', error);
    }
    dispatch(setAuthUser(user));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={styles.content}>
        <Text
          allowFontScaling={false}
          style={{ fontFamily: 'Roboto-Bold', fontSize: hp(3.4) }}>
          Travel Places
        </Text>
      </View>
      <View style={styles.login}>
        <Button
          text={i18next.t('LoginWithInstagram')}
          textColor="black"
          onPress={() => insRef.current.show()}
        />
      </View>
      <InstagramLogin
        ref={insRef}
        appId={INSTAGRAM_APP_ID}
        appSecret={INSTAGRAM_APP_SECRET}
        redirectUrl={REDIRECT_URL}
        scopes={['user_profile', 'user_media']}
        onLoginSuccess={onLoginSuccess}
        onLoginFailure={(data: any) => console.log('login_error ---> ', data)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: wp(100),
    height: hp(60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    width: wp(100),
    height: hp(40),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginScreen;
