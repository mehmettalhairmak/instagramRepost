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

interface Places {
  type: string;
  features: Place[];
}

interface Place {
  type: string;
  id: string;
  geometry: {
    type: string;
    coordinates: Array<number>;
  };
  properties: PlaceProperty;
}

interface PlaceProperty {
  xid: string;
  name: string;
  dist: number;
  rate: number;
  osm: string;
  wikidata: string;
  kinds: number;
}

const PlaceListScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [locationPermission, setLocationPermission] = useState<boolean>(false);
  const [location, setLocation] = useState<GeolocationResponse>();
  const [places, setPlaces] = useState<Place[] | undefined>(undefined);
  let fetchCount: number = 0;

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
          let placesArray: Place[] = [];
          const data: Places = await getPlaces(
            location.coords.longitude.toString(),
            location.coords.latitude.toString(),
          );

          data.features.map((data, index) => {
            if (data.properties.name !== '') {
              placesArray.push(data);
            }
          });
          //console.log(JSON.stringify(placesArray));
          setPlaces(placesArray);
        }
      }
      fetchCount = fetchCount + 1;
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

  const getPlaces = async (longitude: string, latitude: string) => {
    const link =
      'https://opentripmap-places-v1.p.rapidapi.com/en/places/radius?radius=10000&lon=' +
      longitude +
      '&lat=' +
      latitude +
      '&limit=30';

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '1435b300d1msh32b5f891e102482p12f1f1jsn58c2fb6da7e2',
        'X-RapidAPI-Host': 'opentripmap-places-v1.p.rapidapi.com',
      },
    };

    const result = await fetch(link, options);
    return await result.json();
  };

  const goToPlaceDetails = (xid: string) => {
    navigation.navigate('PlaceDetailScreen', { xid });
  };

  if (places === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ width: wp(100), height: hp(8) }}>
          <ScreenHeader title={i18next.t('PlaceListScreen')} deleteUser />
        </View>
        <FlatList
          style={{ borderWidth: 1, width: '100%', height: '100%' }}
          data={places}
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
