import React, { useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '../../components/Forms/Button';
import { InputForm } from '../../components/InputForm';
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

interface FormDataProps {
  name: string;
  amount: string;
}
const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .required('O valor é obrigatório')
    .typeError('Informe o valor numérico')
    .positive('O valor deve ser maior que zero'),
});
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
  function handleRegister(form: FormDataProps) {
    if (!transactionType) {
      return Alert.alert('Escolha o tipo de transação');
    }
    if (category.key === 'category') {
      return Alert.alert('Selecione uma categoria');
    }

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
    };
    console.log(data);
  }
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

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
              error={errors.name && errors.name.message}
              autoCapitalize="sentences"
              autoCorrect={false}
              placeholder="Nome"
              control={control}
            />
            <InputForm
              error={errors.amount && errors.amount.message}
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
              title={category.name}
            />
          </Fields>
          <Button title="Enviar" onPress={() => handleSubmit(handleRegister)} />
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
