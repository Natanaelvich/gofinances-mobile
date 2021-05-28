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
          type="income"
          icon="arrow-up-circle"
          amount={17000}
          lastTransaction="2 days ago"
        />
      </HighlightCards>
    </Container>
  );
}
