import React from 'react';
import { Container, Category, Icon } from './styles';

interface CategorySelectProps {
  title: string;
  onPress: () => void;
}

export function CategorySelectButton({
  title,
  onPress,
  ...rest
}: CategorySelectProps) {
  return (
    <Container onPress={onPress} {...rest}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}
