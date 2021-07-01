import React from 'react';
import { render } from '@testing-library/react-native';
import RenderWithProviders from '../RenderWithProviders';
import { Signin } from '../../screens/Signin';

describe('Signin screen', () => {
  it('shoul be open modal category select', () => {
    const { debug } = render(<Signin />, {
      wrapper: RenderWithProviders,
    });

    debug();
  });
});
