import React from 'react';
import { Container } from './styles';
import { Header, Title, Icon, Footer, Amount, LastTransaction } from './styles';

export function HighlightCard() {
  return (
    <Container>
      <Header>
        <Title>Entrada</Title>
        <Icon name="arrow-up-circle" />
      </Header>
      <Footer>
        <Amount>R$ 17000</Amount>
        <LastTransaction>2 dias atras</LastTransaction>
      </Footer>
    </Container>
  );
}
