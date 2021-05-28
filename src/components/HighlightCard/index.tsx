import React from 'react';
import { Container } from './styles';
import { Header, Title, Icon, Footer, Amount, LastTransaction } from './styles';

interface HighlightCardProps {
  title: string;
  amount: string;
  lastTransaction: string;
  type: 'up' | 'down' | 'total';
}
const icon = {
  up: 'arrow-up-circle',
  down: 'arrow-down-circle',
  total: 'dollar-sign',
};
export function HighlightCard({
  title,
  type,
  amount,
  lastTransaction,
}: HighlightCardProps) {
  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>
      <Footer>
        <Amount type={type}>{`${amount}`}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}
