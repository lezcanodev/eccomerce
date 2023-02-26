import React from 'react';
import UserProvider from './providers/userProvider';
import AppRoutes from './router/AppRouter';
import apiConfig from './api/config';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CartProvider from './providers/cartProvider';

export const ContextApp = React.createContext({});
const router = createBrowserRouter(AppRoutes);

function App() {

  React.useEffect(() => {
    document.cookie = `_csfr=${apiConfig._csfr}; path=/`;
  });

  return (
    <div className="App">
      <UserProvider>   
        <CartProvider>
          <RouterProvider
            router={router}
          />
        </CartProvider>
      </UserProvider>
    </div>
  );
}

export default App;
