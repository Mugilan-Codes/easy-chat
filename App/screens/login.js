import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import {useFirebase} from '../contexts';

// TODO: Display error messages
// TODO: style the form
const LoginScreen = ({navigation}) => {
  const {login} = useFirebase();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    console.log({email: data.email, password: data.password});
    login(data.email, data.password);
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
          />
        )}
        name="email"
        defaultValue=""
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            autoCompleteType="password"
            autoCorrect={false}
            secureTextEntry
            returnKeyType="done"
          />
        )}
        name="password"
        defaultValue=""
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />

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
