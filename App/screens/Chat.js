import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';

import {useFirebase} from '../contexts';

const StyledView = styled(SafeAreaView)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.background};
`;

const StyledText = styled.Text`
  color: ${props => props.theme.colors.primary};
`;

// TODO: add chats to the doc using the chat id from the current user
// TODO: retreive chats from the doc
const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const {user, logout} = useFirebase();

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'My message',
        createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://facebook.github.io/react/img/logo_og.png',
        },
        image: 'https://placeimg.com/140/140/any',
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  // return (
  //   <StyledView>
  //     <StyledText>Chat Screen {user?.displayName}</StyledText>
  //     <TouchableOpacity onPress={logout}>
  //       <StyledText>LOGUT</StyledText>
  //     </TouchableOpacity>
  //   </StyledView>
  // );

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default ChatScreen;
