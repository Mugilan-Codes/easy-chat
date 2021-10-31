import {KeyboardAvoidingView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {Title} from 'react-native-paper';

export const Container = styled.View`
  background-color: ${props => props.theme.colors.background};
  flex: 1;
`;

export const ViewAreaSafe = styled(SafeAreaView)`
  flex: 1;
`;

export const ViewAvoidingKeyboard = styled(KeyboardAvoidingView)`
  flex: 1;
  justify-content: center;
  padding: 32px 16px;
`;

export const AuthTitle = styled(Title)`
  font-size: 28px;
  font-weight: 700;
  line-height: 34px;
`;
