import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Container, Title, Icon } from './styles';

interface TransactionTypeButtonProps extends TouchableOpacityProps {
  type: 'up' | 'down';
  icon: string;
  title: string;
  isActive: boolean;
}

export function TransactionTypeButton({
  type,
  icon,
  title,
  isActive,
  ...rest
}: TransactionTypeButtonProps) {
  return (
    <Container isActive={isActive} type={type} {...rest}>
      <Icon type={type} name={icon} />
      <Title>{title}</Title>
    </Container>
  );
}
