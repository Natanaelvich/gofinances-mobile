import React from 'react';
import { FlatList } from 'react-native';
import { Button } from '../../components/Forms/Button';
import { categories } from '../../utils/categories';
import {
  Container,
  Header,
  HeaderTitle,
  Category,
  Name,
  Icon,
  Separator,
  Footer,
} from './styles';

interface Category {
  key: string;
  name: string;
}
interface CategorySelectProps {
  category: Category;
  setCategory: (category: Category) => void;
  closeSelectCategory: () => void;
}

export function CategorySelect({
  category,
  setCategory,
  closeSelectCategory,
}: CategorySelectProps) {
  function handleCategorySelect(category: Category) {
    setCategory(category);
    console.log(category.name);
  }

  return (
    <Container>
      <Header>
        <HeaderTitle>Categoria</HeaderTitle>
      </Header>
      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(category: Category) => category.key}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ item }) => (
          <Category
            onPress={() => handleCategorySelect(item)}
            isActive={item.key === category.key}
          >
            <Icon name={item.icon} />
            <Name>{item.name}</Name>
          </Category>
        )}
      />
      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
}
