import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import {useFirebase} from '../contexts';

const RegisterScreen = ({navigation}) => {
  const {register} = useFirebase();

  return (
    <View>
      <Text>Register Screen</Text>

      <TouchableOpacity
        onPress={() => {
          register('test@testing.com', 'testing4321');
        }}>
        <Text>Testing Secret Register</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text>Go To Login Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
