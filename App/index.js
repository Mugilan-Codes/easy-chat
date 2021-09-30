import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import StateProvider from './contexts/StateProvider';

enableScreens();
const App = () => {
  return (
    <SafeAreaProvider>
      <StateProvider>
        <NavigationContainer>
          <View>
            <Text>Entry Point</Text>
          </View>
        </NavigationContainer>
      </StateProvider>
    </SafeAreaProvider>
  );
};

export default App;
