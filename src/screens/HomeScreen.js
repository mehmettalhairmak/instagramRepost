import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../components/Button';
import Clipboard from '@react-native-clipboard/clipboard';
import { displayMessage } from '../helpers';
import InfoPostCard from '../components/InfoPostCard';

const HomeScreen = () => {
  const navigationRoute = useRoute();
  const navigation = useNavigation();

  useEffect(() => {
    console.log(navigationRoute?.params?.item);
  }, [navigationRoute]);

  const postRules = [
    { title: 'Open Instagram.' },
    { title: 'Find the post you want to save.' },
    { title: 'Tap ••• in the upper right corner and select <<Link>>' },
    { title: 'Return app and click Go To Post button.' },
  ];

  const goToPost = async () => {
    const postLink = await Clipboard.getString();
    console.log(postLink);
    if (
      postLink.includes('https://www.instagram.com/p/') ||
      postLink.includes('https://www.instagram.com/reel/')
    ) {
      navigation.navigate('PostScreen', { item: postLink });
    } else {
      displayMessage(
        'error',
        'Error',
        'This is not instagram post or reel link',
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
              How To Get Post?
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
          height: hp(25),
          alignItems: 'center',
          justifyContent: 'center',
          borderColor: 'red',
        }}>
        <Button textColor="black" text="Go To Post" onPress={goToPost} />
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
});

export default HomeScreen;
