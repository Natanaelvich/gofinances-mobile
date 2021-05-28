import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title, Icon } from './styles';

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  type: 'up' | 'down';
  icon: string;
  title: string;
}

export function TransactionTypeButton({
  type,
  icon,
  title,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <Container {...rest}>
      <Icon type={type} name={icon} />
      <Title>{title}</Title>
    </Container>
  );
}
