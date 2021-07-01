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

const CategorySelect: React.FC<CategorySelectProps> = ({
  category,
  setCategory,
  closeSelectCategory,
}) => {
  function handleCategorySelect(categoryParam: Category) {
    setCategory(categoryParam);
  }

  return (
    <Container>
      <Header>
        <HeaderTitle>Categoria</HeaderTitle>
      </Header>
      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item: Category) => item.key}
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
};

export default CategorySelect;
