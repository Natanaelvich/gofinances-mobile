import React, { useCallback, useEffect, useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { useFocusEffect } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Alert } from 'react-native';
import { useTheme } from 'styled-components';
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
  LogoutButton,
  LoadContainer,
} from './styles';
import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardProps,
} from '../../components/TransactionCard';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighLighsDataProps {
  entries: HighlightProps;
  expensives: HighlightProps;
  total: HighlightProps;
}

export function Dashboard() {
  const dataKey = '@gofinacen:transacations';

  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighilightData] = useState<HighLighsDataProps>(
    {} as HighLighsDataProps,
  );

  function getLastDate(
    collection: DataListProps[],
    type: 'positive' | 'negative',
  ) {
    try {
      const prefixo = `Última ${type === 'positive' ? 'entrada' : 'saida'} `;
      // eslint-disable-next-line prefer-spread
      const lastTransations = Math.max.apply(
        Math,
        collection
          .filter(transaction => transaction.type === type)
          .map(transaction => new Date(transaction.date).getTime()),
      );
      // return format(new Date(), 'dd, MMMM', {locale: ptBR});
      const response = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'long',
      }).format(new Date(lastTransations));
      return `${prefixo}${response}`;
    } catch (error) {
      return 'Sem lançamentos';
    }
  }
  async function loadTransacions() {
    try {
      const response = await AsyncStorage.getItem(dataKey);
      const transactionsParse = response ? JSON.parse(response) : [];

      let entriesTotal = 0;
      let expenseveTotal = 0;

      const transactionsFormated: DataListProps[] = transactionsParse.map(
        (item: DataListProps) => {
          if (item.type === 'positive') {
            entriesTotal += Number(item.amount);
          } else {
            expenseveTotal += Number(item.amount);
          }

          const amount = Number(item.amount).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });

          const date = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          }).format(new Date(item.date));

          return {
            id: String(item.id),
            name: item.name,
            amount,
            type: item.type,
            category: item.category,
            date,
          };
        },
      );

      const lastTransactionsEntries = getLastDate(
        transactionsParse,
        'positive',
      );
      const lastTransactionsExpansives = getLastDate(
        transactionsParse,
        'negative',
      );
      const totalInterval = `01 à ${lastTransactionsExpansives}`;

      setHighilightData({
        entries: {
          amount: entriesTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          lastTransaction: `${lastTransactionsEntries}`,
        },
        expensives: {
          amount: expenseveTotal.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          lastTransaction: `${lastTransactionsExpansives}`,
        },
        total: {
          amount: (entriesTotal - expenseveTotal).toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }),
          lastTransaction: totalInterval,
        },
      });

      setTransactions(transactionsFormated);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possivel carregar as informações, tente novamente.');
    }
  }

  useEffect(() => {
    loadTransacions();
    async function removeTransactions() {
      const response = await AsyncStorage.removeItem(dataKey);
    }

    // removeTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransacions();
    }, []),
  );
  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
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
              <LogoutButton
                onPress={() => {
                  console.log('logout');
                }}
              >
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              title="Entrada"
              amount={highlightData?.entries?.amount}
              lastTransaction={highlightData?.entries?.lastTransaction || '-'}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highlightData?.expensives?.amount}
              lastTransaction={
                highlightData?.expensives?.lastTransaction || '-'
              }
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData?.total?.amount}
              lastTransaction={highlightData?.total?.lastTransaction || '-'}
              type="total"
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>
            <TransactionList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
