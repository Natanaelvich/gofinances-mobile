import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../hooks/auth';

jest.mock('expo-google-app-auth', () => {
  return {
    logInAsync: () => {
      return {
        type: 'success',
        user: {
          id: 'user-123',
          name: 'John doe hahahaah',
          email: 'johndoe@example.com.br',
          photoUrl: '',
        },
      };
    },
  };
});

describe('Auth hook', () => {
  it('should be able make sing in with google', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });
});
