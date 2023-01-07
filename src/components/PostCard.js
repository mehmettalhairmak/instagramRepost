import React, { useState, useEffect, useRef, useContext } from 'react';
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
import { AuthContext } from '../context/AuthContextProvider';

const PostCard = ({ textOnPress }) => {
  const [contentImageWidth, setContentImageWidth] = useState(0);
  const [contentVideoPause, setContentVideoPause] = useState(false);
  const [contentVideoMuted, setContentVideoMuted] = useState(false);
  const { authState, authContext } = useContext(AuthContext);
  const viewabilityConfigCallbackPairs = useRef([{ onViewableItemsChanged }]);

  useEffect(() => {
    return () => {
      setContentVideoPause(false);
    };
  }, []);

  const onViewableItemsChanged = ({ viewableItems }) => {
    contentImages.map((item, index) => {
      viewableItems[0].item.uri == item.uri
        ? setContentVideoPause(false)
        : setContentVideoPause(true);
    });
  };

  const getImages = () => {
    let content = [];
    let postObject = authState.post;
    if (postObject.__typename == 'GraphSidecar') {
      postObject.edge_sidecar_to_children.edges.map(item => {
        content.push({
          src: item.node.display_url,
          isVideo: item.node.is_video,
        });
      });
    }
    return content;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Avatar */}
        <Image
          source={authState.post.owner.profile_pic_url}
          style={styles.avatar}
        />
        {/* Title */}
        <View style={styles.headerTitle}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: hp(2.1),
              fontFamily: 'Roboto-Bold',
            }}>
            {authState.post.owner.username}
          </Text>
          <Text
            allowFontScaling={false}
            style={{ fontSize: hp(1.8), fontFamily: 'Roboto-Regular' }}>
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
          data={getImages()}
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
          10.328 views
        </Text>
        <TouchableOpacity
          style={{ flexDirection: 'row', height: hp(7.8) }}
          onPress={textOnPress}>
          <Text
            numberOfLines={3}
            allowFontScaling={false}
            style={{
              fontSize: hp(1.8),
              marginLeft: hp(1),
              flexWrap: 'wrap',
              fontFamily: 'Roboto-Regular',
            }}>
            {authState.post.edge_media_to_caption.edges[0].node.text}
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
