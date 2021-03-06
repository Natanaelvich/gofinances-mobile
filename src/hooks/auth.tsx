import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from 'react';

import * as Google from 'expo-google-app-auth';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({} as IAuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}
interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

function AuthProvider({ children, ...rest }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);
  const dataKey = '@gofinacen:user';

  useEffect(() => {
    async function getUserAsync() {
      const userStoraged = await AsyncStorage.getItem(dataKey);
      if (userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;
        setUser(userLogged);
      }
      setUserStorageLoading(false);
    }
    getUserAsync();
  }, []);

  async function signInWithGoogle() {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '1095654890138-nf0n52kukog9kbjujmnon4k8jl3ca40u.apps.googleusercontent.com',
        iosClientId:
          '1095654890138-hra0g8a46kimm6fv3e1839uvt68v0u2m.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        const userLogged = {
          id: String(result.user.id),
          email: result.user.email!,
          name: formatName(result.user.name!),
          photo: result.user.photoUrl!,
        };
        setUser(userLogged);
        await AsyncStorage.setItem(dataKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      if (credential) {
        const name = formatName(credential.fullName!.givenName!);
        const photo = `https://ui-avatars.com/api/?name=${name}+${credential.fullName!
          .familyName!}&length=2`;
        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo,
        };
        setUser(userLogged);
        await AsyncStorage.setItem(dataKey, JSON.stringify(userLogged));
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async function signOut() {
    setUser({} as User);
    await AsyncStorage.removeItem(dataKey);
  }

  function formatName(name: string) {
    const splitName = name.split(' ');
    if (splitName.length > 2) {
      return `${splitName[0]} ${splitName[1]}`;
    }
    return name;
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        signInWithApple,
        signOut,
        userStorageLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
