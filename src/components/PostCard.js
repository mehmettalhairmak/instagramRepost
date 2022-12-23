import React, { useState, useRef } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PostCard = () => {
  const [contentImageWidth, setContentImageWidth] = useState(0);
  const [contentVideoPause, setContentVideoPause] = useState(false);
  const [contentVideoMuted, setContentVideoMuted] = useState(false);

  const onViewableItemsChanged = ({ viewableItems }) => {
    // Do stuff
    console.log(viewableItems[0].item.uri);
    contentImages.map((item, index) => {
      console.log(item);
      viewableItems[0].item.uri == item.uri
        ? setContentVideoPause(false)
        : setContentVideoPause(true);
    });
  };
  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

  const contentImages = [
    {
      type: 'photo',
      uri: 'https://fotolifeakademi.com/uploads/2020/04/manzara-fotografi-cekmek-724x394.webp',
      key: 1,
    },
    {
      type: 'photo',
      uri: 'https://www.arthenos.com/wp-content/uploads/2017/08/Manzara_fotografciligi_2.jpg',
      key: 2,
    },
    {
      type: 'photo',
      uri: 'https://mediatrend.mediamarkt.com.tr/wp-content/uploads/2017/02/2017_subat_03.jpg',
      key: 3,
    },
    {
      type: 'video',
      uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
      key: 4,
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
          <MaterialCommunityIcons
            name="dots-vertical"
            size={hp(3.5)}
            allowFontScaling={false}
          />
        </View>
      </View>
      {/* Content */}
      <View style={styles.content}>
        <FlatList
          data={contentImages}
          horizontal
          pagingEnabled
          initialNumToRender={1}
          removeClippedSubviews={false}
          showsHorizontalScrollIndicator={false}
          onLayout={e => setContentImageWidth(e.nativeEvent.layout.width)}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          renderItem={({ item }) => (
            <View style={{ width: contentImageWidth }}>
              {item.type == 'photo' ? (
                <Image
                  source={{ uri: item.uri }}
                  style={{ flex: 1 }}
                  resizeMode="contain"
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Video
                    paused={contentVideoPause}
                    repeat
                    muted={contentVideoMuted}
                    source={{ uri: item.uri }}
                    resizeMode="contain"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    onTouchStart={() =>
                      setContentVideoMuted(!contentVideoMuted)
                    }
                  />
                  <Ionicons
                    name="volume-mute"
                    size={hp(5)}
                    style={{
                      position: 'absolute',
                      backgroundColor: 'rgba(52,52,52,0.9)',
                      borderRadius: 100,
                      opacity: contentVideoMuted ? 1 : 0,
                    }}
                  />
                </View>
              )}
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
