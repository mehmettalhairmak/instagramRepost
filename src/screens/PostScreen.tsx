import React, { useContext, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
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
import InstagramModal from '../components/InstagramModal';
//import { PostAPI } from '../models/PostModelAPI';
import { InstagramPostModelCache } from '../models/PostModelCache';
import { CarouselMedia, InstagramPostModelAPI } from '../models/PostModelAPI';

var RNFS = require('react-native-fs');

const PostScreen = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { authState, authContext } = useContext(AuthContext);
  const post: InstagramPostModelAPI = authState.post!;

  useEffect(() => {
    console.log('postScreen');
    console.log(JSON.stringify(post));
  }, []);

  const contentImages = () => {
    let content: InstagramPostModelCache[] = [];
    const postObject = post;
    if (postObject?.product_type === 'feed') {
      content.push({
        isVideo: false,
        src: postObject.image_versions2.candidates[0].url,
      });
    } else if (postObject?.product_type === 'clips') {
      content.push({
        isVideo: true,
        src: postObject!.video_versions![0].url,
      });
    } else if (postObject?.product_type === 'carousel_container') {
      postObject.carousel_media!.map((item: CarouselMedia, index: number) => {
        if (item.media_type === 1) {
          content.push({
            isVideo: false,
            src: item.image_versions2.candidates[0].url,
          });
        } else if (item.media_type === 2) {
          content.push({
            isVideo: true,
            src: item.video_versions![0].url,
          });
        }
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
    let caption = post.caption != null ? post.caption.text : '';
    Clipboard.setString(caption);
    displayMessage(
      'success',
      i18next.t('Success'),
      i18next.t('SuccessfulyCopiedTextToClipboard'),
    );
  };

  const saveImages = async () => {
    console.log('multiple');
    setModalVisible(false);

    // if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    //   return;
    // }

    // const date = new Date();
    // const time = date.getTime();

    // const path = RNFS.DocumentDirectoryPath + '/' + time + '.mp4';

    // RNFS.downloadFile({
    //   fromUrl: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    //   toFile: path,
    //   cacheable: true,
    //   progressInterval: 100,
    //   begin: () => {
    //     console.log('download start');
    //   },
    // }).promise.then(result => {
    //   console.log('download finished --> ', path);
    //   CameraRoll.save(path, 'video').then(result => {
    //     console.log(result);
    //     displayMessage(
    //       'success',
    //       i18next.t('Success'),
    //       i18next.t('TheMediaHasBeenSuccessfullySavedToTheGallery'),
    //     );
    //   });
    // });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: wp(100), height: hp(8) }}>
        <ScreenHeader title={i18next.t('PostScreen')} isBackTrue />
      </View>
      <View style={styles.cardContainer}>
        <PostCard
          avatar={post?.user.profile_pic_url}
          username={post?.user.username}
          location={post?.location != undefined ? post.location.name : ''}
          content={contentImages()}
          caption={post?.caption != null ? post?.caption.text : ''}
          captionOnPress={saveCaption}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          status="save"
          textColor="white"
          text={i18next.t('Save')}
          onPress={() => setModalVisible(true)}
        />
      </View>
      <InstagramModal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={[styles.modalContainer, styles.shadow]}>
          <View
            style={{
              height: '20%',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}>
            <TouchableOpacity
              style={{ marginRight: wp(4) }}
              onPress={() => setModalVisible(false)}>
              <Text
                allowFontScaling={false}
                style={{ fontSize: hp(4), color: 'black' }}>
                X
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: '40%',
              alignItems: 'center',
              paddingHorizontal: wp(1),
            }}>
            <Text
              allowFontScaling={false}
              style={{ fontSize: hp(3), color: 'black', textAlign: 'center' }}>
              {contentImages().length > 1
                ? i18next.t('SaveCurrentMediaOrAllMedia')
                : i18next.t('AreYouSureForWantToSaveMedia')}
            </Text>
          </View>
          <View
            style={{
              height: '30%',
              justifyContent: 'space-evenly',
              paddingVertical: hp(2),
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={[
                styles.modalButtonLayout,
                {
                  backgroundColor: contentImages().length > 1 ? 'blue' : 'red',
                },
              ]}
              onPress={() =>
                contentImages().length > 1
                  ? saveImages()
                  : setModalVisible(false)
              }>
              <Text allowFontScaling={false} style={styles.modalButtonText}>
                {contentImages().length > 1
                  ? i18next.t('CurrentMedia')
                  : i18next.t('No')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButtonLayout, { backgroundColor: 'green' }]}
              onPress={saveImages}>
              <Text style={styles.modalButtonText}>
                {contentImages().length > 1
                  ? i18next.t('AllMedia')
                  : i18next.t('Yes')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </InstagramModal>
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
    width: wp(94),
    height: hp(75),
    justifyContent: 'center',
    marginHorizontal: wp(2),
  },
  buttonContainer: {
    width: wp(90),
    height: hp(8),
    alignItems: 'center',
  },
  modalContainer: {
    width: wp(90),
    height: hp(40),
    marginBottom: hp(2.2),
    backgroundColor: 'white',
    borderRadius: hp(4),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  modalButtonLayout: {
    width: wp(35),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp(2.4),
    borderRadius: wp(2.2),
  },
  modalButtonText: {
    color: 'white',
    fontSize: hp(2.4),
    fontWeight: '500',
  },
});

export default PostScreen;
