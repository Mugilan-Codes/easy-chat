import React, {useRef} from 'react';
import {
  Text,
  TouchableOpacity,
  Button,
  Platform,
  Pressable,
  View,
  Keyboard,
  TouchableWithoutFeedback,
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

// TODO: Display error messages
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <ViewAreaSafe>
          <ViewAvoidingKeyboard
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Title style={{fontSize: 28, fontWeight: '700', lineHeight: 34}}>
              Welcome Back!
            </Title>

            <SizedBox height={8} />

            <Subheading>Sign In to your account</Subheading>

            <SizedBox height={32} />

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

            <Pressable onPress={() => passwordInput.current?.focus()}>
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
                    ref={passwordInput}
                    returnKeyType="done"
                    onSubmitEditing={handleOnSubmit}
                    label="Password"
                    right={<TextInput.Icon name="eye" />}
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

            <View style={{alignItems: 'flex-end'}}>
              <Text>Forgot Password?</Text>
            </View>

            <SizedBox height={16} />

            <Button title="Login" onPress={handleOnSubmit} />

            <SizedBox height={16} />

            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Register');
                }}>
                <Text>Go To Register Screen</Text>
              </TouchableOpacity>
            </View>
          </ViewAvoidingKeyboard>
        </ViewAreaSafe>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
