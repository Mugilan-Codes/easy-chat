import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChatScreen from '../screens/Chat';
import {useTheme} from '../contexts/StateProvider';

const Stack = createNativeStackNavigator();

const RootNav = () => {
  const {theme} = useTheme();

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator>
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNav;
