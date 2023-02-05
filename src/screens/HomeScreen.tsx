import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../components/Button';
import Clipboard from '@react-native-clipboard/clipboard';
import { displayMessage } from '../helpers';
import InfoPostCard from '../components/InfoPostCard';
import ScreenHeader from '../components/ScreenHeader';
import i18next from 'i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import Loading from '../components/Loading';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  getMediaAsync,
  selectMedia,
} from '../redux/slices/instagramMedia/instagramMediaSlice';

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const dispatch = useAppDispatch();
  const media = useAppSelector(selectMedia);

  useEffect(() => {
    (async () => {
      if (media.media !== null) {
        if (media.media.status === 'error') {
          if (media.media.error === 'Media not found or unavailable') {
            displayMessage(
              'error',
              i18next.t('ThisAccountIsPrivate'),
              i18next.t('PleaseSelectPublicAccountPosts'),
            );
          } else {
            setLoading(false);
            displayMessage(
              'error',
              i18next.t('SystemError'),
              i18next.t('PleaseTryAgainLater'),
            );
            const time = moment().add(10, 'minute');
            await AsyncStorage.setItem('@postTimeout', JSON.stringify(time));
          }
        } else {
          await AsyncStorage.removeItem('@postTimeout');
          setLoading(false);
          navigation.navigate('PostScreen');
        }
      }
    })();
  }, [media]);

  const postRules = [
    { title: i18next.t('OpenInstagram') },
    { title: i18next.t('FindThePostYouWantToSave') },
    { title: i18next.t('TapDotsInTheUpperRightCornerAndSelectLink') },
    { title: i18next.t('ReturnAppAndClickGoToPostButton') },
  ];

  const post = async () => {
    setLoading(true);
    const postLink = await Clipboard.getString();

    if (
      postLink.includes('https://www.instagram.com/p/') ||
      postLink.includes('https://www.instagram.com/reel/')
    ) {
      let array = postLink.includes('/p')
        ? postLink.split('/p/')
        : postLink.split('/reel/');
      const shortCode = array[1].split('/')[0];
      dispatch(getMediaAsync(shortCode));
    } else {
      setLoading(false);
      displayMessage(
        'error',
        i18next.t('Error'),
        i18next.t('ThisIsNotInstagramPostOrReelLink'),
      );
    }
  };

  const goToPost = async () => {
    const timeOutString = await AsyncStorage.getItem('@postTimeout');
    if (timeOutString !== null) {
      if (moment().isAfter(timeOutString)) {
        post();
      } else {
        displayMessage(
          'error',
          i18next.t('SystemError'),
          i18next.t('PleaseTryAgainLater'),
        );
      }
    } else {
      post();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Screen Header */}
      <View style={{ width: wp(100), height: hp(8) }}>
        <ScreenHeader title={i18next.t('HomeScreen')} />
      </View>
      {/* User Guide */}
      <View
        style={{
          width: wp(100),
          height: hp(25),
          alignItems: 'center',
        }}>
        <FlatList
          data={postRules}
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
          }}
          contentContainerStyle={{
            flex: 1,
            paddingVertical: hp(2),
            paddingHorizontal: wp(5),
          }}
          keyExtractor={(item, index) => 'rules_' + index.toString()}
          ListHeaderComponent={() => (
            <Text
              allowFontScaling={false}
              style={{ fontFamily: 'Roboto-Bold', fontSize: hp(3.4) }}>
              {i18next.t('HowToGetPost')}
            </Text>
          )}
          renderItem={({ item, index }) => (
            <Text
              allowFontScaling={false}
              style={{ fontFamily: 'Roboto-Regular', fontSize: hp(2.4) }}>
              {index + 1}. {item.title}
            </Text>
          )}
        />
      </View>
      {/* Info Post Card */}
      <View
        style={{
          width: wp(100),
          height: hp(40),
          paddingHorizontal: wp(6),
        }}>
        <InfoPostCard />
      </View>
      {/* Go To Post Button */}
      <View
        style={{
          width: wp(100),
          height: hp(20),
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'red',
        }}>
        <Button
          textColor="black"
          text={i18next.t('GoToPost')!}
          onPress={goToPost}
        />
      </View>
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
});

export default HomeScreen;
