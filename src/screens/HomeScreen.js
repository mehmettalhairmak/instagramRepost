import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import PostCard from '../components/PostCard';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import PasteFromClipboardButton from '../components/PasteFromClipboardButton';

const HomeScreen = props => {
  const navigationRoute = useRoute();

  useEffect(() => {
    console.log(navigationRoute?.params?.item);
  }, [navigationRoute]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <PostCard />
      </View>
      <View style={styles.buttonContainer}>
        <PasteFromClipboardButton />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#FAFAFA',
  },
  cardContainer: {
    //marginTop: hp(12),
    marginHorizontal: wp(2),
  },
  buttonContainer: {
    width: wp(90),
    height: hp(8),
    //marginTop: hp(6),
  },
});

export default HomeScreen;
