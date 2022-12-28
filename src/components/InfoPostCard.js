import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const InfoPostCard = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Avatar */}
        <View style={styles.avatar} />
        {/* Title */}
        <View style={styles.headerTitle}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: hp(2.1),
              fontFamily: 'Roboto-Bold',
            }}>
            username
          </Text>
        </View>
        {/* Icon */}
        <View style={styles.headerIcon}>
          <MaterialCommunityIcons
            name="dots-vertical"
            size={hp(3.5)}
            allowFontScaling={false}
          />
        </View>
      </View>
      {/* Content */}
      <View
        style={{
          flex: 1,
          borderBottomLeftRadius: hp(4),
          borderBottomRightRadius: hp(4),
          backgroundColor: '#EAEAEA',
        }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: hp(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: hp(4),
  },
  header: {
    height: hp(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  avatar: {
    backgroundColor: 'grey',
    marginLeft: hp(1.6),
    width: hp(5),
    height: hp(5),
    borderRadius: hp(50),
  },
  headerTitle: {
    paddingLeft: hp(2),
    flexDirection: 'column',
    flex: 5,
  },
  headerIcon: {
    marginRight: hp(1),
  },
});

export default InfoPostCard;
