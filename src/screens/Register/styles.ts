import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const ContainerKeyboardDismiss = styled.TouchableWithoutFeedback`
  height: 100%;
`;
export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};
  width: 100%;
  height: ${RFValue(113)}px;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: ${RFValue(19)}px;
`;
export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  line-height: ${RFValue(27)}px;
  color: ${({ theme }) => theme.colors.shape};
`;
export const Form = styled.View`
  flex: 1;
  width: 100%;
  padding: 24px;
  justify-content: space-between;
`;
export const Fields = styled.View``;
export const TransactionTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;
