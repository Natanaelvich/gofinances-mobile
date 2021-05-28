import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex: 1;
`;
export const Header = styled.View`
  height: ${RFValue(200)}px;
  width: ${RFValue(300)}px;
  border-radius: ${RFValue(5)}px;
  background-color: ${({ theme }) => theme.colors.shape};
`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(21)}px;
  color: ${({ theme }) => theme.colors.title};
`;
export const Icon = styled(Feather)`
  font-size: ${RFValue(33)}px;
  color: ${({ theme }) => theme.colors.success};
`;
export const Footer = styled.View``;
export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(32)}px;
  color: ${({ theme }) => theme.colors.title};
  line-height: ${RFValue(48)}px;
`;
export const LastTransaction = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme }) => theme.colors.text};
  line-height: ${RFValue(18)}px;
`;
