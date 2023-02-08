import React from 'react';
import UserProvider from './providers/userProvider';
import AppRouter from './router/AppRouter';
import apiConfig from './api/config';

export const ContextApp = React.createContext({});

function App() {

  React.useEffect(() => {
    document.cookie = `_csfr=${apiConfig._csfr}; path=/`;
  });

  return (
    <div className="App">
      <UserProvider>
         <AppRouter />
      </UserProvider>
    </div>
  );
}

export default App;
