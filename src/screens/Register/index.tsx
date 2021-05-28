import React from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Container, Fields, Form, Header, Title } from './styles';

export function Register() {
  return (
    <Container>
      <Header>
        <Title>Compras</Title>
      </Header>

      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Valor" />
        </Fields>
        <Button title="Enviar" />
      </Form>
    </Container>
  );
}
