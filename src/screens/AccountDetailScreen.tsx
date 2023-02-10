import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAppDispatch } from '../hooks';
import { setAuthUser } from '../redux/slices/authUser/authUserSlice';
import Button from '../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CookieManager from '@react-native-cookies/cookies';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootTabParams } from '../navigation/TabNavigation';

const AccountDetailScreen = () => {
  const dispatch = useAppDispatch();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabParams>>();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={{
          uri: 'https://scontent-ham3-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-ham3-1.cdninstagram.com&_nc_cat=1&_nc_ohc=0hL_4l7D_p0AX95C1pc&edm=AL4D0a4BAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AfClqqKgNZtzjV5PN-hN_7Jhsrzlgm1fhsmp4j_T6KEmZA&oe=63EB974F&_nc_sid=712cc3',
        }}
        style={{ width: 120, height: 120, borderRadius: 60 }}
      />

      <Text style={{ marginTop: 20, fontSize: 24, color: 'black' }}>
        mehmettirmaakk
      </Text>
      <Text style={{ marginTop: 20, fontSize: 16, color: 'black' }}>
        0 Followers     0 Following
      </Text>
      <View style={{ marginTop: 50 }}>
        <Button
          status="save"
          text="My Favorite Places"
          onPress={() => {navigation.navigate("FavoriteScreen")}}
          textColor="black"
        />
      </View>
      <View style={{ marginTop: 100 }}>
        <Button
          text="Delete Account From App"
          onPress={() => {
            Alert.alert(
              'Delete Account',
              'Are you sure want to delete account?',
              [
                { text: 'NO' },
                {
                  text: 'YES',
                  onPress: async () => {
                    await AsyncStorage.removeItem('@currentUser');
                    CookieManager.clearAll(true).then(res => {
                      dispatch(setAuthUser({ access_token: '', user_id: '' }));
                      navigation.navigate('LoginScreen');
                    });
                  },
                },
              ],
            );
          }}
          textColor="black"
        />
      </View>
    </View>
  );
};

export default AccountDetailScreen;

const styles = StyleSheet.create({});
