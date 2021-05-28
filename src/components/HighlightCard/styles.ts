import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface StyleProps {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View<StyleProps>`
  background-color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.secondary : theme.colors.shape};
  width: ${RFValue(300)}px;
  border-radius: ${RFValue(5)}px;
  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;
  margin-right: ${RFValue(16)}px;
  elevation: 6;
`;
export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;
export const Title = styled.Text<StyleProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  line-height: ${RFValue(21)}px;
  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.title};
`;
export const Icon = styled(Feather)<StyleProps>`
  font-size: ${RFValue(33)}px;
  ${props =>
    props.type === 'up' &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}
  ${props =>
    props.type === 'down' &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}
  ${props =>
    props.type === 'total' &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;
export const Footer = styled.View``;
export const Amount = styled.Text<StyleProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.title};
  line-height: ${RFValue(48)}px;
  margin-top: 38px;
`;
export const LastTransaction = styled.Text<StyleProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text};
  line-height: ${RFValue(18)}px;
`;
