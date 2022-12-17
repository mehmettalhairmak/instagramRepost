import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import InstagramLogin from 'react-native-instagram-login';
import CookieManager from '@react-native-cookies/cookies';
import {
  INSTAGRAM_APP_ID,
  INSTAGRAM_APP_SECRET,
  REDIRECT_URL,
} from '../constants/instagram';

const HomePage = () => {
  const insRef = useRef();
  const [currentUser, setCurrentUser] = useState(null);

  const onClear = () => {
    CookieManager.clearAll(true).then(res => {
      setCurrentUser(null);
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => insRef.current.show()}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Login now</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { marginTop: 10, backgroundColor: 'green' }]}
        onPress={onClear}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Logout</Text>
      </TouchableOpacity>
      <Text style={{ margin: 10 }}>
        User Token: {currentUser != null ? currentUser.access_token : ''}
      </Text>
      <Text style={{ margin: 10 }}>
        User ID: {currentUser != null ? currentUser.user_id : ''}
      </Text>
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
  button: {
    borderRadius: 5,
    backgroundColor: 'orange',
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomePage;
