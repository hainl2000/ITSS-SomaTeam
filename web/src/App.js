import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppFrame from './layouts/AppFrame';
import CartProvider from './contexts/CartContext';
import UserAuthProvider from './contexts/UserAuthContext';
import WebProvider from './contexts/WebContext';
import AdminAuthProvider from './contexts/AdminAuthContext';

const queryClient = new QueryClient();

export default function App() {
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          color: 'rgb(14, 27, 77)',
          bg: 'gray.50'
        }
      }
    },
    colors: {
      primaryColor: 'rgb(14, 27, 77)',
      lightTextColor: 'rgb(239, 240, 245, 0.75)'
    },
    fonts: {
      body: "'Open Sans', sans-serif"
    }
  });

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <QueryClientProvider client={queryClient}>
          <AdminAuthProvider>
            <UserAuthProvider>
              <WebProvider>
                <CartProvider>
                  <AppFrame />
                </CartProvider>
              </WebProvider>
            </UserAuthProvider>
          </AdminAuthProvider>
        </QueryClientProvider>
      </Router>
    </ChakraProvider>
  );
}
