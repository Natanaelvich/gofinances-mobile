import React from 'react';
import {
  GestureHandlerRootView,
  RectButtonProperties,
} from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface ButtonProps extends RectButtonProperties {
  title: string;
}

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <GestureHandlerRootView>
      <Container activeOpacity={0.7} {...rest}>
        <Title>{title}</Title>
      </Container>
    </GestureHandlerRootView>
  );
}
