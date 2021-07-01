import { renderHook, act } from '@testing-library/react-hooks';
import { mocked } from 'ts-jest/utils';
import { logInAsync } from 'expo-google-app-auth';
import { AuthProvider, useAuth } from '../../hooks/auth';

jest.mock('expo-google-app-auth');

describe('Auth hook', () => {
  it('should be able make sing in with google', async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValue({
      type: 'success',
      user: {
        id: 'user-123',
        name: 'John doe hahahaah',
        email: 'johndoe@example.com.br',
        photoUrl: '',
      },
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });
  it('user should be not connect if cancel authentication with google', async () => {
    const googleMocked = mocked(logInAsync as any);
    googleMocked.mockReturnValue({
      type: 'cancel',
    });
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toEqual(undefined);
  });
});
