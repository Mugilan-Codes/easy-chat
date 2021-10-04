import React, {useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import styled from 'styled-components/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from 'react-native-paper';

import {useFirebase} from '../contexts';

const Container = styled.View`
  background-color: ${props => props.theme.colors.background};
  flex: 1;
`;
const ViewAreaSafe = styled(SafeAreaView)`
  flex: 1;
`;
const Content = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: center;
  padding: 32px 16px;
`;

// TODO: display errors
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
    <Container>
      <ViewAreaSafe>
        <Content behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCompleteType="username"
                autoCorrect={false}
                returnKeyType="next"
                label="Username"
                placeholder="mugilan-codes"
                error={!!error}
              />
            )}
            name="username"
            defaultValue=""
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                autoCompleteType="email"
                autoCorrect={false}
                keyboardType="email-address"
                returnKeyType="next"
                label="E-Mail"
                placeholder="mugilancodes@gmail.com"
                error={!!error}
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
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                autoCompleteType="password"
                autoCorrect={false}
                secureTextEntry
                returnKeyType="next"
                label="Password"
                error={!!error}
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
            render={({
              field: {onChange, onBlur, value},
              fieldState: {error},
            }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                autoCompleteType="password"
                autoCorrect={false}
                secureTextEntry
                returnKeyType="done"
                label="Confirm Password"
                error={!!error}
              />
            )}
            name="confirm_password"
            defaultValue=""
          />

          <Button title="Submit" onPress={handleSubmit(onSubmit)} />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text>Go To Login Screen</Text>
          </TouchableOpacity>
        </Content>
      </ViewAreaSafe>
    </Container>
  );
};

export default RegisterScreen;
