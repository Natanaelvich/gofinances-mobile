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
} from './styles';
import { HighlightCard } from '../../components/HighlightCard';

export function Dashboard() {
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

      <Transactions />
    </Container>
  );
}
