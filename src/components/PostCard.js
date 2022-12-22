import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const PostCard = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Avatar */}
        <Image
          source={require('../../assets/images/avatar.png')}
          style={styles.avatar}
        />
        {/* Title */}
        <View style={styles.headerTitle}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Roboto-Bold',
            }}>
            username
          </Text>
          <Text style={{ fontSize: 12, fontFamily: 'Roboto-Medium' }}>
            London
          </Text>
        </View>
        {/* Icon */}
        <View style={styles.headerIcon}>
          <Icon name="dots-vertical" size={hp(3.5)} allowFontScaling={false} />
        </View>
      </View>
      {/* Content */}
      <View style={styles.content}>
        <Image
          style={{
            width: '100%',
            height: '100%',
            borderWidth: 1,
            borderColor: 'blue',
          }}
          resizeMode={'cover'}
          source={{
            uri: 'https://cdn.pixabay.com/photo/2014/09/17/20/03/profile-449912__340.jpg',
          }}
        />
      </View>
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={{ fontSize: 14, fontFamily: 'Roboto-Bold' }}>
          10.328 views
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <ScrollView style={{ height: hp(7.8) }}>
            <Text
              style={{
                fontSize: 12,
                marginLeft: hp(1),
                flexWrap: 'wrap',
                fontFamily: 'Roboto-Medium',
              }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              posuere non augue sed eleifend. Proin suscipit purus pretium,
              suscipit arcu id, sollicitudin lectus. Pellentesque malesuada
              nulla quis velit tincidunt, nec cursus metus auctor. Sed varius
              quis nunc sit amet ultrices. Pellentesque sagittis vel sem id
              mollis. Vivamus at viverra neque.
            </Text>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: hp(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: hp(4),
  },
  header: {
    height: hp(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  avatar: {
    marginLeft: hp(1.6),
    width: hp(6),
    height: hp(6),
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
  content: {
    height: hp(40),
    marginHorizontal: hp(1.4),
  },
  footer: {
    marginVertical: hp(1),
    marginHorizontal: hp(1.4),
    height: hp(11),
  },
});

export default PostCard;
