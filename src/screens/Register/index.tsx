import React, { useState } from 'react';
import { Modal } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { Input } from '../../components/Forms/Input';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from './styles';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';

export function Register() {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalShow, setCategoryModalShow] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  function handleSelectedTransactionType(type: 'up' | 'down') {
    setTransactionType(type);
  }
  function handleShowModal() {
    setCategoryModalShow(!categoryModalShow);
  }

  return (
    <Container>
      <Header>
        <Title>Compras</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Valor" />
          <TransactionTypes>
            <TransactionTypeButton
              isActive={transactionType === 'down'}
              type="down"
              title="Outcome"
              icon="arrow-down-circle"
              onPress={() => handleSelectedTransactionType('down')}
            />
            <TransactionTypeButton
              isActive={transactionType === 'up'}
              type="up"
              title="Income"
              icon="arrow-up-circle"
              onPress={() => handleSelectedTransactionType('up')}
            />
          </TransactionTypes>
          <CategorySelectButton onPress={handleShowModal} title="Categorias" />
        </Fields>
        <Button title="Enviar" />
      </Form>
      <Modal visible={categoryModalShow}>
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleShowModal}
        />
      </Modal>
    </Container>
  );
}
