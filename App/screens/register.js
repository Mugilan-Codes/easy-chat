import React, {useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  Button,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Pressable,
  View,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {TextInput, Title, Subheading} from 'react-native-paper';

import {useFirebase} from '../contexts';
import SizedBox from '../components/SizedBox';
import {
  Container,
  ViewAreaSafe,
  ViewAvoidingKeyboard,
} from '../components/Styled';

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

  const usernameInput = useRef(null);
  const emailInput = useRef(null);
  const passInput = useRef(null);
  const cPassInput = useRef(null);

  const onSubmit = data => {
    console.log(data);
    console.log({
      email: data.email,
      password: data.password,
      name: data.username,
    });
    register(data.email, data.password, data.username);
  };

  const handleOnSubmit = handleSubmit(onSubmit);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <ViewAreaSafe>
          <ViewAvoidingKeyboard
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Title style={{fontSize: 28, fontWeight: '700', lineHeight: 34}}>
              Create Account
            </Title>

            <SizedBox height={8} />

            <Subheading>Register new account</Subheading>

            <SizedBox height={32} />

            <Pressable onPress={() => usernameInput.current?.focus()}>
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
                    ref={usernameInput}
                    returnKeyType="next"
                    onSubmitEditing={() => emailInput.current?.focus()}
                    label="Username"
                    placeholder="mugilan-codes"
                    error={!!error}
                    style={{
                      borderRadius: 8,
                      paddingHorizontal: 16,
                    }}
                  />
                )}
                name="username"
                defaultValue=""
              />
            </Pressable>

            <SizedBox height={16} />

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
                    onSubmitEditing={() => passInput.current?.focus()}
                    label="E-Mail"
                    placeholder="mugilancodes@gmail.com"
                    error={!!error}
                    style={{
                      borderRadius: 8,
                      paddingHorizontal: 16,
                    }}
                  />
                )}
                name="email"
                defaultValue=""
              />
            </Pressable>

            <SizedBox height={16} />

            <Pressable onPress={() => passInput.current?.focus()}>
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
                    ref={passInput}
                    returnKeyType="next"
                    onSubmitEditing={() => cPassInput.current?.focus()}
                    label="Password"
                    error={!!error}
                    style={{
                      borderRadius: 8,
                      paddingHorizontal: 16,
                    }}
                  />
                )}
                name="password"
                defaultValue=""
              />
            </Pressable>

            <SizedBox height={16} />

            <Pressable onPress={() => cPassInput.current?.focus()}>
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
                    ref={cPassInput}
                    returnKeyType="done"
                    onSubmitEditing={handleOnSubmit}
                    label="Confirm Password"
                    error={!!error}
                    style={{
                      borderRadius: 8,
                      paddingHorizontal: 16,
                    }}
                  />
                )}
                name="confirm_password"
                defaultValue=""
              />
            </Pressable>

            <SizedBox height={16} />

            <Button title="Submit" onPress={handleOnSubmit} />

            <SizedBox height={16} />

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text>Go To Login Screen</Text>
              </TouchableOpacity>
            </View>
          </ViewAvoidingKeyboard>
        </ViewAreaSafe>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;
