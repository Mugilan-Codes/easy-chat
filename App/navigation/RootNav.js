import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {useTheme, useFirebase} from '../contexts';
import Loading from '../components/loading';
import AuthNav from './AuthNav';
import MainStack from './MainStack';

const RootNav = () => {
  const {user, isLoading} = useFirebase();
  const {theme} = useTheme();

  if (isLoading) {
    console.log('Loading...');
    // TODO: add a splash screen
    return <Loading />;
  }

  return (
    <NavigationContainer theme={theme}>
      {user ? <MainStack /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default RootNav;
