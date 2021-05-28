import React from 'react';
import { Text } from 'react-native';
import {
  Container,
  Title,
  Amount,
  Footer,
  Icon,
  Category,
  CategoryName,
  Date,
} from './styles';

interface TransactionCardProps {
  title: string;
  amount: string;
  type: 'income' | 'outcome';
  date: string;
  icon: string;
  categoryName: string;
}

export function TransactionCard({
  title,
  amount,
  type,
  icon,
  categoryName,
  date,
}: TransactionCardProps) {
  return (
    <Container>
      <Title>{title}</Title>
      <Amount type={type}>{amount}</Amount>
      <Footer>
        <Category>
          <Icon name={icon} />
          <CategoryName>{categoryName}</CategoryName>
        </Category>
        <Date>{date}</Date>
      </Footer>
    </Container>
  );
}
