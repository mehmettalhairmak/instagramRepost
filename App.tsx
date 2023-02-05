import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Toast from 'react-native-toast-message';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import PostScreen from './src/screens/PostScreen';
import PlaceListScreen from './src/screens/PlaceListScreen';
import PlaceDetailScreen from './src/screens/PlaceDetailScreen';

import { checkIsDebug } from './src/constants/general';

export type RootStackParams = {
  LoginScreen: any;
  HomeScreen: any;
  PostScreen: any;
  PlaceListScreen: any;
  PlaceDetailScreen: any;
};

const Stack = createNativeStackNavigator<RootStackParams>();

const App = () => {
  let isDebug;
  useEffect(() => {
    (async () => {
      const result = await checkIsDebug();
      isDebug = result.isDebug;
    })();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />

          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="PostScreen" component={PostScreen} />

          <Stack.Screen name="PlaceListScreen" component={PlaceListScreen} />
          <Stack.Screen
            name="PlaceDetailScreen"
            component={PlaceDetailScreen}
          />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
