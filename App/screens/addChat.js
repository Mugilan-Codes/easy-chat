import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

// TODO: create a document in chat collection
// TODO: refer the chat document id to both the users involved and also who the chat is with.
// TODO: move to the chat screen of the current user
const AddChatScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    const newData = users.filter(item => {
      const itemData = item.username.toUpperCase();

      const queryData = query.toUpperCase();

      return itemData.indexOf(queryData) > -1;
    });

    setData(newData);
    setSearchQuery(query);
  };

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(querySnapshot => {
        const users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setUsers(users);
        setData(users);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />

      <FlatList
        data={data}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <View
              style={{
                height: 50,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>User ID: {item.key}</Text>
              <Text>User Name: {item.username}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AddChatScreen;
