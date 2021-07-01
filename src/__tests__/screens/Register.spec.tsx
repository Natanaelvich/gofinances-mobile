import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import RenderWithProviders from '../RenderWithProviders';
import { Register } from '../../screens/Register';

const mockedNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigate,
    }),
  };
});

describe('Register screen', () => {
  it('shoul be open modal category select', async () => {
    const { getByText, getByTestId } = render(<Register />, {
      wrapper: RenderWithProviders,
    });

    const modalElement = getByTestId('modal-category');
    const buttonElement = getByText('Selecionar');

    fireEvent.press(buttonElement);

    await waitFor(() => {
      expect(modalElement.props.visible).toBeTruthy();
    });
  });
});
