import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';

import {useFirebase} from '../contexts';

// TODO: Modify Header to display the chat name
// TODO: Read the avatar from the collections since auth one does not load on the first chance
const ChatScreen = ({route}) => {
  const [messages, setMessages] = useState([]);
  const {user} = useFirebase();

  const {chatId, email, name} = route.params;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('Chats')
      .doc(chatId)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const threads = querySnapshot.docs.map(docSnapshot => {
          return {
            ...docSnapshot.data(),
            _id: docSnapshot.id,
            text: docSnapshot.data().text,
            user: docSnapshot.data().user,
            createdAt: docSnapshot.data().createdAt.toDate(),
          };
        });

        setMessages(threads);
      });

    return () => unsubscribe();
  }, []);

  const onSend = useCallback((message = []) => {
    firestore()
      .collection('Chats')
      .doc(chatId)
      .collection('messages')
      .add(message[0]);

    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, message),
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.email,
        name: user.displayName,
        avatar: user.photoURL,
      }}
    />
  );
};

export default ChatScreen;
