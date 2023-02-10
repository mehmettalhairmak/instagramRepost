import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/native';
import ScreenHeader from '../components/ScreenHeader';
import i18next from 'i18next';
import { useAppDispatch, useAppSelector } from '../hooks';
import {
  getPlaceAsync,
  selectPlace,
} from '../redux/slices/placeSlices/placeSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlaceListScreen = () => {
  let fetchCount: number = 0;
  const dispatch = useAppDispatch();
  const place = useAppSelector(selectPlace);
  const [location, setLocation] = useState<GeolocationResponse>();
  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (locationPermission === true) {
      getLocation();
    }
  }, [locationPermission]);

  useEffect(() => {
    (async () => {
      if (fetchCount < 1) {
        if (location?.coords !== undefined) {
          dispatch(getPlaceAsync(location.coords));
        }
      }
      fetchCount = fetchCount + 1;
      const favorites = await AsyncStorage.getItem("@favoritePlaces");
      console.log("Faav --> ",favorites);
      if(favorites === null){
        console.log("1qw")
        const favoriteArray:any[] = [];
        await AsyncStorage.setItem("@favoritePlaces", JSON.stringify(favoriteArray));
      }
    })();
  }, [location]);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const locationPermissions = [
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ];

      const granted = await PermissionsAndroid.requestMultiple(
        locationPermissions,
      );
      if (
        granted[locationPermissions[0]] &&
        granted[locationPermissions[1]] === 'granted'
      ) {
        setLocationPermission(true);
        console.log('granted');
      } else if (
        granted[locationPermissions[0]] &&
        granted[locationPermissions[1]] === 'never_ask_again'
      ) {
        ToastAndroid.show(
          'Please Go into Settings -> Applications -> APP_NAME -> Permissions and Allow permissions to continue',
          ToastAndroid.SHORT,
        );
      }
    }
  };

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      result => {
        console.log('LATITUDE ---> ', result.coords.latitude);
        console.log('LONGITUDE ---> ', result.coords.longitude);
        setLocation(result);
      },
      error => {
        console.log(
          '🚀 ~ file: ReviewScreen.tsx:24 ~ useEffect ~ error',
          error,
        );
        Alert.alert('Error', 'Please open the location and press OK Button.', [
          {
            text: 'OK',
            onPress: () => {
              getLocation();
            },
          },
        ]);
      },
    );
  };

  const goToPlaceDetails = (xid: string) => {
    navigation.navigate('PlaceDetailScreen', { xid });
  };

  if (place.status === 'loading') {
    console.log('1');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  } else if (place.status === 'failed') {
    console.log('2');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>NO DATA</Text>
      </View>
    );
  } else {
    console.log('3');
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: wp(100), height: hp(8) }}>
          <ScreenHeader title={i18next.t('PlaceListScreen')} />
        </View>
        <FlatList
          style={{ width: '100%', height: '100%' }}
          data={place.filteredPlaces}
          renderItem={({ item }) => (
            <View
              style={{
                height: hp(10),
                borderBottomWidth: 0.5,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: wp(2),
                flexDirection: 'row',
              }}>
              <Text allowFontScaling={false} style={{ fontSize: hp(2.4) }}>
                {item.properties.name}
              </Text>
              <TouchableOpacity
                onPress={() => goToPlaceDetails(item.properties.xid)}>
                <Ionicons name="information-circle-outline" size={hp(5)} />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({});

export default PlaceListScreen;
