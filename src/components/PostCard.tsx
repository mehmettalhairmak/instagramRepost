import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import i18next from 'i18next';
import { InstagramPostModelCache } from '../models/PostModelCache';

interface PostCardProps {
  avatar: string;
  username: string;
  location: string;
  content: InstagramPostModelCache[];
  caption: string;
  captionOnPress: any;
}

const PostCard: React.FC<PostCardProps> = ({
  avatar,
  username,
  location,
  content,
  caption,
  captionOnPress,
}) => {
  const [contentImageWidth, setContentImageWidth] = useState(0);
  const [contentVideoPause, setContentVideoPause] = useState(false);
  const [contentVideoMuted, setContentVideoMuted] = useState(false);
  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

  useEffect(() => {
    return () => {
      setContentVideoPause(false);
    };
  }, []);

  function onViewableItemsChanged({ viewableItems }: { viewableItems: any }) {
    content.map((item: any) => {
      viewableItems[0].item.src == item.src
        ? setContentVideoPause(false)
        : setContentVideoPause(true);
    });
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Avatar */}
        <Image source={{ uri: avatar }} style={styles.avatar} />
        {/* Title */}
        <View style={styles.headerTitle}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: hp(2.1),
              fontFamily: 'Roboto-Bold',
            }}>
            {username}
          </Text>
          <Text
            allowFontScaling={false}
            style={{ fontSize: hp(1.8), fontFamily: 'Roboto-Regular' }}>
            {location}
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
          data={content}
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
            <View
              style={{ width: contentImageWidth, backgroundColor: '#000000' }}>
              {!item.isVideo ? (
                <Image
                  source={{ uri: item.src }}
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
                    playInBackground={true}
                    muted={contentVideoMuted}
                    source={{ uri: item.src }}
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
        <Text
          allowFontScaling={false}
          style={{ fontSize: hp(2.1), fontFamily: 'Roboto-Bold' }}>
          10.328 {i18next.t('Likes')}
        </Text>
        <TouchableOpacity
          style={{ flexDirection: 'row', height: hp(7.8) }}
          onPress={captionOnPress}>
          <Text
            numberOfLines={3}
            allowFontScaling={false}
            style={{
              fontSize: hp(1.8),
              marginLeft: hp(1),
              flexWrap: 'wrap',
              fontFamily: 'Roboto-Regular',
            }}>
            {caption}
          </Text>
        </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
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
