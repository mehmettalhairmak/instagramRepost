import { Image, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ParamListBase, RouteProp, useRoute } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import WebView from 'react-native-webview';
import ScreenHeader from '../components/ScreenHeader';
import i18next from 'i18next';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

interface ParamList extends ParamListBase {
  PlaceDetailScreen: { xid: string };
}

interface PlaceDetails {
  xid: string;
  image?: string;
  name: string;
  address: Address;
  rate: string;
  osm: string;
  kinds: string;
  sources: Sources;
  otm: string;
  point: Point;
}

interface Address {
  city: string;
  road: string;
  state: string;
  county: string;
  country: string;
  postcode: string;
  country_code: string;
}

interface Sources {
  geometry: string;
  attributes: Array<string>;
}

interface Point {
  lon: number;
  lat: number;
}

const PlaceDetailScreen = () => {
  const route = useRoute<RouteProp<ParamList, 'PlaceDetailScreen'>>();
  const [placeDetails, setPlaceDetails] = useState<PlaceDetails>();

  useEffect(() => {
    (async () => {
      const result = await getPlaceDetails(route.params.xid);
      setPlaceDetails(result);
    })();
  }, []);

  const getPlaceDetails = async (xid: string) => {
    const link =
      'https://opentripmap-places-v1.p.rapidapi.com/en/places/xid/' + xid;
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

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={{ width: wp(100), height: hp(8) }}>
        <ScreenHeader title={i18next.t('PlaceDetailScreen')} isBackTrue />
      </View>
      {placeDetails?.image !== undefined ? (
        <Image
          source={{ uri: placeDetails?.image }}
          style={{
            width: '80%',
            height: '30%',
            backgroundColor: 'blue',
            marginTop: 20,
          }}
        />
      ) : (
        <View style={{}} />
      )}
      <Text style={{ fontSize: 24, fontWeight: '600', marginTop: 20 }}>
        {placeDetails?.name}
      </Text>
      {Number(placeDetails?.rate) === 1 ? (
        <MaterialCommunityIcons name="star" size={30} color="orange" />
      ) : Number(placeDetails?.rate) === 2 ? (
        <View style={{ flexDirection: 'row' }}>
          <MaterialCommunityIcons name="star" size={30} color="orange" />
          <MaterialCommunityIcons name="star" size={30} color="orange" />
        </View>
      ) : Number(placeDetails?.rate) > 2 ? (
        <View style={{ flexDirection: 'row' }}>
          <MaterialCommunityIcons name="star" size={30} color="orange" />
          <MaterialCommunityIcons name="star" size={30} color="orange" />
          <MaterialCommunityIcons name="star" size={30} color="orange" />
        </View>
      ) : (
        <View></View>
      )}
      <Text style={{ marginTop: 20, fontSize: 16 }}>
        {placeDetails?.address?.city +
          ' /.../ ' +
          (placeDetails?.address?.road !== undefined
            ? placeDetails?.address?.road
            : '') +
          ' /.../ ' +
          placeDetails?.address?.county +
          ' /.../ ' +
          placeDetails?.address?.country}
      </Text>
      <View style={{ width: '80%', height: '35%', marginTop: 30 }}>
        <WebView
          source={{ uri: placeDetails?.otm! }}
          style={{ flex: 1 }}></WebView>
      </View>
    </View>
  );
};

export default PlaceDetailScreen;
