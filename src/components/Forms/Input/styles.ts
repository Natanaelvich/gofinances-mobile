import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

type Props = {
  active: boolean;
};
export const Container = styled(TextInput)<Props>`
  width: 100%;
  padding: 18px;
  height: ${RFValue(56)}px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.shape};
  margin-bottom: 8px;
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};

  ${({ active, theme }) =>
    active &&
    css`
      border-width: 3px;
      border-color: ${theme.colors.attention};
    `}
`;
