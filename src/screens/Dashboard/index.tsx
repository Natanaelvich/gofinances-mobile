import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
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
  TransactionList,
} from './styles';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard } from '../../components/TransactionCard';

export function Dashboard() {
  const data = [
    {
      type: 'income',
      title: 'Desenvolvimento de app',
      amount: 'R$ 25.000,00',
      category: { name: 'Receita', icon: 'dollar-sign' },
      date: '13/05/2021',
    },
    {
      type: 'outcome',
      title: 'Viagem Maldivas',
      amount: 'R$ 8.000,00',
      category: { name: 'Gastos', icon: 'arrow-down-circle' },
      date: '13/05/2021',
    },
  ];
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/46244572?v=4',
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Willian</UserName>
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
        <TransactionList
          data={data}
          keyExtractor={item => item.title}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
