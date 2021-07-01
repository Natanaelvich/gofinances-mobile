import React, { useState } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import uuid from 'react-native-uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../../components/Forms/Button';
import { InputForm } from '../../components/InputForm';
import { TransactionTypeButton } from '../../components/Forms/TransactionTypeButton';
import { Container, Form, Fields, TransactionTypes } from './styles';
import { CategorySelectButton } from '../../components/Forms/CategorySelectButton';
import CategorySelect from '../CategorySelect';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/auth';

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
  const { user } = useAuth();
  const dataKey = `@gofinacen:transacations_user:${user?.id}`;

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const [transactionType, setTransacionType] = useState('');
  const [categoryModalShow, setCategoryModalShow] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  function resetForm() {
    setTransacionType('');
    setCategory({
      key: 'category',
      name: 'Categoria',
    });
    reset();
  }

  function handleTransactionTypeSelect(type: 'positive' | 'negative') {
    setTransacionType(type);
  }
  function handleShowModal() {
    setCategoryModalShow(!categoryModalShow);
  }

  async function handleRegister(form: FormDataProps) {
    if (!transactionType) {
      return Alert.alert('Escolha o tipo de transação');
    }
    if (category.key === 'category') {
      return Alert.alert('Selecione uma categoria');
    }
    const newData = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];
      const dataFormatted = [...currentData, newData];

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      resetForm();
      navigation.navigate('Listagem');
    } catch (error) {
      console.log(error);
      Alert.alert('Não foi possível salvar');
    }
    console.log(newData);
  }

  // useEffect(() => {
  // async function loadData(){
  // 	try {
  // 		const currentData = await AsyncStorage.getItem(dataKey);
  // 		console.log(JSON.parse(currentData!));
  // 	} catch (error) {
  // 		console.log(error);
  // 		Alert.alert("Não foi possivel carregar as informações, tente novamente.");
  // 	}
  // }
  // loadData();
  // async function deleteData(){
  // 	const currentData = await AsyncStorage.getItem(dataKey);
  // 	if(currentData){
  // 		try {
  // 			await AsyncStorage.removeItem(dataKey);
  // 		} catch (error) {
  // 			console.log(error);
  // 			Alert.alert('Não foi possivel deletar, por favor tente novamente!');
  // 		}
  // 	}
  // }
  // deleteData();
  // });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header title="Cadastro" />
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
                isActive={transactionType === 'positive'}
                type="up"
                title="Income"
                onPress={() => handleTransactionTypeSelect('positive')}
              />
              <TransactionTypeButton
                isActive={transactionType === 'negative'}
                type="down"
                title="Outcome"
                onPress={() => handleTransactionTypeSelect('negative')}
              />
            </TransactionTypes>
            <CategorySelectButton
              onPress={handleShowModal}
              title={category.name}
            />
          </Fields>
          <Button
            title="Enviar"
            onPress={() => {
              handleSubmit(handleRegister)();
            }}
          />
        </Form>
        <Modal testID="modal-category" visible={categoryModalShow}>
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
