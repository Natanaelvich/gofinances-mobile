import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../hooks/auth';

describe('Auth hook', () => {
  it('should be able make sing in with google', async () => {
    const user = {
      id: 'user-123',
      name: 'John doe hahahaah',
      email: 'johndoe@example.com.br',
    };
    const token = 'token-123';

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await act(() => result.current.signInWithGoogle());

    // expect(AsyncStorage.setItem).toHaveBeenCalledWith([
    //   ['@gofinacen:user', token],
    // ]);
    expect(result.current.user.email).toEqual('johndoe@example.com.br');
  });
});
