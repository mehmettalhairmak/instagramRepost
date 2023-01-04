import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from '@react-native-cookies/cookies';
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
import { AuthContext } from '../context/AuthContextProvider';

const LoginScreen = () => {
  const insRef = useRef();
  const [currentUser, setCurrentUser] = useState(null);
  const navigation = useNavigation();
  const { authState, authContext } = useContext(AuthContext);

  useEffect(() => {
    authContext.creditUpdate({ payload: 'mehmettalhairmak' });
  }, []);

  useEffect(() => {
    console.log(authState);
  }, [authState]);

  useEffect(() => {
    if (currentUser != null) {
      navigation.navigate('HomeScreen', { item: currentUser });
    }
  }, [currentUser]);

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={styles.content}>
        <Text
          allowFontScaling={false}
          style={{ fontFamily: 'Roboto-Bold', fontSize: hp(3.4) }}>
          Instagram Repost
        </Text>
      </View>
      <View style={styles.login}>
        <Button
          text="Login With Instagram"
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
        onLoginSuccess={token => setCurrentUser(token)}
        onLoginFailure={data => console.log('login_error ---> ', data)}
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
