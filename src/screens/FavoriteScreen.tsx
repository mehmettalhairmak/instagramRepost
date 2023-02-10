import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { RootStackParams } from '../navigation/StackNavigation';

const FavoriteScreen = () => {
  const [favoriteList, setFavoriteList] = useState<any>([]);
  const isFocused = useIsFocused();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  useEffect(() => {
    (async () => {
      const favoriteString: any = await AsyncStorage.getItem('@favoritePlaces');
      const favoriteArray = JSON.parse(favoriteString);
      setFavoriteList(favoriteArray);
    })();
  }, [isFocused]);

  const goToPlaceDetails = (xid: string) => {
    navigation.navigate('PlaceDetailScreen', { xid });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={favoriteList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              height: hp(10),
              borderBottomWidth: 0.5,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: wp(2),
              flexDirection: 'row',
            }}
            onPress={() => goToPlaceDetails(item.xid)}>
            <Text allowFontScaling={false} style={{ fontSize: hp(2.4) }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({});
