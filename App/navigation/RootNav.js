import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Appbar, Menu} from 'react-native-paper';

import ChatScreen from '../screens/chat';
import HomeScreen from '../screens/home';
import AddChatScreen from '../screens/addChat';
import {useTheme, useFirebase} from '../contexts';
import Loading from '../components/loading';
import AuthNav from './AuthNav';

const CustomNavigationBar = ({navigation, back}) => {
  const {logout} = useFirebase();
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Appbar.Header>
      <Appbar.Content title="Conversations" />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}>
        <Menu.Item
          onPress={() => {
            console.log('Option 1 was pressed');
          }}
          title="Option 1"
        />
        <Menu.Item
          onPress={() => {
            console.log('Option 2 was pressed');
          }}
          title="Option 2"
        />
        <Menu.Item
          onPress={() => {
            console.log('Option 3 was pressed');
          }}
          title="Option 3"
          disabled
        />
      </Menu>
    </Appbar.Header>
  );
};

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
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{title: 'Conversations'}}
          />
          <Stack.Screen name="AddChat" component={AddChatScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      ) : (
        <AuthNav />
      )}
    </NavigationContainer>
  );
};

export default RootNav;
