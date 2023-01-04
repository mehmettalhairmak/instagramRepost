import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import PostCard from '../components/PostCard';
import Button from '../components/Button';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ScreenHeader from '../components/ScreenHeader';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';

var RNFS = require('react-native-fs');

const PostScreen = () => {
  const navigationRoute = useRoute();

  const hasAndroidPermission = async () => {
    const permission =
      Platform.Version >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  };

  useEffect(() => {
    //console.log(navigationRoute?.params?.item);
  }, [navigationRoute]);

  const saveImages = async () => {
    if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
      return;
    }

    const date = new Date();
    const time = date.getTime();

    const path = RNFS.DocumentDirectoryPath + '/' + time + '.mp4';

    RNFS.downloadFile({
      fromUrl: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      toFile: path,
      cacheable: true,
      progressInterval: 100,
      begin: () => {
        console.log('download start');
      },
    }).promise.then(result => {
      console.log('download finished --> ', path);
      CameraRoll.save(path, 'video').then(result => console.log(result));
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: wp(100), height: hp(8) }}>
        <ScreenHeader title="Post Screen" isBackTrue />
      </View>
      <View style={styles.cardContainer}>
        <PostCard />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          status="save"
          textColor="white"
          text="Save"
          onPress={saveImages}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  cardContainer: {
    height: hp(75),
    justifyContent: 'center',
    marginHorizontal: wp(2),
  },
  buttonContainer: {
    width: wp(90),
    height: hp(8),
    alignItems: 'center',
  },
});

export default PostScreen;
