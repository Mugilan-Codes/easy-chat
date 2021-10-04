import React from 'react';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native';
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

const ChatScreen = () => {
  const {logout} = useFirebase();

  return (
    <StyledView>
      <StyledText>Chat Screen</StyledText>
      <TouchableOpacity onPress={logout}>
        <StyledText>LOGUT</StyledText>
      </TouchableOpacity>
    </StyledView>
  );
};

export default ChatScreen;
