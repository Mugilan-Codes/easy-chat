import React from 'react';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';

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
  return (
    <StyledView>
      <StyledText>Chat Screen</StyledText>
    </StyledView>
  );
};

export default ChatScreen;
