import React, { createContext, ReactNode, useContext } from 'react';

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
}
function AuthProvider({ children, ...rest }: AuthProviderProps) {
  const user = {
    id: '12345',
    name: 'Cesar',
    email: 'csr2314@gmail.com',
  };

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
