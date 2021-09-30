import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import StateProvider from './contexts/StateProvider';

const StyledView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.colors.background};
`;
const StyledText = styled.Text`
  color: ${props => props.theme.colors.primary};
`;

enableScreens();
const App = () => {
  return (
    <SafeAreaProvider>
      <StateProvider>
        <NavigationContainer>
          <StyledView>
            <StyledText>Entry Point</StyledText>
          </StyledView>
        </NavigationContainer>
      </StateProvider>
    </SafeAreaProvider>
  );
};

export default App;
