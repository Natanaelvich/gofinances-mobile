import React, { useState } from 'react';
import { Keyboard, Modal } from 'react-native';
import { useForm } from 'react-hook-form';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
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
import { InputForm } from '../../components/InputForm';

interface FormDataProps {
  name: string;
  amount: string;
}

export function Register() {
  const { control, handleSubmit } = useForm();

  const [transactionType, setTransactionType] = useState('');
  const [categoryModalShow, setCategoryModalShow] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  function handleRegister(form: FormDataProps) {
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };

    console.log(data);
  }

  function handleSelectedTransactionType(type: 'up' | 'down') {
    setTransactionType(type);
  }
  function handleShowModal() {
    setCategoryModalShow(!categoryModalShow);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Compras</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              autoCapitalize="sentences"
              autoCorrect={false}
              placeholder="Nome"
              control={control}
            />
            <InputForm
              name="amount"
              keyboardType="numeric"
              placeholder="Valor"
              control={control}
            />
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
            <CategorySelectButton
              onPress={handleShowModal}
              title="Categorias"
            />
          </Fields>
          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={categoryModalShow}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleShowModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
