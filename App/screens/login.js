import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {useFirebase} from '../contexts';

const LoginScreen = ({navigation}) => {
  const {login} = useFirebase();

  return (
    <View>
      <Text>Login Screen</Text>

      <TouchableOpacity
        onPress={() => {
          login('test@testing.com', 'testing4321');
        }}>
        <Text>Testing Secret Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Text>Go To Register Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
