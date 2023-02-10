import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AccountDetailScreen from '../screens/AccountDetailScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import PlaceListScreen from '../screens/PlaceListScreen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export type RootTabParams = {
  PlaceListScreen: any;
  FavoriteScreen: any;
  AccountDetailScreen: any;
};

const Tab = createBottomTabNavigator<RootTabParams>();

const PlaceScreen = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="PlaceListScreen"
        component={PlaceListScreen}
        options={{
          title: 'Home',

          tabBarIcon: () => <AntDesign name="home" size={hp(3)} />,
        }}
      />
      <Tab.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          title: 'Favorites',
          tabBarIcon: () => (
            <MaterialIcons name="favorite-outline" size={hp(3)} />
          ),
        }}
      />
      <Tab.Screen
        name="AccountDetailScreen"
        component={AccountDetailScreen}
        options={{
          title: 'Account',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="account-outline" size={hp(3.4)} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default PlaceScreen;
