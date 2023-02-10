import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import PlaceDetailScreen from '../screens/PlaceDetailScreen';
import PlaceScreen from './TabNavigation';

export type RootStackParams = {
  LoginScreen: any;
  HomeScreen: any;
  PostScreen: any;
  PlaceScreen: any;
  PlaceDetailScreen: any;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{ headerShown: false }}>
      {/* !isDebug */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="PostScreen" component={PostScreen} />
      {/* isDebug */}
      <Stack.Screen name="PlaceScreen" component={PlaceScreen} />
      <Stack.Screen name="PlaceDetailScreen" component={PlaceDetailScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
