import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

interface TypeProps {
  type: 'income' | 'outcome';
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.shape};
  padding: 24px;
  border-radius: 5px;
  margin-top: 16px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: ${RFValue(21)}px;
`;
export const Amount = styled.Text<TypeProps>`
  color: ${({ theme, type }) =>
    type === 'income' ? theme.colors.success : theme.colors.attention};
  font-size: ${RFValue(20)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-top: ${RFValue(2)}px;
`;
export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(21)}px;
`;
export const Category = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const CategoryName = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  padding-right: ${RFValue(45)}px;
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(21)}px;
  margin-left: 16px;
`;
export const Date = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(21)}px;
`;
