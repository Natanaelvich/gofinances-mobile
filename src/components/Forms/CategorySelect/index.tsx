import React from 'react';
import { Container, Category, Icon } from './styles';

interface CategorySelectProps {
  title: string;
}

export function CategorySelect({ title }: CategorySelectProps) {
  function handleCategorySelect(category: Category) {
    setCategory(category);
    console.log(category.name);
  }

  return (
    <Container>
      <Category
        onPress={() => handleCategorySelect(item)}
        isActive={item.key === category.key}
      >
        {title}
      </Category>
      <Icon name="chevron-down" />
    </Container>
  );
}
