import React from 'react';

import { render } from '@testing-library/react-native';
import { Input } from '../../../components/Forms/Input';
import RenderWithTheme from '../../RenderWithTheme';
import theme from '../../../global/styles/theme';

describe('Input componet', () => {
  it('must have specific border color when active', () => {
    const { getByTestId } = render(<Input testID="input" active />, {
      wrapper: RenderWithTheme,
    });

    expect(getByTestId('input').props.style[0].borderColor).toEqual(
      theme.colors.attention,
    );
  });
});
