import React, {useLayoutEffect, useEffect, useState} from 'react';
import {View, FlatList, TouchableOpacity} from 'react-native';
import {IconButton, Avatar, Card} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import {useFirebase} from '../contexts';

// TODO: display the image of the other user
// TODO: display bit of latest message
// TODO: Show lates messages on top
// FIXME: handle empty chat array for new users
const HomeScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const {logout, user} = useFirebase();

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .doc(user.email)
      .onSnapshot(docSnap => {
        console.log('User Data: ', docSnap.data());
        if (docSnap.data().chats) {
          setData(docSnap.data().chats);
        }
      });

    return () => subscriber();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconButton icon="logout" onPress={logout} />,
    });
  }, [navigation]);

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Chat', {
                chatId: item.chatId,
                email: item.email,
                name: item.name,
              })
            }>
            <Card.Title
              title={item.name}
              subtitle={item.email}
              left={props => <Avatar.Icon {...props} icon="account" />}
            />
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 70,
          backgroundColor: '#fff',
          borderRadius: 100,
        }}>
        <IconButton
          icon="plus-thick"
          size={25}
          onPress={() => navigation.navigate('AddChat')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
