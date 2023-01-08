import React, { useContext } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import PostCard from '../components/PostCard';
import Button from '../components/Button';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ScreenHeader from '../components/ScreenHeader';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { AuthContext } from '../context/AuthContextProvider';
import Clipboard from '@react-native-clipboard/clipboard';
import { displayMessage } from '../helpers';
import i18next from 'i18next';

var RNFS = require('react-native-fs');

const PostScreen = () => {
  const { authState, authContext } = useContext(AuthContext);

  const contentImages = () => {
    let content = [];
    let postObject = authState.post;
    if (postObject.__typename == 'GraphSidecar') {
      postObject.edge_sidecar_to_children.edges.map(item => {
        content.push({
          isVideo: item.node.is_video,
          src: item.node.display_url,
        });
      });
    } else if (postObject.__typename == 'GraphImage') {
      content.push({
        isVideo: postObject.is_video,
        src: postObject.display_url,
      });
    }
    return content;
  };

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

  const saveCaption = () => {
    Clipboard.setString(
      authState.post.edge_media_to_caption.edges[0].node.text,
    );
    displayMessage(
      'success',
      i18next.t('Success'),
      i18next.t('SuccessfulyCopiedTextToClipboard'),
    );
  };

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
      CameraRoll.save(path, 'video').then(result => {
        console.log(result);
        displayMessage(
          'success',
          i18next.t('Success'),
          i18next.t('TheMediaHasBeenSuccessfullySavedToTheGallery'),
        );
      });
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: wp(100), height: hp(8) }}>
        <ScreenHeader title={i18next.t('PostScreen')} isBackTrue />
      </View>
      <View style={styles.cardContainer}>
        <PostCard
          avatar={authState.post.owner.profile_pic_url}
          username={authState.post.owner.username}
          content={contentImages()}
          caption={authState.post.edge_media_to_caption.edges[0].node.text}
          captionOnPress={saveCaption}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          status="save"
          textColor="white"
          text={i18next.t('Save')}
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
