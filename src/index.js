import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import theme from 'theme';

import App from 'shared/components/App';
import { FavoritesProvider } from 'shared/context/FavoritesContext';
import { ShoppingCartProvider } from 'shared/context/ShoppingCartContext';
import { UserProvider } from 'shared/context/UserContext';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <UserProvider>
            <FavoritesProvider>
              <ShoppingCartProvider>
                <App />
              </ShoppingCartProvider>
            </FavoritesProvider>
          </UserProvider>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>
);
