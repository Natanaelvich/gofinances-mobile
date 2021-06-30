import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import theme from '../global/styles/theme';

const RenderWithTheme: React.FC = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default RenderWithTheme;
