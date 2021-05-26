import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from './global/styles/theme';
import { Dashboard } from './screens/Dashboard';

const Main: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Dashboard />
    </ThemeProvider>
  );
};

export default Main;
