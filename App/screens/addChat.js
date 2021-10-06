import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import {Searchbar, Avatar, Card} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

import {useFirebase} from '../contexts';

// TODO: create a document in chat collection
// TODO: refer the chat document id to both the users involved and also who the chat is with.
// TODO: move to the chat screen of the current user
const AddChatScreen = ({navigation}) => {
  const {user} = useFirebase();

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
        let users = [];

        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        users = users.filter(item => item.email !== user.email);

        setUsers(users);
        setData(users);
        setLoading(false);
      });

    return () => subscriber();
  }, []);

  const createChatId = (emailOne, emailTwo) => {
    const chatIdArr = [];
    chatIdArr.push(emailOne.split('@')[0]);
    chatIdArr.push(emailTwo.split('@')[0]);
    chatIdArr.sort();
    return chatIdArr.join('_');
  };

  const addToFirestore = async (email, name) => {
    const chatId = createChatId(user.email, email);

    await firestore()
      .collection('Users')
      .doc(email)
      .update({
        chats: firestore.FieldValue.arrayUnion({
          chatId,
          email: user.email,
          name: user.displayName,
        }),
      });

    await firestore()
      .collection('Users')
      .doc(user.email)
      .update({
        chats: firestore.FieldValue.arrayUnion({
          chatId,
          email,
          name,
        }),
      });

    navigation.replace('Chat', {chatId, email, name});
  };

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
          <TouchableOpacity
            onPress={() => addToFirestore(item.key, item.username)}>
            <Card.Title
              title={item.username}
              subtitle={item.email}
              left={props => (
                <Avatar.Image {...props} source={{uri: item.avatar}} />
              )}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AddChatScreen;
