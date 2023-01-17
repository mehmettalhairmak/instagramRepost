import React from 'react';
import Toast from 'react-native-toast-message';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import PostScreen from './src/screens/PostScreen';
import AuthContextProvider from './src/context/AuthContextProvider';

export type RootStackParams = {
  LoginScreen: any;
  HomeScreen: any;
  PostScreen: any;
}

const Stack = createNativeStackNavigator<RootStackParams>();

const App = () => {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="PostScreen" component={PostScreen} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </AuthContextProvider>
  );
};

export default App;
