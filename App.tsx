import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from './src/navigation/StackNavigation';
import Toast from 'react-native-toast-message';

export type RootStackParams = {
  LoginScreen: any;
  HomeScreen: any;
  PostScreen: any;
  PlaceScreen: any;
  PlaceDetailScreen: any;
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
