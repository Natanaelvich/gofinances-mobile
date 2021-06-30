import React from 'react';
import { render } from '@testing-library/react-native';
import { Signin } from '../../screens/Signin';

test('form submits two answers', () => {
  const { debug } = render(<Signin />);

  debug();
});
