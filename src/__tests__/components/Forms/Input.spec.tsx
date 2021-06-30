import React from 'react';

import { render } from '@testing-library/react-native';
import { Input } from '../../../components/Forms/Input';
import RenderWithTheme from '../../RenderWithTheme';

describe('Input componet', () => {
  it('must have specific border color when active', () => {
    const { getByTestId } = render(<Input testID="input" active />, {
      wrapper: RenderWithTheme,
    });

    expect(getByTestId('input').props.style[0].borderColor).toEqual('#E83F5B');
  });
});
