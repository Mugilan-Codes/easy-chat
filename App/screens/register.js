import React, {useRef} from 'react';
import {View, Text, TouchableOpacity, TextInput, Button} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import {useFirebase} from '../contexts';

const RegisterScreen = ({navigation}) => {
  const {register} = useFirebase();

  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();

  const passwordRef = useRef({});
  passwordRef.current = watch('password', '');

  const onSubmit = data => {
    console.log(data);
    console.log({
      email: data.email,
      password: data.password,
      name: data.username,
    });
    register(data.email, data.password, data.username);
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
            autoCompleteType="username"
            autoCorrect={false}
            returnKeyType="next"
          />
        )}
        name="username"
        defaultValue=""
      />
      {errors.username && <Text>This is required.</Text>}

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
            returnKeyType="next"
          />
        )}
        name="password"
        defaultValue=""
      />

      <Controller
        control={control}
        rules={{
          validate: value =>
            value === passwordRef.current || 'Passwords do not match',
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
        name="confirm_password"
        defaultValue=""
      />
      {errors.confirm_password && <Text>Passwords do not match</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />

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
