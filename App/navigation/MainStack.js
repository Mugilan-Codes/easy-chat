import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChatScreen from '../screens/chat';
import HomeScreen from '../screens/home';
import AddChatScreen from '../screens/addChat';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Conversations'}}
      />
      <Stack.Screen name="AddChat" component={AddChatScreen} />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={({route}) => ({
          title: route.params.name || route.params.email,
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
