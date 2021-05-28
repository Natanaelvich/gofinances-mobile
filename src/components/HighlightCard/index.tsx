import React from 'react';
import { Container } from './styles';
import { Header, Title, Icon, Footer, Amount, LastTransaction } from './styles';

interface HighlightCardProps {
  type: 'income' | 'outcome';
  icon: string;
  amount: number;
  lastTransaction: string;
}

export function HighlightCard({
  type,
  icon,
  amount,
  lastTransaction,
}: HighlightCardProps) {
  return (
    <Container>
      <Header>
        <Title>{type === 'income' ? 'Entrada' : 'Saída'}</Title>
        <Icon name={icon} />
      </Header>
      <Footer>
        <Amount>{`R$ ${amount}`}</Amount>
        <LastTransaction>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}
