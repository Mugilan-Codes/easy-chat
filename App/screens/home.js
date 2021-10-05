import React, {useState, useLayoutEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper';

// TODO: Add Logout Button
const HomeScreen = ({navigation}) => {
  // TODO: retrieve chats of the current user
  const DATA = [
    {id: 1, name: 'user1'},
    {id: 2, name: 'user2'},
    {id: 3, name: 'user3'},
    {id: 4, name: 'user4'},
    {id: 5, name: 'user5'},
  ];

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={DATA}
        renderItem={({item}) => (
          <View>
            <Text>{item.name}</Text>
          </View>
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
