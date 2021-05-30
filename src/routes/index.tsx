import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AppRoutes } from './app';

const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
};

export default Routes;
