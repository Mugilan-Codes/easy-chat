import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChatScreen from '../screens/chat';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import {useTheme, useFirebase} from '../contexts';

const Stack = createNativeStackNavigator();

const RootNav = () => {
  const {user} = useFirebase();
  const {theme} = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Chat" component={ChatScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNav;
