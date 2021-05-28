import React from 'react';
import {
  Container,
  Header,
  Photo,
  UserInfo,
  User,
  UserName,
  UserGreeting,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
} from './styles';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://github.com/Natanaelvich.png',
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Natanel</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.000,00"
          lastTransaction="2 days ago"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.200,98"
          lastTransaction="7 days ago"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 15.799,02"
          lastTransaction="Today"
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionCard
          type="income"
          title="Desensolvimento de App"
          amount="R$ 20.000,00"
          categoryName="Venda"
          date="13/05/2021"
          icon="dollar-sign"
        />
        <TransactionCard
          type="outcome"
          title="Investimentos"
          amount="R$ 2.000,00"
          categoryName="Ações"
          date="13/05/2021"
          icon="arrow-down-circle"
        />
      </Transactions>
    </Container>
  );
}
