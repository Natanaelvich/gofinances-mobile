import React, { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { VictoryPie } from 'victory-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useFocusEffect } from '@react-navigation/core';
import {
  Container,
  LoadContainer,
  Content,
  ChartContainer,
  MouthSelect,
  MounthSelectButton,
  MounthSelectIcon,
  Mounth,
} from './styles';
import { categories } from '../../utils/categories';
import { HistoryCard } from '../../components/HistoryCard';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/auth';

export interface TransactionProps {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}
interface CategoryDataProps {
  percentFormatted: string;
  percent: number;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  key: string;
}
export function Resume() {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<
    CategoryDataProps[]
  >([]);
  const theme = useTheme();

  const bottomTabBarHeight = useBottomTabBarHeight();

  function handleDateChange(action: 'next' | 'previous') {
    setIsLoading(true);
    if (action === 'next') {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  const loadData = useCallback(async () => {
    const dataKey = `@gofinacen:transacations_user:${user.id}`;

    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionProps) =>
        expensive.type === 'negative' &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear(),
    );

    const expensivesTotal = expensives.reduce(
      (accumulator: number, expensive: TransactionProps) => {
        return accumulator + Number(expensive.amount);
      },
      0,
    );

    const totalByCategory: CategoryDataProps[] = [];

    categories.forEach(category => {
      let categorySum = 0;
      expensives.forEach((expensive: TransactionProps) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });
      if (categorySum > 0) {
        const total = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        const percent = Number(
          ((categorySum / expensivesTotal) * 100).toFixed(0),
        );
        const percentFormatted = `${percent.toFixed(0)}%`;
        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted: total,
          percent,
          percentFormatted,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }, [selectedDate]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  return (
    <Container>
      <Header title="Resumo" />

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: bottomTabBarHeight,
          }}
        >
          <MouthSelect>
            <MounthSelectButton onPress={() => handleDateChange('previous')}>
              <MounthSelectIcon name="chevron-left" />
            </MounthSelectButton>
            <Mounth>{format(selectedDate, 'MMMM, Y', { locale: ptBR })}</Mounth>
            <MounthSelectButton onPress={() => handleDateChange('next')}>
              <MounthSelectIcon name="chevron-right" />
            </MounthSelectButton>
          </MouthSelect>
          <ChartContainer>
            <VictoryPie
              data={totalByCategories}
              x="percentFormatted"
              y="total"
              colorScale={totalByCategories.map(category => category.color)}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                },
              }}
              labelRadius={70}
            />
          </ChartContainer>
          {totalByCategories.map(item => (
            <HistoryCard
              key={String(item.key)}
              color={item.color}
              amount={item.totalFormatted}
              title={item.name}
            />
          ))}
        </Content>
      )}
    </Container>
  );
}
