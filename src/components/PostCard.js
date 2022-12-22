import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const PostCard = () => {
  const [contentImageWidth, setContentImageWidth] = useState(0);

  const contentImages = [
    {
      source:
        'https://fotolifeakademi.com/uploads/2020/04/manzara-fotografi-cekmek-724x394.webp',
      key: 1,
    },
    {
      source:
        'https://www.arthenos.com/wp-content/uploads/2017/08/Manzara_fotografciligi_2.jpg',
      key: 2,
    },
    {
      source:
        'https://mediatrend.mediamarkt.com.tr/wp-content/uploads/2017/02/2017_subat_03.jpg',
      key: 3,
    },
  ];

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
        <FlatList
          data={contentImages}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onLayout={e => setContentImageWidth(e.nativeEvent.layout.width)}
          renderItem={({ item }) => (
            <View style={{ width: contentImageWidth }}>
              <Image
                source={{ uri: item.source }}
                style={{ flex: 1 }}
                resizeMode="contain"
              />
            </View>
          )}
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
    //flex: 1,
    //width: '95%',
    //borderWidth: 1,
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
