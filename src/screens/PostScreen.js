import React, { useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import PostCard from '../components/PostCard';
import Button from '../components/Button';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const PostScreen = () => {
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
        <Button
          status="save"
          textColor="white"
          text="Save"
          onPress={() => {}}
        />
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
    alignItems: 'center',
  },
});

export default PostScreen;
