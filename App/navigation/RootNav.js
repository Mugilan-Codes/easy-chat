import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChatScreen from '../screens/chat';
import {useTheme, useFirebase} from '../contexts';
import Loading from '../components/loading';
import AuthNav from './AuthNav';

const Stack = createNativeStackNavigator();

const RootNav = () => {
  const {user, isLoading} = useFirebase();
  const {theme} = useTheme();

  if (isLoading) {
    console.log('Loading...');
    // TODO: add a splash screen
    return <Loading />;
  }

  return (
    <NavigationContainer theme={theme}>
      {user ? (
        <Stack.Navigator>
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      ) : (
        <AuthNav />
      )}
    </NavigationContainer>
  );
};

export default RootNav;
