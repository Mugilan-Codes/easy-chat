import React from 'react';
import {enableScreens} from 'react-native-screens';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import StateProvider from './contexts/StateProvider';
import RootNav from './navigation/RootNav';

enableScreens();
const App = () => {
  return (
    <SafeAreaProvider>
      <StateProvider>
        <RootNav />
      </StateProvider>
    </SafeAreaProvider>
  );
};

export default App;
