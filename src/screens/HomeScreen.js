import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import PostCard from '../components/PostCard';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: hp(2),
    paddingVertical: hp(12),
    borderWidth: 1,
    borderColor: 'red',
  },
});

export default HomeScreen;
