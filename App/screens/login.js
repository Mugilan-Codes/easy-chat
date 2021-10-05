import React, {useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  Button,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
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

// TODO: Display error messages
// TODO: style the form
const LoginScreen = ({navigation}) => {
  const {login} = useFirebase();

  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => {
    console.log({email: data.email, password: data.password});
    login(data.email, data.password);
  };

  const handleOnSubmit = handleSubmit(onSubmit);

  return (
    <Container>
      <ViewAreaSafe>
        <Content behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Pressable onPress={() => emailInput.current?.focus()}>
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
                  ref={emailInput}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordInput.current?.focus()}
                  label="E-Mail"
                  placeholder="john.doe@gmail.com"
                  error={!!error}
                />
              )}
              name="email"
              defaultValue=""
            />
          </Pressable>

          <Pressable onPress={() => passwordInput.current?.focus()}>
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
                  ref={passwordInput}
                  returnKeyType="done"
                  onSubmitEditing={handleOnSubmit}
                  label="Password"
                  right={<TextInput.Icon name="eye" />}
                />
              )}
              name="password"
              defaultValue=""
            />
          </Pressable>

          <Button title="Submit" onPress={handleOnSubmit} />

          <View style={{alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}>
              <Text>Go To Register Screen</Text>
            </TouchableOpacity>
          </View>
        </Content>
      </ViewAreaSafe>
    </Container>
  );
};

export default LoginScreen;
