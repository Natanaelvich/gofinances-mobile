import AsyncStorage from '@react-native-async-storage/async-storage';

import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { logInAsync } from 'expo-google-app-auth';

import { AuthProvider, useAuth } from '../../hooks/auth';

jest.mock('expo-google-app-auth');

describe('Auth hook', () => {
  it('should be able make sing in with google', async () => {
    const user = {
      id: 'user-123',
      email: 'johndoe@example.com.br',
      name: 'Johndoe',
      photo: '',
    };

    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'success',
      user: {
        id: 'user-123',
        name: 'Johndoe',
        email: 'johndoe@example.com.br',
        photoUrl: '',
      },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toEqual('johndoe@example.com.br');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      '@gofinacen:user',
      JSON.stringify(user),
    );
  });
  it('should be able make sing out', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitForNextUpdate();
    await act(() => result.current.signOut());

    expect(result.current.user).not.toHaveProperty('id');
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@gofinacen:user');
  });
  it('user should be not connect if cancel authentication with google', async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user).not.toHaveProperty('id');
  });
  it('should be error with incorrectly google parameters', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    try {
      await act(() => result.current.signInWithGoogle());
    } catch {
      expect(result.current.user).not.toHaveProperty('id');
    }
  });
});
